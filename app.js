$(document).ready(function() {

  // $().on('click', function() {

  // });
  
  let $title = $(`.input-field-title`).text();
  
  $(`.store-btn`).on(`click`, function() {
    //event.preventDefault(); //useful to know these two jQuery funcs
    //even.stopPropagation();
    
    localStorage.setItem('hrext', 'three is the best');
  });

  $(`.get-btn`).on('click', function() {
    console.log(localStorage.getItem('hrext'));
  });

  $(`.delete-btn`).on('click', function() {
    localStorage.removeItem('hrext');
  });

});