$(document).on('ready', function{
  slider= $('footer div');

  $(slider).on('click', function (){
    if($(slider).hasClass('ON')){
      $(slider).removeClass('ON');
      $(slider).addClass('OFF');
    }
    else{
      $(slider).removeClass('OFF');
      $(slider).addClass('ON');
      ;
    }
    }
  });
});
