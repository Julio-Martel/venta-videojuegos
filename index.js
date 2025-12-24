
/*AGREGAR LA LOGICA DE CAMBIO DE IMAGENES*/

const idImagen = document.getElementById('nro-imagen-1').id;
const partesId = idImagen.split("-");

const slide = {
  botonDerecho: document.getElementById('flecha-uno'),
  botonIzquierdo: document.getElementById('flecha-dos')
};


if(partesId[2] === "1") {
    slide.botonDerecho.style.opacity = "0.5";
    slide.botonDerecho.style.pointerEvents = "none";
} else {

}


//slide.botonDerecho.addEventListener('click', );
