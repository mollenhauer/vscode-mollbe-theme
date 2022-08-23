# mollbe Theme for VS Code

* 🎶 With focus on semantic highlighting.
* 🎨 Dynamic build tools, featuring [chroma.js](https://gka.github.io/chroma.js/) for fast and concise color adjustments all in javascript.

## Example of configuration:
```javascript
const gold = chroma.hsl(46, .65, .52)
const selection = gold.set('hsl.h', 46-90).brighten(2.0).desaturate(2)
// ...
const base_Structure = chroma.hsl(46+180, .65, .52)
const Structure = base_Structure.desaturate(1)
// ...
const to_parse_colors = [
    // no prefix for textmate scopes
    ['storage.type.class', gold],
    // ...
    // semantic prefix for semantic scopes
    ['semantic.class.declaration', StructureNames],
    // ...
    // colors prefix will set editor colors
    ['colors.editor.selectionBackground', selection],
]
```


---

## ⭐ Download
Get it from [VS Code Marketplace](https://sdfasdfasdf/)

---


## 🧤 Development
In root directory:
* `npm run dev` will watch src/directory and build the output in `themes/`
* Press `F5` to open a new window with your extension loaded.
* Changes to the theme file are automatically applied to the Extension Development Host window.


## 🚀 Publish
* `npm run build theme`
* `npm run package` for `.vsix` file
* `npm run publish`

## 🎮 Install extension
* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
