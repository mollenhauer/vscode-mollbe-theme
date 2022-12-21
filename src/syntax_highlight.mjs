
import chroma from "chroma-js"

const Background = chroma("#FDF6E3") //.desaturate(.2)
const Text = "#586E75"
const Dim = "#586E7580"
const UIAccent = "#AC9D57"


const Structurel_Lvl1 = "#D33682"
const Structurel_Lvl1_Sub = chroma(Background).mix(Structurel_Lvl1, .8)
const Structurel_Lvl3 = Text // chroma(Background).mix(Structurel_Lvl1, .75)

const StructureName = Structurel_Lvl1
const Structure = Structurel_Lvl1_Sub
const Keyword = Structurel_Lvl3



// const Data_Lvl1 = "#0290f5"
// const Data_Lvl2 = chroma(Background).mix(Data_Lvl1, .8)
// const Data_Lvl3 = chroma(Background).mix(Data_Lvl1, .6)
const Data_Lvl1 = "#0290f5"
const Data_Lvl2 = Text
const Data_Lvl3 = Text

const Parameter = Data_Lvl1
const VariableDeclaration = Data_Lvl2
const Variable = Data_Lvl3



const String = "#859900"
const StringPlaceholder = chroma(String).alpha(0x99)

const Comments = chroma("#2AA198")
const CommentsSub = chroma(Comments).alpha(0x80)

const Punctation =  chroma(Structurel_Lvl1).darken(.5)
const HtmlStrings = Punctation

const ShouldNotShow = 'Cyan'


const Selection = chroma(Data_Lvl1).brighten(1).desaturate(1)


export default {
    'storage.type.function': Structure,

    'storage.type.function': Structure,
    'storage.type.class': Structure,

    // Classen und Funktionsköpfe hervorheben
    // 'meta.class': {fontStyle: 'bold'},
    'entity.name.type.class.python': {fontStyle: 'bold'},
    // 'meta.function': ShouldNotShow, 'normal',
    // 'variable.parameter.function.language': {fontStyle: 'normal'},
    // 'meta.function.parameters': {fontStyle: 'normal'},

    'storage.type.function.arrow': StructureName,
    'semantic.class.declaration': StructureName,
    'semantic.method.declaration': StructureName,
    // 'entity.name.type.class': StructureNames, // fallback: dann wird auch der import Orange
    'semantic.function.declaration': StructureName,

    // Name of function in declaration bold
    'entity.name.function.python': {fontStyle: 'bold'},
    'support.function.magic.python': {fontStyle: 'bold'}, //__init__

    // 'entity.name.function': StructureNames, // fallback: dann werden auch eingebaute Funktionen orange


    // Variablen & Parameter
    // 'semantic.parameter': Parameter, // geht net, sonst wird' in .py bei jedem Functionsaufruf bunt.
    // 'semantic.selfParameter': Parameter,
    'semantic.parameter.declaration': Structure,
    'semantic.selfParameter.declaration': Structure,



    // 'variable.parameter.function': Parameter,
    // "variable.parameter.function.language": Parameter,
    // 'meta.function.parameters': Parameter,

    'semantic.variable.declaration': VariableDeclaration,
    // 'meta.function-call.arguments': Parameter,
    // 'meta.function-call.generic.python': "Cyan", // Gegengewicht
    // 'meta.function-call.arguments.python': "Yellow",

    'variable.parameter.function-call.arguments': Dim,
    'variable.parameter.function-call': Dim,
    // "meta.member.access": Parameter,


    'semantic.variable': Variable,  // muss gleich Text sein, sonst passt's beim Import nicht mehr
    'meta.item-access.arguments.python': Variable,

    // 'meta.function-call': Structurel_Lvl1_Sub, //{fontStyle: 'bold'},

    // Import JS
    'meta.object-literal.key': Text,
    'meta.object-literal.key': Text,
    'meta.import.js': Text, // to keep colors the same
    'keyword.control.import': {color: Text, fontStyle: 'bold'},
    'keyword.control.from.js': {color: Text, fontStyle: 'bold'},


    // 'meta.parameters': Parameter,
    'keyword.control.conditional.js': {color: Keyword, fontStyle: 'bold'},
    // Korrekturen
    // 'storage.type.function.js': {fontStyle: 'normal'},
    'meta.definition.function.js': {fontStyle: 'bold'},
    // 'meta.var.expr.js': {fontStyle: 'italic'},
    'storage.type.js':  {color: Keyword, fontStyle: 'bold'},


    "punctuation.definition.block.js": Structure,


    // HTML
    'entity.name.tag.html': StructureName,
    'meta.attribute.html': Structure,
    'semantic.class': Text, // Gegengewicht für Class-Ref. in Pythoncode
    'string.quoted.double.html': HtmlStrings,
    'text.html': Text,
    'string.quoted.double.html': String,
    // 'punctuation.definition.tag': "Pink",

    // String & Zahlen
    'string': String ,
    // 'string.quoted': String,
    'string.quoted.docstring.single': String ,

    'constant.numeric': String ,
    'constant.character.escape': StringPlaceholder,
    'constant.character.format.placeholder': StringPlaceholder,


    'storage.type.string': StringPlaceholder, // f in f_String
    'meta.fstring.python': StringPlaceholder, // innerhalb {}



    // 'semantic.builtinConstant': String,
    'keyword.operator.logical': {color: Data_Lvl3, fontStyle: 'bold'},
    // 'keyword.operator': {color: "Red", fontStyle: 'bold'},
    'constant.language': Data_Lvl3,
    'variable.language.special.self': Data_Lvl3,




    // Keywords
    'keyword.control.flow': {color: Keyword, fontStyle: 'bold'},
    'keyword.control.conditional': {color: Keyword, fontStyle: 'bold'},
    'semantic.function.builtin': Keyword, //support.function.builtin.python
    'storage.type': Keyword, //const, f-String



    // Kommentare
    'string.quoted.multi.python': CommentsSub,

    'string.quoted.docstring.multi': CommentsSub,
    'string.quoted.docstring.single': CommentsSub,
    'punctuation.definition.comment': CommentsSub,  // Muss sub sein, sonst beißt es sich bei js docstrings
    'comment.block.documentation': CommentsSub,
    'comment.line': Comments,
    'comment.line.double-slash': Comments,

    'keyword.codetag.notation': "#F44747",



    // Rauschen
    'punctuation': Punctation,
    'punctuation.section': Punctation,
    'punctuation.separator': Punctation,
    // 'punctuation.section': 'black',
    'punctuation.definition': Text,
    'keyword.operator.arithmetic': Punctation,
    'keyword.operator.comparison': Punctation,
    'keyword.operator.assignment': Punctation,
    'meta.brace.round.js': Punctation,


    // EDITOR SELECTION
    'source': Text,
    'colors.editor.background': Background,
    'colors.editor.foreground': Text,

    'colors.editor.selectionBackground': Selection,
    'colors.editor.lineHighlightBackground': Background.mix( Selection, .2),
    'colors.editor.selectionForeground': 'black',
    'colors.editor.selectionHighlightBackground': Background.mix( 'Yellow', .3),
    'colors.editor.wordHighlightBackground': Background.mix( 'Yellow', .3),
    'colors.editor.wordHighlightForeground': 'Black',
    'colors.editor.wordHighlightBorder': '#00000000',
    'colors.editor.wordHighlightStrongBackground': Background.mix( 'Yellow', .5),
    'colors.editor.wordHighlightStrongBorder': "#000000FF",
    "colors.editorBracketMatch.background": Background.mix( Selection, .8).mix('Yellow', .5),
    "colors.editorBracketMatch.border": Background.mix( Selection, .8).mix('Yellow', .5),
    // "colors.editorBracketHighlight.foreground1": "Red",
    // "colors.editorBracketHighlight.foreground2": "Red",
    // "colors.editorBracketHighlight.foreground3": "Red",
    // "colors.editorBracketHighlight.foreground4": "Red",
    // "colors.editorBracketHighlight.foreground5": "Red",
    // "colors.editorBracketHighlight.foreground6": "Red",
    // "colors.editorBracketHighlight.unexpectedBracket.foreground": "Red",
    // "colors.editorBracketPairGuide.activeBackground1": "Red",
    // "colors.editorBracketPairGuide.activeBackground2": "Red",
    // "colors.editorBracketPairGuide.activeBackground3": "Red",
    // "colors.editorBracketPairGuide.activeBackground4": "Red",
    // "colors.editorBracketPairGuide.activeBackground5": "Red",
    // "colors.editorBracketPairGuide.activeBackground6": "Red",
    // "colors.editorBracketPairGuide.background1": "Red",
    // "colors.editorBracketPairGuide.background2": "Red",
    // "colors.editorBracketPairGuide.background3": "Red",
    // "colors.editorBracketPairGuide.background4": "Red",
    // "colors.editorBracketPairGuide.background5": "Red",
    // "colors.editorBracketPairGuide.background6": "Red",
    "colors.editor.foldBackground": "#00000015",

    "colors.editorCursor.foreground": Data_Lvl1,
    // ----

    // 'keyword.control': chroma('black').brighten(1.5),
    // // 'meta.class': Structure,



    // 'semantic.class': chroma(Structure).brighten(2),
    'semantic.module': Data_Lvl2,
    // // 'entity.name.namespace': chroma(Structure).brighten(2),

    // "editor.findMatchBackground": "#695380",
    // "editor.findMatchBorder": "#695380",
    // "editor.findMatchHighlightBackground": "#69538066",
    // "editor.findMatchHighlightBorder": "#5c467266",
    // "editor.findRangeHighlightBackground": "#69538040",
    // "editor.selectionBackground": "#409fff40",
    // "editor.selectionHighlightBackground": "#87d96c26",
    // "editor.selectionHighlightBorder": "#87d96c00",
    // "editor.wordHighlightBackground": "#80bfff14",
    // "editor.wordHighlightBorder": "#80bfff80",
    // "editor.wordHighlightStrongBackground": "#87d96c14",
    // "editor.wordHighlightStrongBorder": "#87d96c80",



    "colors.editorLineNumber.activeForeground": Selection,
    "colors.editorLineNumber.foreground": chroma(Selection).mix(Background, .5),

    // "colors.scrollbar.shadow": "",
    "colors.scrollbarSlider.background": chroma(Background).mix(UIAccent, .2),
    "colors.scrollbarSlider.hoverBackground": chroma(Background).mix(UIAccent, .7),
    "colors.scrollbarSlider.activeBackground": chroma(Background).mix(UIAccent, 1),



    // "editor.button.background": Gold,
    // "editor.statusBarItem.remoteBackground": Gold,

}

// https://github.com/omgovich/colord

// https://culorijs.org/