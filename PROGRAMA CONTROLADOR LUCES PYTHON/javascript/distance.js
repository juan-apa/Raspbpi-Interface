/*Calculate distance between end of header
  and start of footer, to dynamically resize
  sections*/

  var distance;

  function distanceHeaderFooter(){
    var header= $('header');
    var footer= $('footer');
    distance= header.offset().top - footer.offset().top;
    return distance;
  }
