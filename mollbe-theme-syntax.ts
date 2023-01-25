import { Theme, tinycolor2 as color } from "@mollbe/theme-compiler";

const [theme, format] = Theme.create()


const Dim = {color: "hsla(194, 32%, 32%, 0.6)"}
const bold = {fontStyle: 'bold'}
export const Text = "#586E75"
const HighlightedStructure = {color: 'hsl(340, 100%, 50%)'}
export const Structurel_Lvl1 = "hsl(325, 100%, 50%)"
export const Structurel_Lvl1_Sub = "hsl(325, 90%, 65%)"
export const Structurel_Lvl2 = "hsl(325, 50%, 50%)"
export const Structurel_Lvl2_Sub = "hsl(326, 30%, 60%)"
const StructureName = {...bold, color: Structurel_Lvl1}
const tag1 = 'hsl(325, 40%, 40%)'
const tag2 = 'hsl(325, 30%, 60%)'
const tag3 = 'hsl(325, 20%, 40%)'
const Keywords = {color: Text, ...bold}
const CommentBlock = "hsl(175, 70%, 40%)"
const CommentOneliner = "hsl(175, 50%, 40%)"
const DocString = "hsl(325, 50%, 60%)"
const String = "hsl(96, 90%, 40%)"
const StringTemplate = String
const StringTemplatePlaceholder = "hsl(96, 80%, 60%)"
const StringTemplatePlaceholderBrackets = HighlightedStructure

format( 'source', Text );

// import
format( 'keyword.control.import', Dim, bold); // import
format( 'keyword.control.from', Dim, bold); // from
format( 'variable.other.readwrite.alias', bold); // import {}
format( 'constant.language.import-export-all', HighlightedStructure); // import *, pasenden zu {}
format( 'meta.import.js', Text); // alles vom Import außer alias, sonst Farbe von Strings
// {} sind punctuation.definition.block.js


// # Structure


// 'entity.name.function': 'black', // überschreibt meta.definition.function
format( 'meta.definition.function',                   Structurel_Lvl1, bold); // name of function
format( 'meta.definition.method',                   Structurel_Lvl1, bold); // name of function in ts
// format( 'entity.name.type.class',                     Structurel_Lvl1, bold); // name of function -- highlights very occurance
format( 'entity.name.type.alias',                     Structurel_Lvl1, bold); // name of function
// format( 'semantic.function.declaration',              Structurel_Lvl1, bold); // name of function
// format( 'semantic.class.declaration',                 Structurel_Lvl1, bold); // name of class // highlights whole line
// format( "meta.parameters.js",                         Structurel_Lvl3      ); // somefunction(parameter)
format( 'storage.type.function',                      Structurel_Lvl1_Sub  ); // function keyword
format( 'storage.type.type',                          Structurel_Lvl1_Sub  ); // type keyword
format( 'entity.name.function.decorator',             Structurel_Lvl2_Sub  ); // type keyword
format( 'meta.function.decorator',             Structurel_Lvl2_Sub  ); // type keyword

format( 'storage.type.function.arrow.js',             Dim                  ); // sonst farbe von storage.type.function.jsformat(
format( "storage.type.class",                         Structurel_Lvl1_Sub  ); // class
format( "meta.class.python",                          StructureName        ); // class name
format( "support.function.magic.python",              Structurel_Lvl1, bold); // __init__
format( "entity.name.function.python",                StructureName        ); // def *methodname*, in ts also call of method
format( "storage.type.function.python",               Structurel_Lvl1_Sub  );
format( "variable.parameter.function-call.python" ,   Dim                  ); // def ( named_parameters)
format( 'storage.modifier',                           Structurel_Lvl1_Sub);  // extends
format( 'storage.type.interface',                     Structurel_Lvl1_Sub);  // interface {...}
format( 'entity.name.type.interface.tsx',             Structurel_Lvl1, bold);
format( 'entity.name.type.interface.ts',              Structurel_Lvl1, bold);
format( 'keyword.control.export',                     Structurel_Lvl1_Sub);
format( 'keyword.control.default',                    Structurel_Lvl1);
// format( 'meta.var.expr', bold );

format( 'meta.type.annotation.tsx',    Dim);
format( 'support.type.primitive.tsx',  bold);
format( 'meta.field.declaration.tsx',  Structurel_Lvl1_Sub);

// format( 'semantic.method.declaration', Structurel_Lvl1); // render() {...}


// neue  Variablen
format( 'meta.definition.variable',      Structurel_Lvl2);
format( 'semantic.variable.declaration', Structurel_Lvl2);
// format( 'semantic.property.declaration', Structurel_Lvl2); // key in type Foo { bar..}

// format( 'meta.class.tsx', Structurel_Lvl1, bold);
// format( 'meta.parameters',               Structurel_Lvl1_Sub);
format( 'semantic.parameter',               Structurel_Lvl1_Sub);
// format( 'semantic.selfParameter',            Text);
// format( 'storage.type', Text); // const, let, var

//html

format( 'entity.name.tag', tag1, bold);
format( 'punctuation.definition.tag.begin.tsx', tag1, bold);
format( 'punctuation.definition.tag.begin.html', tag1, bold);
format( 'punctuation.definition.tag.end.tsx', tag1, bold);
format( 'punctuation.definition.tag.end.html', tag1, bold);
format( 'entity.other.attribute-name', tag2);
format( 'string.quoted.double.html', tag3);
format( 'string.quoted.double.tsx', tag3);

// objects
format( "punctuation.definition.block",          HighlightedStructure); //  {} all over the place
// format( "meta.parameter.object-binding-pattern", Structurel_Lvl1_Sub); //  {} in ({type,...other}) => {
format( "variable.parameter.js",                 Structurel_Lvl2); //  variablen in ({type,...other}) => { und in function( foo, bar )


// Funktionsaufrufe
// format( 'meta.function-call.js', bold); // alle functionsaufrufe ; nicht für Python
// format( "entity.name.function", bold);
format( "variable.other.constant.object.js", 'normal'); // sonst überschreibt meta.function-call auch KONSTANTE.map



// # Keywords / Structure

format( 'keyword.control.flow',        Keywords); // return
format( 'keyword.control.loop',        Keywords); // for, while
format( 'keyword.control.conditional', Keywords); // if, else
format( 'keyword.control.switch',      Keywords); // if, else
format( 'keyword.operator.logical',    Keywords); // and, or, ||
format( 'keyword.operator.ternary',    Keywords); // ? :




// Comments
format( 'comment.line',                   CommentOneliner);
format( 'comment.line.number-sign',       CommentOneliner);
format( 'comment.block',                  CommentBlock);

format( 'comment.block.documentation.js', DocString);


// Strings


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


format( 'meta.object-literal.key',     String); // {key: }
format( 'meta.definition.property',     String); // {key: }

export {theme}
