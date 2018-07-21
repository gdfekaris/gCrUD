$(document).ready(function() {

  // $().on('click', function() {

  // });
  
  
  
  $(`.store-btn`).on(`click`, function() {
    //event.preventDefault(); //useful to know these two jQuery funcs
    //even.stopPropagation();
    
    let $title = $(`.input-field-title`).val();
    let $content = $(`.input-field-body`).val();
    
    localStorage.setItem($title, $content);

    // $(`.input-field-title`).val(``);
    // $(`.input-field-body`).val(``);
  });

  $(`.get-btn`).on('click', function() {
    let userFile = $(`.input-field-get`).val();
    let getThis = localStorage.getItem(userFile);

    //$(`.display-retrieved`).html(`<p>${userFile} ${getThis}</p>`);

    $(`.input-field-title`).val(`${userFile}`);
    $(`.input-field-body`).val(`${getThis}`);

  });

  $(`.delete-btn`).on('click', function() {
    let deleteValue = $(`.input-field-delete`).val();

    localStorage.removeItem(deleteValue);
  });

});