import path from 'path'
import { Theme, tinycolor2 as color } from "@mollbe/theme-compiler";
import { theme as theme_syntax } from "./mollbe-theme-syntax";
import { theme as theme_editor } from "./mollbe-theme-editor";

let [main] = Theme.create(
    [
        'base.jsonc',
        'semantic.jsonc',
        'type_light.jsonc',
        'solarized_light.jsonc',
        'terminal_dark.jsonc',
    ].map( f => path.join(__dirname, 'includes', f ))
)

if (require.main === module) {
    main.merge(
        theme_syntax,
        theme_editor,
    ).write('mollbe-theme\\themes\\mollbe-theme.json')
}
