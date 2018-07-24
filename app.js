$(document).ready(function() {
  const editor = ace.edit("editor");
  let editorTheme = editor.setTheme("ace/theme/monokai");
  let editorLanguage = editor.session.setMode("ace/mode/javascript");
  editorTheme;
  editorLanguage;

  //editorLanguage = editor.session.setMode("ace/mode/html")
  //editorTheme = editor.setTheme("ace/theme/terminal")
  
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
    console.log('gquiv button works');
  });

  $(`#lang`).on('click', function() { 
    let lang = $(`#lang`).text();

    if (lang === `.js`) {
      $(`#lang`).text(`.html`);
      editorLanguage = editor.session.setMode("ace/mode/html")
    }
    if (lang === `.html`) {
      $(`#lang`).text(`.css`);
      editorLanguage = editor.session.setMode("ace/mode/css")
    }
    if (lang === `.css`) {
      $(`#lang`).text(`.js`);
      editor.session.setMode("ace/mode/javascript");
    }
  });

  // $().on('click', function() {

  // });

});