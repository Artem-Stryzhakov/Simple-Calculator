# Documentation

---

## Task🔗

---
https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0

## How to run the app📱

---
1. Download zip file and extract it to a place convenient for you or just clone the project via [Github CLI](https://cli.github.com/) using ```gh repo clone Artem-Stryzhakov/Simple-Calculator``` in your Cmd (Windows) or Terminal (MacOS).
2. Open the project folder in your development environment (VS Code / IDE) and write ```npm install``` in console. It will download all necessary files.
3. Write ```npm run serve``` in your console to launch local server. After server is launched, open http://localhost:8080 in your browser, or you can just open ```./dist/index.html``` directly.

## Folder structure📁

---
I have several folders for work:
```
Simple-Calculator/
|── dist/                                 # Built project (generated after build), ready for deployment
|   |── index.html
|   └── main.js
|── src/                                  # Source code
|    |── scripts/                         # Contains secondary javascript files
|        |── calculatorFunctions.js       # Calculator logic functions
|        └── theme.js                     # Theme change functionality
|    |── themes/                          # Contains secondary css files
|        |── dark-theme.css               # Dark theme style
|        └── light-theme.css              # Light theme style
|    |── index.js                         # Main .js file
|    └── style.css                        # Main .css file
└── node_modules/                         # Dependencies (auto-generated)
```

The ```dist/``` folder appears only after building app via ```npm run dev``` or ```npm run build```.

## The App deploy

---
You can check the deployed version of the app by clicking this [link](https://artem-stryzhakov.github.io/github.io-Simple-Calculator/) and files themselves [here](https://github.com/Artem-Stryzhakov/github.io-Simple-Calculator).
