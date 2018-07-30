$(document).ready(function() {

  let historyFlag = 0;
  let history = [];

  const checkHistory = function () {
    if (!localStorage.gquivSnippets) {
      let historyString = JSON.stringify(history);
      localStorage.setItem(`gquivSnippets`, historyString);
    } else {
      let historyArray = localStorage.getItem(`gquivSnippets`);
      history = JSON.parse(localStorage.getItem(`gquivSnippets`));
      historyFlag = history.length; 
    }
  }();

  $(`#gquiv`).css( 'cursor', 'pointer' );
  $(`#dot`).css( 'cursor', 'pointer' );
  $(`#lang`).css( 'cursor', 'pointer' );
  $(`#back-arrow`).css( 'cursor', 'pointer' );
  $(`#forward-arrow`).css( 'cursor', 'pointer' );

  const innerDelete = function(value) {
    history.forEach(function(e, i) {
      if (value === e) {
        history.splice(i, 1);
        let historyString = JSON.stringify(history);
        localStorage.setItem(`gquivSnippets`, historyString);
      }
    })  
  };
  const save = function() {
    let $title = $(`.input-field-title`).val();
    let content = editor.getValue();
    innerDelete($title);
    localStorage.setItem($title, content);
    history.push($title)
    historyFlag = history.length - 1;
    localStorage.setItem(`gquivSnippets`, JSON.stringify(history))
  };
  const get = function() {
    let userFile = $(`.input-field-get`).val();
    let getThis = localStorage.getItem(userFile);
    $(`.input-field-title`).val(`${userFile}`);
    editor.session.setValue(`${getThis}`);
    $(`.input-field-get`).val(``);
    history.forEach(function(e, i) {
      if (userFile === e) {
        historyFlag = i;
      }
    })
  };
  const deleteSnippet = function() {
    let deleteValue = $(`.input-field-delete`).val();
    localStorage.removeItem(deleteValue);
    $(`.input-field-delete`).val(``);
    innerDelete(deleteValue); 
  };
  const changeSkin = function() {
    let $theme = $(`#theme`).attr(`href`);
    if ($theme === `lavenderStyles.css`) {
      $(`#theme`).attr(`href`, `titaniumStyles.css`)
    }
    if ($theme === `titaniumStyles.css`) {
      $(`#theme`).attr(`href`, `marineStyles.css`)
    }
    if ($theme === `marineStyles.css`) {
      $(`#theme`).attr(`href`, `cobaltStyles.css`)
    }
    if ($theme === `cobaltStyles.css`) {
      $(`#theme`).attr(`href`, `lavenderStyles.css`)
    }
  };
  const changeCodepen = function() {
    let flag = 0;
    return function() {
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
    };
  };
  const changeLang = function() { 
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
  };
  const pressEnter = function (e) {
    if((e.which === 13) && (e.target.className === `input-field-title`)){
      save();
    }
    if((e.which === 13) && (e.target.className === `input-field-get`)){
      get();
    }
    if((e.which === 13) && (e.target.className === `input-field-delete`)){
      deleteSnippet();
    }
  };
  const getHistory = function(e) {
    if (e.target.className === `back`) {
      historyFlag--;
      if (historyFlag < 0) {
        historyFlag = 0;
      }
      let backSnip = history[historyFlag];
      $(`.input-field-title`).val(`${backSnip}`);
      editor.session.setValue(`${localStorage.getItem(backSnip)}`);
    } 
    if (e.target.className === `forward`) {
      historyFlag++;
      if (historyFlag > (history.length - 1)) {
        historyFlag = history.length - 1;
      }
      let forwardSnip = history[historyFlag];
      $(`.input-field-title`).val(`${forwardSnip}`);
      editor.session.setValue(`${localStorage.getItem(forwardSnip)}`);
    }
  };
  const runCode = function(e) {
    let code = editor.getValue();
    if( e.which === 98 && e.metaKey ) {
      console.log(Function(code)());
    }
  };
  const logGquivSnippets = function(e) {
    if( e.which === 63) {
      console.log(`your gquiv snippets:\n${localStorage.gquivSnippets}`);
    }
  };
  
  $(`.store-btn`).on(`click`, save);
  $(`.get-btn`).on('click', get);
  $(`.delete-btn`).on('click', deleteSnippet);
  $(`#gquiv`).on('click', changeSkin);
  $(`#dot`).on('click', changeCodepen());
  $(`#lang`).on('click', changeLang);
  $(`#forward-arrow`).on('click', getHistory);
  $(`#back-arrow`).on('click', getHistory);
  $(`.input-field-title`).on('keypress', pressEnter);
  $(`.input-field-get`).on('keypress', pressEnter);
  $(`.input-field-delete`).on('keypress', pressEnter);
  $(`#editor_wrapper`).bind('keypress', runCode);
  $(document).bind('keypress', logGquivSnippets);

});