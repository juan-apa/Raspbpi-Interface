$(document).on('ready', function(){
  //Elements with which i am going to interact
  btn_settings= $('header ul li.settingsIcon a');
  btn_home= $('#home');
  principal= $('.principal');
  sliders= $('div.slider'); //sliders
  sett_sett= $('.settings');
  sett_menus= $('.settings ul');
  sett_menuIzq= $('.settings ul.sections');
  sett_menuIzqElements= $('.settings ul.sections li'); //elementos del menu izq de las opciones
  sett_look_feel= $('.settings ul.look_feel'); //menu con el contenido de look_feel
  sett_lights_settings= $('.settings ul.lights_settings'); //menu con el contenido de lights_settings
  sett_weather_settings= $('.settings ul.weather_settings'); //menu con el contenido de weather_settings

  current_screen= $('.principal');


  /*Al estar esto hardcoded, el algoritmo funciona sin tener que agregar nuevos if/else
    el algoritmo funciona para todos los casos.
    Para agragar nuevas settings, solamente hay que agreegar las opciones a los 2 array*/
  var sett_options= ['look and feel', 'lights settings', 'weather settings'];
  var sett_screens= [sett_look_feel, sett_lights_settings, sett_weather_settings];
  var sett_options_largo= sett_options.length;

  var array_pantallas= [principal, sett_sett];


  /*Seteo la hora del reloj*/
  relojDigital();
  /*Seteo el tamaño de las pantallas*/
  setScreenSize();

  var alturaHeader= getheaderHeight();

  goHome();
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
    }
  });



  $(sliders).on('click', function(e){
    //prevent hyperlink
    e.preventDefault();

    //Toggle slider ON/OFF
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

  $(home).on('click', function(e){
    e.preventDefault();
    goHome();
  });

  $(btn_settings).on('click', function(e){
    e.preventDefault();
    console.log('boton apretado');
    goToSettings();
  });


});

$(window).resize(function(){

  alturaHeader= getheaderHeight();
  setScreenSize();
  stayInPosition();

  console.log('settings: '+ $('.settings').offset().top);
  console.log('principal: '+ $('.principal').offset().top);
  console.log('distancia H/F: '+ distance);

});

/*Auxiliary functions*/
function setScreenSize(){
  var alto= (((distanceHeaderFooter()/(-10))-10)+'em');

  $(sett_sett).css('height', alto);
  $(principal).css('height', alto);
}

function stayInPosition(){
  var altura= getheaderHeight();
  $('html, body').animate({
    scrollTop: ($(current_screen).first().offset().top-altura)
  },0);
}

function goToSettings(){
  /*escondo todas las secciones*/
  $('section').css('display', 'none');

  /*Muestro la seccion principal*/
  $('.principal').css('display', 'block');

  /*muestro las settings*/
  $('.settings').css('display', 'block');
  var altura= getheaderHeight();
  $('html, body').animate({
    scrollTop: ($('.settings').first().offset().top-altura)
  },500);

  current_screen= $('.settings');

}

function goHome(){
  /*Muestro el principal, porque puede estar con display none*/
  $(principal).css('display', 'block');
  /*obtengo la posicion del final del header en la pagina
    luego 'scrolleo' a la section .principal*/
    var altura= getheaderHeight();
  $('html, body').animate({
    scrollTop: ($('.principal').first().offset().top-altura)
  },500);

  /*set the current screen as HOME*/
  current_screen= $('.principal');

  //onsole.log(alto);
}

function getheaderHeight(){
  var altura= $('header').height();
  return altura;
}
