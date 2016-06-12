var relojPantalla= $('.nav .clock');
var horaActual;
var horas;
var minutos;
var segundos;


function relojDigital(){
  relojPantalla= $('.nav .clock');
  horaActual= new Date();
  horas= horaActual.getHours();
  minutos= horaActual.getMinutes();
  segundos= horaActual.getSeconds();

  if(minutos<= 9){
    minutos= '0'+ minutos;
  }
  if(horas<= 9){
    horas= '0'+ horas;
  }
  if(segundos<=9){
    segundos= '0'+ segundos;
  }
  $(relojPantalla).text(horas+':'+minutos+':'+segundos);
  setTimeout('relojDigital()', 1000);
}
