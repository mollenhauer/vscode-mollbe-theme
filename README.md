# mollbe Theme for VS Code

<br>


## 💾 Download
Get it from [VS Code Marketplace: mollbe Theme](https://marketplace.visualstudio.com/items?itemName=mollenhauer.mollbe-theme)

## 🎯 Focus
Theme focuses on two aspects:
* 🎶 Light Theme with focus of revealing the structure of your code.
![Screenshot of Theme][screenshot]



* 🎨 Process of building a theme:
  * Live Preview
  * Easy reuse of existent VS Code Themes via merging into *.jsonc
  * Dynamic build tool uses JavaScript files to configure all colors, so creating a pallet (with the help of [chroma.js](https://gka.github.io/chroma.js/)) and reusing colors is easy.



## Example of configuration:
### src/syntax_highlighting.mjs
```javascript
const [theme, format] = createTemplate()
const Structurel_Lvl1 = "hsl(325, 100%, 50%)"
format( 'entity.name.type.class', Structurel_Lvl1, bold);
```

`src/syntax_highlighting.mjs` will get build and merged into everything `src/*.jsonc`. So reuse of compiled VS Code Themes is easy.

You could also incorporate any JavaScript color library [chroma](https://github.com/gka/chroma.js/), [colord](https://github.com/omgovich/colord) or [culori](https://culorijs.org/)



---


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
* Get it from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mollenhauer.mollbe-theme)
* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.


[swatches]: screenshots/swatches.png
[development]: screenshots/Extension_Development_Host.png
[screenshot]: screenshots/Screenshot%202022-12-23.png
