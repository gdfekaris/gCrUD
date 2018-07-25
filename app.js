$(document).ready(function() {
  const editor = ace.edit("editor");
  let editorTheme = editor.setTheme("ace/theme/monokai");
  let editorLanguage = editor.session.setMode("ace/mode/javascript");
  editor.setValue(`//your code here`);
  editorTheme;
  editorLanguage;
  
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
      editorTheme = editor.setTheme("ace/theme/chrome");
      flag++;
    } else if(flag === 1) {
      editorTheme = editor.setTheme("ace/theme/terminal"); 
      flag++;
    } else if(flag === 2) {
      editorTheme = editor.setTheme("ace/theme/twilight");
      flag++;
    } else if(flag === 3) {
      editorTheme = editor.setTheme("ace/theme/monokai");
      flag = 0;
    }
  });

  $(`#lang`).on('click', function() { 
    let lang = $(`#lang`).text();
    if (editor.getValue() === `//your code here`) {
        editor.setValue(`<!DOCTYPE html>\n<!-- your code here -->`);
    } else if (editor.getValue() === `<!DOCTYPE html>\n<!-- your code here -->`) {
        editor.setValue(`/*your code here*/`);
    } else if (editor.getValue() === `/*your code here*/`) {
        editor.setValue(`//your code here`);
    }
    if (lang === `js`) {
      $(`#lang`).text(`html`);
      editorLanguage = editor.session.setMode("ace/mode/html");
    }
    if (lang === `html`) {
      $(`#lang`).text(`css`);
      editorLanguage = editor.session.setMode("ace/mode/css");
    }
    if (lang === `css`) {
      $(`#lang`).text(`js`);
      editor.session.setMode("ace/mode/javascript");
    }
  });
});