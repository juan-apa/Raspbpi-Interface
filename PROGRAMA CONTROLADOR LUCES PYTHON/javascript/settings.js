$(document).on('ready', function (){
  /*Al cargarse el documento se van a ejecutar las siguientes cosas*/

  $(sett_menuIzqElements).on('click', function(e){
    e.preventDefault();
    var itemClickeado= $(this);
    if($(this).hasClass('selectedSetting')){
      //do nothing
    }
    else{
      $(sett_menuIzqElements).removeClass('selectedSetting');
      $(this).addClass('selectedSetting');
      var contenido= $(this).text();
      contenido= contenido.trim();

      var encontrado= false;
      var i= 0;

      while(!encontrado && i< sett_options_largo){
        if(sett_options[i]== contenido){
          encontrado= true; /*Condicion de salida del while*/
          $(sett_menus).css('display', 'none');
          $(sett_menuIzq).css('display', 'block');
          $(sett_screens[i]).css('display', 'block');
        }
        else{
          i++;
        }
      }
      if(contenido== sett_options[0]){
        if($('.settings article ul li ul.colourChange').hasClass('unfold')){
          $('.settings article ul li ul.colourChange').css('display', 'block');
        }
        else{
          $('.settings article ul li ul.colourChange').css('display', 'none');
        }
      }
    }
  });

  $('.settings article ul li.sett_colours a').on('click', function(e){
    e.preventDefault();

    $('.settings article ul li ul.colourChange').toggleClass('unfold');
    if($('.settings article ul li ul.colourChange').hasClass('unfold')){
      $('.settings article ul li ul.colourChange').css('display', 'block');
    }
    else{
      $('.settings article ul li ul.colourChange').css('display', 'none');
    }
  });
});
