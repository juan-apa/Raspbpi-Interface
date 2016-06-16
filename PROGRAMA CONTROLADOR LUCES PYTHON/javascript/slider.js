var sliders= $('div.sliders')

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
