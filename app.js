$(document).ready(function() {

  let historyFlag = 0;
  let history = [];

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
  const checkHistory = function () {
    if (!localStorage.gquivSnippets) {
      let historyString = JSON.stringify(history);
      localStorage.setItem(`gquivSnippets`, historyString);
      $(`.input-field-title`).val('gquiv-manual');
      editor.setValue(`${manual}`);
      save();
    } else {
      let historyArray = localStorage.getItem(`gquivSnippets`);
      history = JSON.parse(localStorage.getItem(`gquivSnippets`));
      historyFlag = history.length; 
    }
  }();
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
    if ($(`.input-field-delete`).val() === `gquivSnippets`) {
      localStorage.clear();
    }
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
      $(`#theme`).attr(`href`, `ulysses3XStyles.css`)
    }
    if ($theme === `ulysses3XStyles.css`) {
      $(`#theme`).attr(`href`, `redGraphiteStyles.css`)
    }
    if ($theme === `redGraphiteStyles.css`) {
      $(`#theme`).attr(`href`, `lavenderStyles.css`)
    }
  };
  const changeCodepen = function() {
    let flag = 0;
    return function() {
      if(flag === 0) {
        editorTheme = editor.setTheme("ace/theme/monokai");
        flag++;
      } else if(flag === 1) {
        editorTheme = editor.setTheme("ace/theme/chrome"); 
        flag++;
      } else if(flag === 2) {
        editorTheme = editor.setTheme("ace/theme/twilight")
        flag++;
      } else if(flag === 3) {
        editorTheme = editor.setTheme("ace/theme/tomorrow_night_blue");
        flag++;
      } else if(flag === 4) {
        editorTheme = editor.setTheme("ace/theme/terminal");
        flag++;
      } else if(flag === 5) {
        editorTheme = editor.setTheme("ace/theme/mono_industrial");
        flag++;
      } else if(flag === 6) {
        editorTheme = editor.setTheme("ace/theme/kuroir");
        flag++;
      } else if(flag === 7) {
        editorTheme = editor.setTheme("ace/theme/dracula");
        flag = 0;
      }
    };
  };
  const changeLang = function() { 
    let lang = $(`#lang`).text();
    let val = editor.getValue();
    let ph = [
      `//your code here`, 
      `<!DOCTYPE html>\n<!-- your code here -->`,
      `/*your code here*/`
    ];
    const valBasedChange = function () {
      if ((val === ph[0] || ph[2]) && (lang === `js`)) {
        $(`#lang`).text(`html`);
        editor.setValue(ph[1]);
        editorLanguage = editor.session.setMode("ace/mode/html");
      } else if ((val === ph[0] || ph[1]) && (lang === `html`)) {
        $(`#lang`).text(`css`);
        editor.setValue(ph[2]);
        editorLanguage = editor.session.setMode("ace/mode/css");
      } else if ((val === ph[1] || ph[2]) && (lang === `css`)) {
        $(`#lang`).text(`js`);
        editor.setValue(ph[0]);
        editor.session.setMode("ace/mode/javascript");
      }
    };
    const extBasedChange = function() {
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
    if (ph.includes(val)) {
      valBasedChange();
    } else {
      extBasedChange();
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
      console.log(`gquiv snippet keys:\n${localStorage.gquivSnippets}`);
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