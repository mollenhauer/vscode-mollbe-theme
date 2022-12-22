import chroma from "chroma-js"

function createTemplate() {
    const theme = {}
    const chromaPrototype = Object.getPrototypeOf(chroma('red'))
    function format(name, ...properties) {
        function parseProperties(props) {
            const isPlainObject = value => value?.constructor === Object;
            const isChroma = o => Object.getPrototypeOf(o) === chromaPrototype
            const parsedProps = props.map( p => {
                if (typeof p === 'string' && (p == 'normal'||p == 'bold'||p == 'italic'||p == 'underline') ) {
                    return {fontStyle: p}
                } else if (typeof p === 'string' ) {
                    return {color: p}
                } else if ( isPlainObject(p) ) {
                    return p
                } else if ( isChroma(p) ) {
                    return {color: p.hex()}
                }
            })
            return parsedProps.reduce(
                (acc, val) => Object.assign(acc, val),
                {}
            )
        }
        const props = parseProperties(properties)
        theme[name] = props
        return props
    }
    return [theme, format]
}
const [theme, format] = createTemplate()


const Dim = {color: "#586E7580"}
const bold = {fontStyle: 'bold'}
const Black = 'black';
const Transparent = '#00000000'


const Text = "#586E75"
format( 'source', Text );

const HighlightedStructure = {color: 'hsl(340, 100%, 50%)'}

// import
format( 'keyword.control.import', Dim, bold); // import
format( 'keyword.control.from', Dim, bold); // from
format( 'variable.other.readwrite.alias', bold); // import {}
format( 'constant.language.import-export-all', HighlightedStructure); // import *, pasenden zu {}
format( 'meta.import.js', Text); // alles vom Import außer alias, sonst Farbe von Strings
// {} sind punctuation.definition.block.js


// # Structure
const Structurel_Lvl1 = "hsl(325, 100%, 50%)"
const Structurel_Lvl1_Sub = "hsl(325, 90%, 65%)"
const Structurel_Lvl2 = "hsl(325, 80%, 70%)"
const Structurel_Lvl3 = Text
const StructureName = {...bold, color: Structurel_Lvl1}
// 'entity.name.function': 'black', // überschreibt meta.definition.function
format( 'meta.definition.function',                          Structurel_Lvl1, bold); // name of function
format( "meta.parameters.js",                                Structurel_Lvl3      ); // somefunction(parameter)
format( 'storage.type.function.js',                          Structurel_Lvl1_Sub  ); // function keyword
format( 'storage.type.function.arrow.js',                    Dim                  ); // sonst farbe von storage.type.function.jsformat(
format( "storage.type.class.python",                         Structurel_Lvl1_Sub  ); // class
format( "meta.class.python",                                 StructureName        ); // class name
format( "support.function.magic.python",                     Structurel_Lvl1      ); // __init__
format( "entity.name.function.python",                       StructureName        ); // def *methodname*
format( "storage.type.function.python",                      Structurel_Lvl1_Sub  );
format( "variable.parameter.function-call.python" ,          Dim                  ); // def ( named_parameters)
// neue  Variablen
format( 'storage.type', Text); // const, let, var
format( 'meta.definition.variable', Structurel_Lvl2);

// Funktionsaufrufe
format( 'meta.function-call.js', bold); // alle functionsaufrufe ; nicht für Python
format( "variable.other.constant.object.js", 'normal'); // sonst überschreibt meta.function-call auch KONSTANTE.map



// # Keywords / Structure
const Keywords = {color: Text, ...bold}
format( 'keyword.control.flow',        Keywords); // return
format( 'keyword.control.loop',        Keywords); // for, while
format( 'keyword.control.conditional', Keywords); // if, else
format( 'keyword.operator.logical',    Keywords); // if, else
format( 'keyword.operator.ternary',    Keywords); // ? :



// Comments
const CommentBlock = "hsl(175, 70%, 40%)"
const CommentOneliner = "hsl(175, 50%, 40%)"
format( 'comment.line',                   CommentOneliner);
format( 'comment.line.number-sign',       CommentOneliner);
format( 'comment.block',                  CommentBlock);

const DocString = "hsl(325, 50%, 60%)"
format( 'comment.block.documentation.js', DocString);


// Strings
const String = "hsl(175, 100%, 35%)"
const StringTemplate = String
const StringTemplatePlaceholder = "hsl(175, 80%, 30%)"
const StringTemplatePlaceholderBrackets = HighlightedStructure
// "meta.object-literal.key.js": 'red', // {[your_key]: 'Foo'} - andeere object keys werden überlagert von string.quoted.double
format( 'string.quoted.double.js', String);
format( 'string.quoted.single.js', String);
format( 'string.quoted.single.python', String); // overwrites fstring
format( 'meta.object-literal.key', String); // Einheitlichkeit von {"foo":..., foo:...}
// String-Templates
format( 'punctuation.definition.string.template', HighlightedStructure); // backticks
format( 'punctuation.definition.template-expression', StringTemplatePlaceholderBrackets); // ${}
format( 'meta.template.expression', StringTemplatePlaceholder); // inside ${}
format( 'string.template', StringTemplate);
format( "string.interpolated", StringTemplate); // overwritten in python by string.quoted
format( "constant.character.format.placeholder.other.python", StringTemplatePlaceholderBrackets);
format( "meta.fstring.python", StringTemplate); // whole f-String, no key for placeholder
format( "storage.type.string.python", StringTemplatePlaceholderBrackets);

// bracets and stuff
format( 'meta.brace.round', Dim);
format( 'punctuation.accessor', Dim);
format( 'punctuation.separator.key-value', Dim);
format( 'keyword.operator.assignment', Dim); // =
format( 'keyword.operator.comparison', Dim); // ==, ===
format( 'punctuation.definition.string.begin', Dim); // "
format( "punctuation.definition.string.end", Dim);
format( "meta.brace.square.js", Dim);
format( "keyword.operator.rest.js", Dim); //...
format( "keyword.operator.spread.js", Dim); // ...
// objects
format( "punctuation.definition.block.js", HighlightedStructure); //  {} all over the place
format( "meta.parameter.object-binding-pattern", HighlightedStructure); //  {} in ({type,...other}) => {
format( "variable.parameter.js", Structurel_Lvl2); //  variablen in ({type,...other}) => { und in function( foo, bar )



//
//  EDITOR
//
const Background = chroma("#FDF6E3")
format( 'colors.editor.background', Background);
format( 'colors.editor.foreground', Text);
format( "colors.editorCursor.foreground", Structurel_Lvl1 );
format( "colors.editorCursor.background", Structurel_Lvl1_Sub );
format( "colors.editorUnnecessaryCode.opacity", '#00000090');


// Linenumbers / LineHighlight
const Selection = "hsl(325, 50%, 85%)"
const LineHighlight = '#00000010' //'#eab3df'; //chroma(Structurel_Lvl2).brighten(1).desaturate(1)
format( "colors.editorLineNumber.activeForeground", Black);
format( "colors.editorLineNumber.foreground",       chroma(Background).mix(Black, .15));
format( 'colors.editor.lineHighlightBackground',    LineHighlight);
// Selection
format( 'colors.editor.selectionBackground',           Selection);
format( 'colors.editor.selectionForeground',           Black);
// id. Wörter nur für Text, JSON.... ?
format( 'colors.editor.selectionHighlightBackground',  Transparent);
format( 'colors.editor.selectionHighlightBorder',      Transparent);

// Akt. markiertes Wort
format( 'colors.editor.wordHighlightStrongBackground', Background.mix( Selection, .70));
format( 'colors.editor.wordHighlightStrongForeground', Black);
format( 'colors.editor.wordHighlightStrongBorder',     Transparent);
format( 'colors.editor.wordHighlightBackground',       Background.mix( Selection, .50));
format( 'colors.editor.wordHighlightForeground',       Black);
format( 'colors.editor.wordHighlightBorder',           Transparent);
format( "colors.editor.findMatchHighlightBackground",  Background.mix( Black, .15));
format( "colors.editor.findMatchHighlightBorder",      Transparent);
format( "colors.editor.findMatchBackground",           Background.mix( Black, .40));
format( "colors.editor.findMatchBorder",               Transparent);
format( "colors.editor.findRangeHighlightBackground",  "#69538040");

// Bracket-Match
format( "colors.editorBracketMatch.background",        Background.mix( Selection, .70));
format( "colors.editorBracketMatch.border",            Transparent);


// foreground = wiggle line
format( "colors.editorInfo.background",        'hsla(60, 100%, 50%, 0.2)');
format( "colors.editorInfo.foreground",        Transparent);
format( "colors.editorInfo.border",            Transparent);

format( "colors.editorWarning.background",     'hsla(30, 100%, 50%, 0.2)');
format( "colors.editorWarning.foreground",     Transparent);
format( "colors.editorWarning.border",         Transparent);

format( "colors.editorError.background",       'hsla(0, 100%, 50%, 0.1)');
format( "colors.editorError.foreground",       Transparent);
format( "colors.editorError.border",           Transparent);

format( "colors.editorLightBulb.foreground", "hsl(55, 100%, 40%)");
format( "colors.editorLightBulbAutoFix.foreground", "hsl(200, 100%, 40%)");


//
// UI
//

// Scrollbars
const UIAccent = "#AC9D57"
format( "colors.scrollbarSlider.background",       chroma(Background).mix(UIAccent, 0.2));
format( "colors.scrollbarSlider.hoverBackground",  chroma(Background).mix(UIAccent, 0.7));
format( "colors.scrollbarSlider.activeBackground", chroma(Background).mix(UIAccent, 1.0));


    // "editor.button.background": Gold,
    // "editor.statusBarItem.remoteBackground": Gold,


export default theme;

// https://github.com/omgovich/colord
// https://culorijs.org/