$(document).on('ready', function(){
  //Elements with which i am going to interact
  sliders= $('div.slider'); //sliders
  sett_menus= $('.settings ul');
  sett_menuIzq= $('.settings ul.sections');
  sett_menuIzqElements= $('.settings ul.sections li'); //elementos del menu izq de las opciones
  sett_look_feel= $('.settings ul.look_feel'); //menu con el contenido de look_feel
  sett_lights_settings= $('.settings ul.lights_settings'); //menu con el contenido de lights_settings

  /*Seteo la hora del reloj*/
  relojDigital();

  /*Set selectedSetting background to the clicked item in the
  left side menu in settings*/
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
      console.log(contenido.trim());
      if(contenido== 'look and feel'){
        $(sett_menus).css('display', 'none');
        $(sett_menuIzq).css('display', 'block');
        $(sett_look_feel).css('display', 'block');
      }
      else{
        if(contenido== 'lights settings'){
          $(sett_menus).css('display', 'none');
          $(sett_menuIzq).css('display', 'block');
          $(sett_lights_settings).css('display', 'block');
        }
      }
    }
  });



  $(sliders).on('click', function(e){
    //prevent hyperlink
    e.preventDefault();

    //move the slider right or left
    var sliderClickeado= $(this);
    if($(sliderClickeado).hasClass('ON')){
      $(sliderClickeado).toggleClass('ON');
      $(sliderClickeado).addClass('OFF');
    }
    else{
      $(sliderClickeado).toggleClass('OFF');
      $(sliderClickeado).addClass('ON')
    }
  });

});
