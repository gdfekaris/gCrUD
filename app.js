$(document).ready(function() {
  let historyFlag = 0;
  let history = [];
  let settings = {
    skins: [
      `lavenderStyles.css`,
      `titaniumStyles.css`,
      `marineStyles.css`,
      `cobaltStyles.css`,
      `ulysses3XStyles.css`,
      `redGraphiteStyles.css`
    ],
    themes: [
      `ace/theme/dracula`,
      `ace/theme/monokai`,
      `ace/theme/chrome`,
      `ace/theme/twilight`,
      `ace/theme/tomorrow_night_blue`,
      `ace/theme/terminal`,
      `ace/theme/mono_industrial`,
      `ace/theme/kuroir`
    ],
    languages: [
      `ace/mode/javascript`,
      `ace/mode/html`,
      `ace/mode/css`
    ],
    extensions: [
      `js`,
      `html`,
      `css`
    ],
    placeholders: [
      `//your code here`, 
      `<!DOCTYPE html>\n<!-- your code here -->`,
      `/*your code here*/`
    ]
  };
  
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
    let $titleSk = `${$title}Sk`
    let $titleTh = `${$title}Th`;
    let $titleLa = `${$title}La`;
    let skin = $(`#theme`).attr(`href`)
    let theme = editor.getTheme();
    let lang = $(`#lang`).text();
    innerDelete($title);
    localStorage.setItem($title, content);
    history.push($title)
    historyFlag = history.length - 1;
    localStorage.setItem(`gquivSnippets`, JSON.stringify(history))
    localStorage.setItem($titleSk, skin);
    localStorage.setItem($titleTh, theme);
    localStorage.setItem($titleLa, lang);
  };
  const checkHistory = function () {
    if (!localStorage.gquivSnippets) {
      let historyString = JSON.stringify(history);
      localStorage.setItem(`gquivSnippets`, historyString);
      $(`.input-field-title`).val('gquiv-manual');
      editor.setValue(`${manual}`);
      save();
    } else {
      localStorage['gquiv-manual'] = manual;
      history = JSON.parse(localStorage.getItem(`gquivSnippets`));
      historyFlag = history.length; 
    }
  }();
  const get = function() {
    let userFile = $(`.input-field-get`).val();
    let skin = localStorage.getItem(`${userFile}Sk`);
    let theme = localStorage.getItem(`${userFile}Th`);
    let lang = localStorage.getItem(`${userFile}La`);
    $(`.input-field-title`).val(`${userFile}`);
    if ((localStorage[userFile] === undefined) || (userFile === `//get key`) || (userFile === ``)) {
      $(`#theme`).attr(`href`, settings.skins[0]);
      $(`#lang`).text(`js`);
      editor.setTheme(settings.themes[0]);
      editor.session.setMode(settings.languages[0]);
      editor.session.setValue(`null`);
      if ((userFile === `//get key`) || (userFile === ``)) {
        editor.setValue(`//your code here`);
      }
      historyFlag = history.length;
    } else if (localStorage[userFile] !== undefined) {
      let code = localStorage.getItem(userFile);
      editor.session.setValue(`${code}`);
      if (lang === `js`) {
        editor.session.setMode(settings.languages[0])
      } else {
        editor.session.setMode(`ace/mode/${lang}`)
      }
      $(`#theme`).attr(`href`, skin);
      editor.setTheme(theme);
      $(`#lang`).text(lang);
      history.forEach(function(e, i) {
        if (userFile === e) {
          historyFlag = i;
        }
      })
    }
    $(`.input-field-get`).val(``);
  };
  const deleteSnippet = function() {
    let deleteValue = $(`.input-field-delete`).val();
    if ($(`.input-field-delete`).val() === `gquivSnippets`) {
      localStorage.clear();
      location.reload(true);
    }
    localStorage.removeItem(deleteValue);
    localStorage.removeItem(`${deleteValue}Sk`);
    localStorage.removeItem(`${deleteValue}Th`);
    localStorage.removeItem(`${deleteValue}La`);
    $(`.input-field-delete`).val(``);
    innerDelete(deleteValue); 
  };
  const changeSkin = function() {
    let flag = 0;
    let limit = settings.skins.length - 1;
    return function() {
      let currentSkin = $(`#theme`).attr(`href`)
      settings.skins.forEach(function(e, i) {
        if (e === currentSkin) { flag = i }
      })
      flag++;
      if ((flag < 0 ) || ( flag > limit)) { flag = 0 }
      $(`#theme`).attr(`href`, `${settings.skins[flag]}`)
    };
  };
  const changeCodepen = function() {
    let flag = 0;
    let limit = settings.themes.length - 1;
    return function() {
      let currentTheme = editor.getTheme();
      settings.themes.forEach(function(e, i) {
        if (e === currentTheme) { flag = i }
      })
      flag++;
      if ((flag < 0 ) || ( flag > limit)) { flag = 0 }
      editor.setTheme(`${settings.themes[flag]}`);
    };
  };
  const changeLang = function() { 
    let flagL = 0;
    let flagE = 0;
    let flagP = 0;
    let limitL = settings.languages.length - 1;
    let limitE = settings.extensions.length - 1;
    let limitP = settings.placeholders.length - 1;
    return function() {
      let val = editor.getValue();
      let currentLang = $(`#lang`).text();
      settings.extensions.forEach(function(e, i) {
        if (e === currentLang) { 
          flagL = i;
          flagE = i;
          flagP = i;
        }
      })
      flagL++;
      flagE++;
      flagP++;
      if ( (flagL < 0 ) || (flagL > limitL) ) { flagL = 0 }
      if ( (flagE < 0 ) || (flagE > limitE) ) { flagE = 0 }
      if ( (flagP < 0 ) || (flagP > limitP) ) { flagP = 0 }
      if (settings.placeholders.includes(val)) {
        editor.session.setMode(settings.languages[flagL]);
        $(`#lang`).text(settings.extensions[flagE]);
        editor.setValue(settings.placeholders[flagP]);
      } else {
        editor.session.setMode(settings.languages[flagL]);
        $(`#lang`).text(settings.extensions[flagE]);
      }
    }
  };
  const pressEnter = function (e) {
    if((e.which === 13) && (e.target.className === `input-field-title`)){
      save();
      $(`.store-btn`).hide();
      setTimeout(function(){$(`.store-btn`).show();},25)
    }
    if((e.which === 13) && (e.target.className === `input-field-get`)){
      get();
      $(`.get-btn`).hide();
      setTimeout(function(){$(`.get-btn`).show();},25)
    }
    if((e.which === 13) && (e.target.className === `input-field-delete`)){
      deleteSnippet();
      $(`.delete-btn`).hide();
      setTimeout(function(){$(`.delete-btn`).show();},25)
    }
  };
  const backArrow = function () {
    historyFlag--;
    if (historyFlag < 0) { historyFlag = 0; }
    let backSnip = history[historyFlag];
    let skin = localStorage.getItem(`${backSnip}Sk`);
    let theme = localStorage.getItem(`${backSnip}Th`);
    let lang = localStorage.getItem(`${backSnip}La`);
    $(`.input-field-title`).val(`${backSnip}`);
    editor.session.setValue(`${localStorage.getItem(backSnip)}`);
    $(`#lang`).text(lang);
    $(`#theme`).attr(`href`, skin);
    editor.setTheme(theme);
    if (lang === `js`) {
      editor.session.setMode(settings.languages[0]);
    } else {
      editor.session.setMode(`ace/mode/${lang}`);
    }
  };
  const forwardArrow = function() {
    historyFlag++;
    if (historyFlag > (history.length - 1)) {
      historyFlag = history.length - 1;
    }
    let forwardSnip = history[historyFlag];
    let skin = localStorage.getItem(`${forwardSnip}Sk`);
    let theme = localStorage.getItem(`${forwardSnip}Th`);
    let lang = localStorage.getItem(`${forwardSnip}La`);
    $(`.input-field-title`).val(`${forwardSnip}`);
    editor.session.setValue(`${localStorage.getItem(forwardSnip)}`);
    $(`#lang`).text(lang);
    $(`#theme`).attr(`href`, skin);
    editor.setTheme(theme);
    if (lang === `js`) {
      editor.session.setMode(settings.languages[0]);
    } else {
      editor.session.setMode(`ace/mode/${lang}`);
    }
  };
  const getHistory = function(e) {
    if (e.target.className === `back`) {
      backArrow();
    } 
    if (e.target.className === `forward`) {
      forwardArrow();
    }
  };
  const runCode = function(e) {
    let code = editor.getValue();
    if(e.metaKey && e.which === 98) {
      console.log(Function(code)());
    }
  };
  const logGquivSnippets = function(e) {
    if(e.metaKey && e.keyCode === 221) {
      console.log(`gquiv snippet keys:\n${localStorage.gquivSnippets}`);
    }
  };
  
  $(`.store-btn`).on(`click`, save);
  $(`.get-btn`).on('click', get);
  $(`.delete-btn`).on('click', deleteSnippet);
  $(`#gquiv`).on('click', changeSkin());
  $(`#dot`).on('click', changeCodepen());
  $(`#lang`).on('click', changeLang());
  $(`#forward-arrow`).on('click', getHistory);
  $(`#back-arrow`).on('click', getHistory);
  $(`.input-field-title`).on('keypress', pressEnter);
  $(`.input-field-get`).on('keypress', pressEnter);
  $(`.input-field-delete`).on('keypress', pressEnter);
  $(`#editor_wrapper`).bind('keypress', runCode);
  $(document).bind('keydown', logGquivSnippets);
});