$(document).ready(function() {

  // $().on('click', function() {

  // });
  
  
  
  $(`.store-btn`).on(`click`, function() {
    //event.preventDefault(); //useful to know these two jQuery funcs
    //even.stopPropagation();
    
    let $title = $(`.input-field-title`).val();
    let $content = $(`.input-field-body`).val();
    
    localStorage.setItem('title', $title);
    localStorage.setItem('content', $content);
  });

  $(`.get-btn`).on('click', function() {
    let titleValue = localStorage.getItem('title');
    let contentValue = localStorage.getItem('content');

    $(`.display-retrieved`).html(`<p>${titleValue} ${contentValue}</p>`)

    //console.log(titleValue, contentValue);
  });

  $(`.delete-btn`).on('click', function() {
    localStorage.removeItem('hrext');
  });

});