
import chroma from "chroma-js"

// const Background = "#EEE9CC"
const Text = "#7e7e7eff"
const Lvl1 = "#FFD173"
const Lvl3 = "#ab8c4dff"
const Lvl4 = "#ffe3ab9e"


const StructureName = "#89DDFF"
const Structure = "#5CCFE6"
const Parameter = chroma(Structure).darken(.8)
const VariableDeclaration = "#f9bf5b"


const Keyword = Lvl3
const Variable = Lvl4

const String = "#758060"
const StringPlaceholder = "#EAFFBF99"


const Punctation =  chroma(Text).brighten(1.0)
const HtmlStrings = Punctation

const CommentsSub = "#B8CFE680"
const Comments = "Pink"





const to_parse_colors = [
    // keywords class, def
    ['storage.type.function', Structure],
    ['storage.type.function.arrow', StructureName],
    ['storage.type.class', Structure],

    // Klassen und Funktionen
    ['semantic.class.declaration', StructureName],
    ['semantic.method.declaration', StructureName],
    // ['entity.name.type.class', StructureNames], // fallback: dann wird auch der import Orange
    ['semantic.function.declaration', StructureName],
    // ['entity.name.function', StructureNames], // fallback: dann werden auch eingebaute Funktionen orange


    // ['semantic.parameter', Parameter], // geht net, sonst wird' in .py bei jedem Functionsaufruf bunt.
    ['variable.parameter.function', Parameter],
    // ['meta.function-call.arguments', Parameter],
    ['meta.function-call.generic.python', Text], // Gegengewicht
    ['variable.parameter.function-call.arguments', Parameter],
    ['variable.parameter.function-call', Punctation],
    ['semantic.selfParameter', Keyword],

    // Import JS
    ['meta.object-literal.key', Parameter],
    ['meta.import.js', Parameter],
    ['meta.parameters', Parameter],
    ['keyword.control.from.js', Keyword],
    ['keyword.control.import.js', Keyword],



    // HTML
    ['entity.name.tag.html', StructureName],
    ['meta.attribute.html', Structure],
    ['semantic.class', Text], // Gegengewicht für Class-Ref. in Pythoncode
    ['string.quoted.double.html', HtmlStrings],
    ['text.html', 'Silver'],
    ['string.quoted.double.html', String],
    // ['punctuation.definition.tag', "Pink"],



    // Variablen & Parameter
    ['semantic.variable.declaration', VariableDeclaration],

    ['semantic.variable', Variable],  // muss gleich Text sein, sonst passt's beim Import nicht mehr
    ['meta.item-access.arguments.python', Variable],


    // String & Zahlen
    ['string', String ],
    // ['string.quoted', String],
    ['string.quoted.docstring.single', String ],

    ['constant.numeric', String ],
    ['constant.character.escape', StringPlaceholder],
    ['constant.character.format.placeholder', StringPlaceholder],


    ['storage.type.string', StringPlaceholder], // f in f_String
    ['meta.fstring.python', StringPlaceholder], // innerhalb {}



    // ['semantic.builtinConstant', String],
    ['keyword.operator.logical', Lvl4],
    ['constant.language', Lvl4],
    ['variable.language.special.self', Lvl4],
    ['semantic.selfParameter', Lvl4],



    // Keywords
    ['keyword.control.flow', Keyword],
    ['keyword.control.conditional', Keyword],
    ['semantic.function.builtin', Keyword], //support.function.builtin.python
    ['storage.type', Keyword], //const, f-String

    ['keyword.control.import', Keyword],
    ['source', Text],

    // Kommentare
    ['string.quoted.multi.python', CommentsSub],

    ['string.quoted.docstring.multi', CommentsSub],
    ['string.quoted.docstring.single', CommentsSub],
    ['punctuation.definition.comment', CommentsSub],  // Muss sub sein, sonst beißt es sich bei js docstrings
    ['comment.block.documentation', CommentsSub],
    ['comment.line', Comments],
    ['comment.line.double-slash', Comments],

    ['keyword.codetag.notation', "#F44747"],



    // Rauschen
    ['punctuation.separator', Punctation],
    // ['punctuation.section', 'black'],
    ['punctuation.definition', Punctation],
    ['keyword.operator.arithmetic', Punctation],
    ['keyword.operator.comparison', Punctation],
    ['keyword.operator.assignment', Punctation],


    // ['colors.editor.background', Background],
    ['colors.editor.foreground', Text],

    // EDITOR SELECTION
    // ['colors.editor.selectionBackground', selection],
    // ['colors.editor.selectionForeground', 'black'],
    // ['colors.editor.wordHighlightBackground', blue.brighten(3).desaturate(1)],
    // ['colors.editor.wordHighlightForeground', 'Black'],
    // ['colors.editor.wordHighlightBorder', blue.brighten(1.5)],


    // ----

    // ['keyword.control', chroma('black').brighten(1.5)],
    // // ['meta.class', Structure],



    // ['semantic.class', chroma(Structure).brighten(2)],
    // ['semantic.module', chroma(Structure).brighten(2)],
    // // ['entity.name.namespace', chroma(Structure).brighten(2)],








]
export default to_parse_colors

// https://github.com/omgovich/colord