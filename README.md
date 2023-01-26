# mollbe Theme for VS Code

<br>


## 💾 Download
Get it from VisualStudio Marketplace: [mollbe Theme](https://marketplace.visualstudio.com/items?itemName=mollenhauer.mollbe-theme)

## 🎶 Semantic, light theme with focus of revealing the structure of your code:
![Screenshot of Theme][screenshot]



## 🎨 Special process and tooling for building an awesome theme:
* Based on NPM package [@mollbe/theme-compiler](https://www.npmjs.com/package/@mollbe/theme-compiler) a Typescript library which helps by
  * building color schemes with the help of [tinycolor2](https://www.npmjs.com/package/tinycolor2)
  * modularity
  * by reusing existent VS Code Themes merging into *.jsonc
 ```typescript
import { Theme, tinycolor2 as color } from "@mollbe/theme-compiler";
import { theme as theme_syntax } from "./mollbe-theme-syntax";
import { theme as theme_editor } from "./mollbe-theme-editor";
const [main, format] = Theme.create( [ 'base.jsonc' ])
const String = "hsl(96, 90%, 40%)"
format( 'string.quoted.single', String);
main.merge( theme_syntax, theme_editor, ).write('mollbe-theme.json')
```
  * Live Preview  side by side


---


# Usage

## 🧤 Development Server (Live Preview)
In root directory call
```
npm run dev
```
and it will watch `src/` and automaticly build into `themes/`

Press `F5` to open a new window with your extension loaded. Changes to the theme file are automatically applied to the "Extension Development Host" window -- everything get's updaed after each save! 🏆


## 🚀 Publish
```
npm run build theme
npm run package
npm run publish
```

## 🎮 Install extension
* Get it from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mollenhauer.mollbe-theme)
* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.


[screenshot]: https://raw.githubusercontent.com/mollenhauer/vscode-mollbe-theme/main/screenshots/Screenshot%202023-01-25.png
