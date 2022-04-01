import chroma from "chroma-js"

const gold = chroma.hsl(46, .65, .52)
const blue = chroma.hsl(46+180, .65, .52)
const selection = gold.set('hsl.h', 46-90).brighten(2.0).desaturate(2)
const misc = chroma.hsl(46+180-30, .65, .52)

const base_Structure = blue
const Structure = base_Structure.desaturate(1)
const StructureNames = base_Structure.saturate(1.5)

const VariableDeclaration = gold.darken(2)
const Parameter = gold.saturate(5)
const String = gold.set('hsl.h', 46-180+90).desaturate(2)

const Comments = chroma('Gray')


const KeyWord = gold.desaturate(1.5).darken(3)
const Text = gold.desaturate(2).darken(1)
const to_parse_colors = [
    // keywords class, def
    ['storage.type.function', Structure],
    ['storage.type.class', Structure],

    ['entity.name.tag.html', Structure],
    ['punctuation.definition.tag', Structure],
    ['meta.attribute', VariableDeclaration],
    ['string.quoted.double.html', 'Black'],

    // Klassen und Funktionen
    ['semantic.class.declaration', StructureNames],
    ['semantic.method.declaration', StructureNames],
    // ['entity.name.type.class', StructureNames], // fallback: dann wird auch der import Orange
    ['semantic.function.declaration', StructureNames],
    // ['entity.name.function', StructureNames], // fallback: dann werden auch eingebaute Funktionen orange


    // Variablen & Parameter
    ['semantic.variable.declaration', VariableDeclaration],
    ['semantic.variable', Text],  // muss gleich Text sein, sonst passt's beim Import nicht mehr
    ['semantic.parameter', Parameter],
    ['semantic.selfParameter', Parameter],

    // String & Zahlen
    ['string', String ],
    ['string.quoted.docstring.single', String ],
    ['constant.numeric', String ],
    ['constant.character.escape', String.darken(1)],

    ['constant.language', String],
    ['semantic.builtinConstant', String],

    // Keywords
    ['keyword.control.flow', KeyWord],
    ['semantic.function.builtin', KeyWord],

    ['keyword.control.import', KeyWord],
    ['source', Text],

    // Kommentare
    ['string.quoted.docstring.multi', Comments],
    ['string.quoted.docstring.single', Comments],
    ['comment', Comments.mix('black', .3)],

    ['keyword.codetag.notation', gold],



    // Rauschen
    ['punctuation.separator', Text],
    // ['punctuation.section', 'black'],
    ['punctuation.definition', Text],
    ['keyword.operator.arithmetic', Text.darken(2)],
    ['keyword.operator.comparison', Text.darken(2)],
    ['keyword.operator.assignment', Text.darken(2)],

    // ['colors.editor.foreground', Text],
    ['colors.editor.selectionBackground', selection],
    ['colors.editor.selectionForeground', 'black'],
    ['colors.editor.wordHighlightBackground', blue.brighten(3).desaturate(1)],
    ['colors.editor.wordHighlightForeground', 'Black'],
    ['colors.editor.wordHighlightBorder', blue.brighten(1.5)],
    // ----

    // ['keyword.control', chroma('black').brighten(1.5)],
    // // ['meta.class', Structure],



    // ['semantic.class', chroma(Structure).brighten(2)],
    // ['semantic.module', chroma(Structure).brighten(2)],
    // // ['entity.name.namespace', chroma(Structure).brighten(2)],








]
export default to_parse_colors