export const actualizarBotones =(stockActual, max, botonMenos, botonMas) => {
  if (stockActual === 1) {
    botonMenos.style.opacity = "0.5";
    botonMenos.style.pointerEvents = "none";
    botonMas.style.opacity = "1";
    botonMas.style.pointerEvents = "auto";
  } else if (stockActual === max && stockActual !== 0) {
    botonMas.style.opacity = "0.5";
    botonMas.style.pointerEvents = "none";
    botonMenos.style.opacity = "1";
    botonMenos.style.pointerEvents = "auto";
  } else if(stockActual === 0){
    botonMenos.style.opacity = "0.5";
    botonMenos.style.pointerEvents = "none";
    botonMas.style.opacity = "0.5";
    botonMas.style.pointerEvents = "none";
  } else if(stockActual === 1.5){
    botonMenos.style.opacity = "0.5";
    botonMenos.style.pointerEvents = "none";
    botonMas.style.opacity = "0.5";
    botonMas.style.pointerEvents = "none";    
  } else {
    botonMenos.style.opacity = "1";
    botonMenos.style.pointerEvents = "auto";
    botonMas.style.opacity = "1";
    botonMas.style.pointerEvents = "auto";
  }
}
