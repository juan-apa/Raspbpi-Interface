/*Calculate distance between end of header
  and start of footer, to dynamically resize
  sections*/

  function distanceHeaderFooter(){
    var header= $('header');
    var footer= $('footer');
    var distance= header.offset().top - footer.offset().top;
    return distance;
  }
