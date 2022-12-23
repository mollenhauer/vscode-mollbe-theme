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
const Structurel_Lvl2 = "hsl(325, 80%, 65%)"
const Structurel_Lvl3 = Text
const StructureName = {...bold, color: Structurel_Lvl1}
// 'entity.name.function': 'black', // überschreibt meta.definition.function
format( 'meta.definition.function',                          Structurel_Lvl1, bold); // name of function
format( 'entity.name.type.class',                            Structurel_Lvl1, bold); // name of function
format( 'entity.name.type.alias',                            Structurel_Lvl1, bold); // name of function
format( "meta.parameters.js",                                Structurel_Lvl3      ); // somefunction(parameter)
format( 'storage.type.function',                             Structurel_Lvl1_Sub  ); // function keyword
format( 'storage.type.type',                                 Structurel_Lvl1_Sub  ); // type keyword
format( 'entity.name.function.decorator',                    Structurel_Lvl1_Sub  ); // type keyword

format( 'storage.type.function.arrow.js',                    Dim                  ); // sonst farbe von storage.type.function.jsformat(
format( "storage.type.class",                         Structurel_Lvl1_Sub  ); // class
format( "meta.class.python",                                 StructureName        ); // class name
format( "support.function.magic.python",                     Structurel_Lvl1      ); // __init__
format( "entity.name.function.python",                       StructureName        ); // def *methodname*, in ts also call of method
format( "storage.type.function.python",                      Structurel_Lvl1_Sub  );
format( "variable.parameter.function-call.python" ,          Dim                  ); // def ( named_parameters)
format( 'storage.modifier',     Structurel_Lvl1_Sub);  // extends
format( 'storage.type.interface',     Structurel_Lvl1_Sub);  // interface {...}
format( 'entity.name.type.interface.tsx', Structurel_Lvl1, bold);
format( 'keyword.control.export',      Structurel_Lvl1);
format( 'keyword.control.default',     Structurel_Lvl1);
// format( 'meta.var.expr', bold );

format( 'meta.type.annotation.tsx', Dim);
format( 'support.type.primitive.tsx', bold);
format( 'meta.field.declaration.tsx', Structurel_Lvl1_Sub);
format( 'meta.object-literal.key', Structurel_Lvl1_Sub); // {key: }
format( 'semantic.method.declaration', Structurel_Lvl1); // render() {...}


// neue  Variablen
format( 'meta.definition.variable', Structurel_Lvl2);
format( 'semantic.variable.declaration', Structurel_Lvl2);
format( 'semantic.property.declaration', Structurel_Lvl2); // key in type Foo { bar..}
// format( 'meta.class.tsx', Structurel_Lvl1, bold);
format( 'meta.parameters', Structurel_Lvl1, 'normal');
// format( 'storage.type', Text); // const, let, var

//html
const tag1 = 'hsl(325, 40%, 40%)'
const tag2 = 'hsl(325, 30%, 60%)'
const tag3 = 'hsl(325, 20%, 40%)'
format( 'entity.name.tag', tag1, bold);
format( 'punctuation.definition.tag.begin.tsx', tag1, bold);
format( 'punctuation.definition.tag.begin.html', tag1, bold);
format( 'punctuation.definition.tag.end.tsx', tag1, bold);
format( 'punctuation.definition.tag.end.html', tag1, bold);
format( 'entity.other.attribute-name', tag2);
format( 'string.quoted.double.html', tag3);
format( 'string.quoted.double.tsx', tag3);

// objects
format( "punctuation.definition.block", HighlightedStructure); //  {} all over the place
format( "meta.parameter.object-binding-pattern", HighlightedStructure); //  {} in ({type,...other}) => {
format( "variable.parameter.js", Structurel_Lvl2); //  variablen in ({type,...other}) => { und in function( foo, bar )


// Funktionsaufrufe
// format( 'meta.function-call.js', bold); // alle functionsaufrufe ; nicht für Python
// format( "entity.name.function", bold);
format( "variable.other.constant.object.js", 'normal'); // sonst überschreibt meta.function-call auch KONSTANTE.map



// # Keywords / Structure
const Keywords = {color: Text, ...bold}
format( 'keyword.control.flow',        Keywords); // return
format( 'keyword.control.loop',        Keywords); // for, while
format( 'keyword.control.conditional', Keywords); // if, else
format( 'keyword.control.switch',      Keywords); // if, else
format( 'keyword.operator.logical',    Keywords); // and, or, ||
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
format( 'string.quoted.double', String);
format( 'string.quoted.single', String);

// String-Templates
format( 'punctuation.definition.string.template', HighlightedStructure); // backticks
format( 'punctuation.definition.template-expression', StringTemplatePlaceholderBrackets); // ${}
format( 'meta.template.expression', StringTemplatePlaceholder); // inside ${}
format( 'string.template', StringTemplate);
format( "string.interpolated", StringTemplate); // overwritten in python by string.quoted
format( "constant.character.format.placeholder.other.python", StringTemplatePlaceholderBrackets);
format( "meta.fstring.python", StringTemplate); // whole f-String, no key for placeholder
format( "storage.type.string.python", StringTemplatePlaceholderBrackets);
//format( "meta.embedded.expression.tsx", StringTemplatePlaceholderBrackets); // {your_variable} aber auch alles da drin

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



//
//  EDITOR
//
const Background = chroma("#FDF6E3")
format( 'colors.editor.background', Background);
format( 'colors.editor.foreground', Text);
format( "colors.editorCursor.foreground", Structurel_Lvl1 );
format( "colors.editorCursor.background", Structurel_Lvl1_Sub );
format( "colors.editorUnnecessaryCode.opacity", '#00000020');


// Linenumbers / LineHighlight
const Selection = "hsl(325, 40%, 80%)"
const wordHighlight = "hsl(60, 80%, 60%)"
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
format( 'colors.editor.wordHighlightStrongBackground', wordHighlight);
format( 'colors.editor.wordHighlightStrongForeground', Black);
format( 'colors.editor.wordHighlightStrongBorder',     Transparent);
format( 'colors.editor.wordHighlightBackground',       Background.mix( wordHighlight, .50));
format( 'colors.editor.wordHighlightForeground',       Black);
format( 'colors.editor.wordHighlightBorder',           Transparent);
format( "colors.editor.findMatchHighlightBackground",  Background.mix( Black, .15));
format( "colors.editor.findMatchHighlightBorder",      Transparent);
format( "colors.editor.findMatchBackground",           Background.mix( Black, .40));
format( "colors.editor.findMatchBorder",               Transparent);
format( "colors.editor.findRangeHighlightBackground",  "#69538040");

// Bracket-Match
format( "colors.editorBracketMatch.background",        Background.mix( wordHighlight, .70));
format( "colors.editorBracketMatch.border",            Transparent);


// foreground = wiggle line
format( "colors.editorInfo.background",        'hsla(60, 100%, 50%, 0.2)');
format( "colors.editorInfo.foreground",        Transparent);
format( "colors.editorInfo.border",            Transparent);

format( "colors.editorWarning.background",     'hsla(30, 100%, 50%, 0.2)');
format( "colors.editorWarning.foreground",     Transparent);
format( "colors.editorWarning.border",         Transparent);

format( "colors.editorError.background",       'rgba(255, 0, 0, 0.3)');
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
