import {parse} from 'jsonc-parser'
import deepmerge from 'deepmerge';
import {readFileSync, writeFileSync} from 'fs';
import chroma from "chroma-js"

const OUTFILE =  'mollbe-theme/themes/mollbe-theme.json'
const from_files  = [
    'src/Ayu Mirage Bordered Main.jsonc',
    'src/Ayu Mirage Bordered Terminal.jsonc',
    'src/mollbe_editor.jsonc',
    'src/semantic_base.jsonc',
].map(
    filename => parse( readFileSync( filename, 'utf8' )
))

import SYNTAX_COLORS from './src/syntax_highlight.mjs'
import { match } from 'assert';

function parseColor( color ) {
    return chroma(color).hex()
}
function ts( scope, color, style=null) {
    const objs = [
        {"scope": [scope]},
        color ? {"settings": { "foreground": parseColor(color) }} : {},
        style ? {"settings": { "fontStyle": style }} : {},
    ]
    return {
        "tokenColors": [ deepmerge.all(objs) ]
    }
}

function sm( scope, color ) {
    const o = new Object()
    o[scope] = parseColor(color)
    return {
        "semanticTokenColors": o
    }
}

function parseColorConfig( config ) {
    const [scope, color, style] = config


    const prefixRegEx = new RegExp(/^(?:(semantic|colors)\.)?(.*)$/);
    const matchScope = prefixRegEx.exec( scope )
    if(matchScope) {
        const prefix = matchScope[1]
        const scope_without_prefix = matchScope[2]
        if( prefix  == 'semantic' ) {
            return sm(scope_without_prefix, color)
        } else if( prefix == 'colors' ) {
            console.log(scope);
            const c = new Object()
            c[scope_without_prefix] = parseColor(color)
            return {
                colors: c
            }
        } else {
            return ts(scope, color, style)
        }
    } else {
        console.log(scope);
    }
}

const theme = deepmerge.all([
    ...from_files,
    ...SYNTAX_COLORS.map(parseColorConfig)
])
const json_output_str = JSON.stringify(theme, null, 2);
writeFileSync( OUTFILE, json_output_str, 'utf-8' )