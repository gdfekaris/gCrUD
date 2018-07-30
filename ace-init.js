const editor = ace.edit("editor");
let editorTheme = editor.setTheme("ace/theme/monokai");
let editorLanguage = editor.session.setMode("ace/mode/javascript");
editor.setValue(`//your code here`);
editorTheme;
editorLanguage;