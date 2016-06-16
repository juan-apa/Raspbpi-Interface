current_screen= $('.principal');
$(document).on('ready', function(){
  //Elements with which i am going to interact
  btn_settings= $('header ul li.settingsIcon a');
  btn_home= $('#home');
  principal= $('.principal');
  sett_sett= $('.settings');
  sett_menus= $('.settings article ul');
  sett_menuIzq= $('.settings article ul.sections');
  sett_menuIzqElements= $('.settings article ul.sections li'); //elementos del menu izq de las opciones
  sett_look_feel= $('.settings article ul.look_feel'); //menu con el contenido de look_feel
  sett_lights_settings= $('.settings article ul.lights_settings'); //menu con el contenido de lights_settings
  sett_weather_settings= $('.settings article ul.weather_settings'); //menu con el contenido de weather_settings
  sett_colours= $('#sett_colours a');
  sliders= $('.slider')




  /*Al estar esto hardcoded, el algoritmo funciona sin tener que agregar nuevos if/else
    el algoritmo funciona para todos los casos.
    Para agragar nuevas settings, solamente hay que agreegar las opciones a los 2 array*/
  var sett_options= ['look and feel', 'lights settings', 'weather settings'];
  var sett_screens= [sett_look_feel, sett_lights_settings, sett_weather_settings];
  var sett_options_largo= sett_options.length;

  var array_pantallas= [principal, sett_sett];


  /*Tengo que iniciar el reloj, porque es una funcion recursiva infinita
    una vez iniciado, va a seguir hasta que se cierre la pagina*/
  relojDigital();

  /*Seteo el tamaño de las pantallas (secciones)*/
  setScreenSize();

  setIconsPosition();

  /*Tengo que inicializar las variables, para que cuando inicio la pagina por
    primera vez, ya tengo las medidas de la pantalla, de lo contrario, tendria
    que redimensionar la pantalla al menos una vez, para que todo quede a medida
    y en posicion correcta*/
  var alturaHeader= getheaderHeight();
  var anchoPantalla= getScreenWidth();
  var altoPantalla= getScreenHeight();
  var anchoIconos= getIconsWidth();
  var anchoUlIconos= getIconsUlWidth();
  var cantidadDeIconosReal= getIconsQuantity();

  /*This is used for showing the submenus in the settings menus*/
  var actualState= 'folded';


  goHome();
  /*Set selectedSetting background to the clicked item in the
  left side menu in settings*/

  onStart();
  function onStart(){
    /*This is for hiding the menu sections that are not selected at first*/
    for (var i = 1; i < sett_screens.length; i++) {
      $(sett_screens[i]).css('display', 'none');
    }
  }


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
  $('a').on('click', function(e){
    /*Saca la funcion de hipervinculo de las etiquetas a,
      de ahora en mas, si quiero ir a algun lugar especifico de la pagina,
      lo tengo que hacer con javascript con la funcion scrollTop.*/
    e.preventDefault();
  });

  /*Ultra magic mega functional function*/
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




  $(home).on('click', function(e){
    e.preventDefault();
    goHome();
  });

  $(btn_settings).on('click', function(e){
    e.preventDefault();
    goToSettings();
  });


  $(sliders).on('click', function(){
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


});

$(window).resize(function(){

  alturaHeader= getheaderHeight();
  setScreenSize();
  stayInPosition();
  /*Si la pantalla en la que estoy es la principal, entonces hago los
    calculos para centrar los iconos del ul.icons*/
  /*Como los elementos $() son objetos de jquery, no son exactamente iguales siempre
    Al ser objetos, puedo tomarlos como un array, y la posicion 0 es siempre la misma
    para dos $() iguales, por eso comparo current_screen[0] con $('.principal')[0]*/
  if(current_screen[0]== $('.principal')[0]){
      setIconsPosition();
  }

});

/*Auxiliary functions*/
function setScreenSize(){
  var alto= (((distanceHeaderFooter()/(-10))-10)+'em');

  $(sett_sett).css('height', alto);
  $(principal).css('height', alto);
}

function setIconsPosition(){
  var cantIconReal= getIconsQuantity();

  /*Recalculo el ancho del ul.icons y el ancho de los iconos en si*/
  anchoIconos= getIconsWidth();

  anchoUlIconos= getIconsUlWidth();
  /*calculo la cantidad de iconos que puedo poner en la pantalla*/
  var cantidad= 0;
  /*tengo que inicializar aux en 0, porque le voy a sumar cosas*/
  var aux= 0;
  /*mientras que el numero que voy sumando sea menor al ancho del ul.icons*/
  /*Tengo quye agregar la condicion de salida del while para que:
    cantidad< cantidadIconosQueTengo*/
  while(aux< anchoUlIconos && cantidad<= cantIconReal){
    aux= aux+ anchoIconos;
    cantidad= cantidad+ 1;
  }
  /*Si sali del while, signica que me pase, entonces tengo que restar
    1 a la cantidad de iconos que puedo poner en una hilera en el ul*/
  cantidad= cantidad- 1;
  /*como se el ancho de los iconos y la cantidad de iconos, puedo calcular el
    ancho que me ocuparia esa cantida*/
  var anchoIconosHilera= cantidad* anchoIconos;
  /*calculo la delta para poner el espacio antes del primer y despues del
    ultimo icono*/
  /*A su vez cada icono tiene margenes de los 2 costados, los cuales son 1 em*/
  anchoIconosHilera= anchoIconosHilera+ cantidad*(2); //pongo 2, porque son 2 em y estoy trabajando en em
  var delta= anchoUlIconos- anchoIconosHilera;
  delta= delta;
  var margenCostado= delta/ 2;

  /*Aplico el margen calculado a ambos lados del ul*/
  $('.icons').css('padding-left', margenCostado);
  $('.icons').css('padding-right', margenCostado);

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
    scrollTop: ($(sett_sett).first().offset().top-altura)
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
    scrollTop: ($(principal).first().offset().top-altura)
  },500);

  /*set the current screen as HOME*/
  current_screen= $('.principal');

  /*En el caso de que haya redimensionado la ventana mientras que no estaba en
    la ventana principal, entonces calculo la nueva alineacion de los iconos de
    ul.icons li*/
    setIconsPosition();


  //console.log(alto);
}

function getheaderHeight(){
  var altura= $('header').height();
  return altura;
}

function getScreenWidth(){
  return $(window).width();
}

function getScreenHeight(){
  return $(window).height();
}

function getIconsWidth(){
  return $('.icons li').outerWidth(true);
}

function getIconsUlWidth(){
  return $('.icons').first().outerWidth(true);
}

function getIconsQuantity(){
  return $('.icons li').length;
}
