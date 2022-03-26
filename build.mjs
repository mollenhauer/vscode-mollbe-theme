import {parse} from 'jsonc-parser'
import deepmerge from 'deepmerge';
import {readFileSync, writeFileSync} from 'fs';


const from_files  = [
    'src/Ayu Mirage Bordered Main.jsonc',
    'src/Ayu Mirage Bordered Terminal.jsonc',
    'src/mollbe_editor.jsonc',
].map(
    filename => parse( readFileSync( filename, 'utf8' )
))

function ts( scope, color, style=null) {
    const r = {
        "scope": [scope],
        "settings": { "foreground": color }
    }
    if(!!style) {
        r = deepmerge( r, {"settings": {"fontStyle": style}} )
    }
    return r
}


const tokenColors = {
    "tokenColors": [
        ts('comment', '#B8CFE680')
    ]
}


const theme = [...from_files, tokenColors].reduce( (agg,obj) => deepmerge(agg,obj), {})
const str = JSON.stringify(theme, null, 2);
writeFileSync( 'mollbe-theme/themes/mollbe-theme.json', str, 'utf-8' )