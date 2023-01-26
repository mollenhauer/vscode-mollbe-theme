import { Theme, tinycolor2 as color } from "@mollbe/theme-compiler";
import { Structurel_Lvl1, Structurel_Lvl1_Sub, Structurel_Lvl2, Structurel_Lvl2_Sub, Text } from "./mollbe-theme-syntax";

const [theme, format] = Theme.create()

const Transparent = '#ffffff00'
const Black = '#000000'
//
//  EDITOR
//
const Background = color("#FDF6E3")
format( 'colors.editor.background', Background);
format( 'colors.editor.foreground', Text);
format( "colors.editorCursor.foreground", Structurel_Lvl1 );
format( "colors.editorCursor.background", Structurel_Lvl1_Sub );
format( "colors.editorUnnecessaryCode.opacity", '#00000090');
format( "colors.editorUnnecessaryCode.border", Transparent);
format( "semantic.searchEditor.findMatchBorder", Transparent);


// Linenumbers / LineHighlight
const Selection = "hsl(325, 40%, 80%)"
const wordHighlight = "hsla(60, 80%, 60%, .8)"
const LineHighlight = '#00000010'
format( "colors.editorLineNumber.activeForeground", Black);
format( "colors.editorLineNumber.foreground",       color.mix(Background, Black, 15));
format( 'colors.editor.lineHighlightBackground',    LineHighlight);
// format( 'colors.editor.lineHighlightBorder',        Transparent);
// Selection
format( 'colors.editor.selectionBackground',           Selection);
format( 'colors.editor.selectionForeground',           Black);
format( 'colors.editor.findRangeHighlightBackground',  color(Selection).setAlpha(20) );

// id. Wörter nur für Text, JSON.... ?
format( 'colors.editor.selectionHighlightBackground',  Transparent);
format( 'colors.editor.selectionHighlightBorder',      Transparent);

// Akt. markiertes Wort
format( 'colors.editor.wordHighlightStrongBackground', wordHighlight);
// format( 'colors.editor.wordHighlightStrongForeground', Black);
format( 'colors.editor.wordHighlightStrongBorder',     'red');
format( 'colors.editor.wordHighlightBackground',       color.mix( Background, wordHighlight, 50) );
// format( 'colors.editor.wordHighlightForeground',       Black);
format( 'colors.editor.wordHighlightBorder',           Transparent);
format( "colors.editor.findMatchBackground",           color.mix( Background, Selection, 100)); // selected match (F3)
format( "colors.editor.findMatchHighlightBackground",  color.mix( Background, wordHighlight, 60) ); // all occ
format( "colors.editor.findMatchHighlightBorder",      Transparent);
format( "colors.editor.findMatchBorder",               Transparent);
format( "colors.editor.findRangeHighlightBackground",  color(Selection).setAlpha(.3)  );
format( "colors.editor.findRangeHighlightBorder",      'red');

// Bracket-Match
format( "colors.editorBracketMatch.background",        color.mix( Background, wordHighlight, 70));
format( "colors.editorBracketMatch.border",            Transparent);


// foreground = wiggle line
format( "colors.editorInfo.background",        'hsla(60, 100%, 50%, 0.2)');
format( "colors.editorInfo.foreground",        Transparent);
format( "colors.editorInfo.border",            Transparent);

format( "colors.editorWarning.background",     'hsla(30, 100%, 50%, 0.12)');
format( "colors.editorWarning.foreground",     Transparent);
format( "colors.editorWarning.border",         Transparent);

format( "colors.editorError.background",       'rgba(255, 0, 0, 0.08)');
format( "colors.editorError.foreground",       Transparent);
format( "colors.editorError.border",           Transparent);

format( "colors.editorLightBulb.foreground", "hsl(55, 100%, 40%)");
format( "colors.editorLightBulbAutoFix.foreground", "hsl(200, 100%, 40%)");


//
// UI
//

// Scrollbars
const UIAccent = "#AC9D57"
format( "colors.scrollbarSlider.background",       color.mix(Background, UIAccent,  20));
format( "colors.scrollbarSlider.hoverBackground",  color.mix(Background, UIAccent,  70));
format( "colors.scrollbarSlider.activeBackground", color.mix(Background, UIAccent, 100));


// Git
// format( "colors.gitDecoration.addedResourceForeground",        "#374e06",);
// format( "colors.gitDecoration.conflictingResourceForeground", "#ad0707",);
// format( "colors.gitDecoration.deletedResourceForeground", "#ad0707",);
// format( "colors.gitDecoration.ignoredResourceForeground", "#8e8e90",);
format( "colors.gitDecoration.modifiedResourceForeground", Structurel_Lvl2);
// format( "colors.gitDecoration.renamedResourceForeground", "#007100",);
// format( "colors.gitDecoration.stageDeletedResourceForeground", "#ad0707",);
// format( "colors.gitDecoration.stageModifiedResourceForeground", "#895503",);
// format( "colors.gitDecoration.submoduleResourceForeground", "#1258a7",);
format( "colors.gitDecoration.untrackedResourceForeground", Structurel_Lvl1);

export {theme}