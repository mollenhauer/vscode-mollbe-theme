import * as jsonc_parser from 'jsonc-parser'
import deepmerge from 'deepmerge';
import {readFileSync, writeFileSync} from 'fs';
import chroma from "chroma-js"
import * as path from 'path'
import { existsSync } from 'fs'
import { exit } from 'process'
import SYNTAX_COLORS from './src/syntax_highlight.mjs'
import glob from 'glob'
import {userInfo} from 'os'
import {inspect} from 'util'
const log = o => console.log(inspect(o, {showHidden: false, depth: null, colors: true}))

const Types = Object.freeze({
    textmate: Symbol('textmate'),
    semantic: Symbol('semantic'),
    colors:  Symbol('colors')
});
function parseColor( color ) {
    return chroma(color).hex()
}

function parseColorConfig( config ) {
    const [scope, raw_color, style] = config
    const color = parseColor(raw_color)
    const prefixRegEx = new RegExp(/^(?:(semantic|colors)\.)?(.*)$/);
    const matchScope = prefixRegEx.exec( scope )
    if(matchScope) {
        const prefix = matchScope[1]
        const scope = matchScope[2]
        return {
            type: Types[prefix || 'textmate'],
            scope: scope,
            color: color,
            // ...style ? {style: style} : {}
            style: style,
        }
    } else {
        throw Error( `could not parse ${scope}` )
    }
}

function import_files(files) {
     const from_files  = files.map(
        filename => jsonc_parser.parse( readFileSync( filename, 'utf8' ) )
    )
    console.log(`imported: \n   ${files.join('\n   ')}`)
    return from_files
}

function map_textmate( {scope, color, style} ) {
    return {
        scope: scope,
        ...color ? {"settings": { "foreground": parseColor(color) }} : {},
        ...style ? {"settings": { "fontStyle": style }} : {},
    }
}

function map_other({scope, color}) {
    return {[scope]: color}
}

const DEFAULT_MAPPER = {
    [Types.textmate]: map_textmate,
    [Types.colors]:   map_other,
    [Types.semantic]: map_other,
}

const THEME_WRAPPER = {
    [Types.textmate]: js => ({"tokenColors": [js]}),
    [Types.colors]: js => ({"colors": js}),
    [Types.semantic]:   js => ({"semanticTokenColors": js}),
}
const SETTINGSJSON_WRAPPER = {
    [Types.textmate]: js => ({
        "editor.tokenColorCustomizations": {
            "textMateRules": [js]
        }
    }),
    [Types.colors]: js => ({
        "workbench.colorCustomizations": js
    }),
    [Types.semantic]:   js => ({
        "editor.semanticTokenColorCustomizations": {
            "rules": {js}
        }
    })
}

function parse_config_with_mapping(wrapper, mapping = DEFAULT_MAPPER) {
    const config = SYNTAX_COLORS.map(parseColorConfig)
    return config.map( ({type,...other}) => {
        const map = mapping[type]
        const wrap = wrapper[type]
        return wrap(map(other))
    })
}

function create_theme( wrapper, objects=[] ) {
    const theme = deepmerge.all([
        ...objects,
        ...parse_config_with_mapping(wrapper)
    ])
    return JSON.stringify(theme, null, 2);
}

function write_theme(filename, wrapper, objects) {
    const theme = create_theme(wrapper, objects)
    writeFileSync( filename, theme, 'utf-8' )
    console.log( `written to:\n   ${filename}\n` )
}

function find_user_settings_json() {
    const username = userInfo()['username']
    const glob_pattern = `c:/Users/${username}/AppData/Roaming/Code*/User/settings.json`
    const files = glob.sync(glob_pattern)
    if( files.length === 1 ) {
        return files[0]
    } else {
        throw Error(`Could not find settings.json for user ${username} with glob pattern ${glob_pattern}`)
    }
}

function sanitize_jsonc( objects) {
    const objs = objects
        .filter( o => o['$schema'] == 'vscode://schemas/color-theme' && o['colors'] )
        .map( ({colors}) => {
            return SETTINGSJSON_WRAPPER[Types.colors](colors)
        })
    return objs
}
(function main() {
    const DEBUG_OUTPUT_FILE = 'settings.example.json'
    // Command args: "live" for live update of settings.json, "live debug" for output in DEBUG_OUTPUT_FILE
    const theme = process.argv.includes('theme')
    const write_settings_json = process.argv.includes('live')
    const debug = process.argv.includes('debug')

    if( !(theme || write_settings_json )) {
        console.log(`
Usage
  npm run build <comando,...>
Commandos
  theme -- builds theme for publishing
  debug -- outputs setting.json to ${DEBUG_OUTPUT_FILE}
  live  -- live overwrites settings.json
`.trim())
        exit()
    }
    if( theme ) {
        write_theme(
            path.resolve('mollbe-theme/themes/mollbe-theme.json'),
            THEME_WRAPPER,
            import_files(glob.sync('src/**/*.jsonc'))
        )
    }

    if(write_settings_json | debug ){
        let settings_json = find_user_settings_json()
        if( existsSync(settings_json) ) {
            const filename = debug ? DEBUG_OUTPUT_FILE : settings_json
            write_theme(
                filename,
                SETTINGSJSON_WRAPPER,
                [...import_files([settings_json]), ...sanitize_jsonc(import_files( glob.sync('src/**/*.jsonc') ))]
            )
        } else {
            console.error(`File ${settings_json} ot found.`)
        }

    }
})()