# mollbe Theme for VS Code


## 🎯 Focus
Theme focuses on two aspects:
* 🎶 Semantic highlighting
* 🎨 Process of building a theme:
  * Live Preview
  * Easy reuse of existent VS Code Themes via merging into *.jsonc
  * Dynamic build tool uses JavaScript files to configure all colors, so creating a pallet (with the help of [chroma.js](https://gka.github.io/chroma.js/)) and reusing colors is easy.



## Example of configuration:
### src/syntax_highlighting.mjs
```javascript
const base_Structure = chroma.hsl(46+180, .65, .52)
const Structure_Lvl1 = base_Structure
const Structure_Lvl2 = base_Structure.desaturate(1)
// ...
const Gold = chroma.hsl(46, .65, .52)
const Selection = Gold.set('hsl.h', 46-90).brighten(2.0).desaturate(2)
// ...
const to_parse_colors = [
    // "semantic" prefix for semantic scopes
    ['semantic.class.declaration', Structure_Lvl1],
    // ...
    // no prefix for textmate scopes
    ['storage.type.class', Structure_Lvl2],
    // ...
    // "colors" prefix will set editor colors
    ['colors.editor.selectionBackground', Selection],
]
```
`src/syntax_highlighting.mjs` will get build and merged into everything `src/*.jsonc`. So reuse of compiled VS Code Themes is easy.

---

<!---

## ⭐ Download
Get it from [VS Code Marketplace](https://)
---

--->

# How to Work

## 🎨 Swatches
```
npm run swatch
```
extracts syntax colors of any theme (*.jsonc) to a html-page with all colors sorted:
![Swatches - automatically Extractes from jsonc of any theme][swatches]

## 🧤 Development Server (Live Preview)
In root directory call
```
npm run dev
```
and it will watch `src/` and automaticly build into `themes/`

Press `F5` to open a new window with your extension loaded. Changes to the theme file are automatically applied to the "Extension Development Host" window -- everything get's updaed after each save! 🏆

![Screenshot of Extension Development Host][development]


## 🚀 Publish
```
npm run build theme
npm run package
npm run publish
```

## 🎮 Install extension
* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.



[swatches]: screenshots/swatches.png
[development]: screenshots/Extension_Development_Host.png
