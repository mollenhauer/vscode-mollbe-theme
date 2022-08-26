import * as jsonc_parser from 'jsonc-parser'
import {readFileSync, writeFileSync} from 'fs';
import chroma from "chroma-js"
import {inspect} from 'util'
import { existsSync } from 'fs'
const log = o => console.error(inspect(o, {showHidden: false, depth: null, colors: true}))

const possible_files = process.argv.slice(2)
if( possible_files.length == 0) {
    throw new Error(`No files as arguments provided.`)
}
const files = possible_files.filter( f => {
    const exists = existsSync(f)
    if( !exists ) throw new Error(`File ${f} not found.`)
    return exists
})

const contents = files.map( f =>
    jsonc_parser.parse( readFileSync( f, 'utf8' ) )
)
const colors = contents.flatMap( json =>
    [...new Set(
        json.tokenColors
        .flatMap( ({settings:{foreground, background}}) => [foreground, background])
        .filter( o => !!o)
        .map( c => c.substr(0,7))
    )]
)
const bgColor = contents[0].colors["editor.background"]

const color_square =
    colors.map( color => {
        let [h,s,l] = chroma(color).hsl()
        const x = h / 360
        const y = l
        return {color, x: Math.round(x/.05)|0, y: Math.round(y/.02)|0}
    })

const x = [...new Int8Array(new Set( color_square.map( ({x}) => x ) )).sort()]
const y = [...new Int8Array(new Set( color_square.map( ({y}) => y ) )).sort().reverse()]
console.log([
    '<html>',
    '<head>',
    '<style>',
    `body {
        font-family: "Consolas", Arial, sans-serif;
        background-color: ${bgColor};
        margin: 2rem;

    }
    table {margin:auto;}
    td {
        padding: .2rem .3rem;
    }
    `,
    '</style>',
    '</head>',
    '<body>',
    '<table>' +
    y.map( yy =>
        '<tr>\n' + x.map( xx => {
            const colors = color_square.filter( ({x,y}) => x==xx & y==yy)
            return '<td>' + colors.map( ({color}) =>
                `<div style="color: ${color};">${color}</div>`
            ).join("\n")+ '</td>'
       }).join("\n") + '\n</tr>'
    ).join("\n"),
    '</table>',
    '</body>',
    '</head>',
].join("\n"))