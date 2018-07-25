$(document).ready(function() {
  const editor = ace.edit("editor");
  let editorTheme = editor.setTheme("ace/theme/monokai");
  let editorLanguage = editor.session.setMode("ace/mode/javascript");
  editorTheme;
  editorLanguage;

  //more themes
  // let terminal = editor.setTheme("ace/theme/terminal")
  // let tomorrow = editor.setTheme("ace/theme/tomorrow");
  // let tomorrow_night_eighties = editor.setTheme("ace/theme/tomorrow_night_eighties");
  
  $(`.store-btn`).on(`click`, function() {
    let $title = $(`.input-field-title`).val();
    let content = editor.getValue();
    
    localStorage.setItem($title, content);
  });

  $(`.get-btn`).on('click', function() {
    let userFile = $(`.input-field-get`).val();
    let getThis = localStorage.getItem(userFile);

    $(`.input-field-title`).val(`${userFile}`);
    editor.session.setValue(`${getThis}`);

    $(`.input-field-get`).val(``);
  });

  $(`.delete-btn`).on('click', function() {
    let deleteValue = $(`.input-field-delete`).val();

    localStorage.removeItem(deleteValue);

    $(`.input-field-delete`).val(``);
  });

  $(`#gquiv`).on('click', function() {
    let $theme = $(`#theme`).attr(`href`);

    if ($theme === `lavenderStyles.css`) {
      $(`#theme`).attr(`href`, `marineStyles.css`)
    }
    if ($theme === `marineStyles.css`) {
      $(`#theme`).attr(`href`, `cobaltStyles.css`)
    }
    if ($theme === `cobaltStyles.css`) {
      $(`#theme`).attr(`href`, `titaniumStyles.css`)
    }
    if ($theme === `titaniumStyles.css`) {
      $(`#theme`).attr(`href`, `lavenderStyles.css`)
    }
  });

  let flag = 0;
  $(`#dot`).on('click', function() {
    if(flag === 0) {
      editorTheme = editor.setTheme("ace/theme/tomorrow");
      flag++;
    } else if(flag === 1) {
      editorTheme = editor.setTheme("ace/theme/terminal"); 
      flag++;
    } else if(flag === 2) {
      editorTheme = editor.setTheme("ace/theme/tomorrow_night_eighties");
      flag++;
    } else if(flag === 3) {
      editorTheme = editor.setTheme("ace/theme/monokai");
      flag = 0;
    }
  });

  $(`#lang`).on('click', function() { 
    let lang = $(`#lang`).text();

    if (lang === `js`) {
      $(`#lang`).text(`html`);
      editorLanguage = editor.session.setMode("ace/mode/html");
      //$(`#editor`).html(`<div id="editor"><!-- your code here --></div>`)
    }
    if (lang === `html`) {
      $(`#lang`).text(`css`);
      editorLanguage = editor.session.setMode("ace/mode/css");
      //$(`#editor`).text(`<div id="editor">/*your code here*/</div>`)
    }
    if (lang === `css`) {
      $(`#lang`).text(`js`);
      editor.session.setMode("ace/mode/javascript");
      //$(`#editor`).text(`<div id="editor">//your code here</div>`)
    }
  });
});