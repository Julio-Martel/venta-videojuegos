/*AGREGAR LA LOGICA FALTANTE*/

import { generarContenidoProductos } from "./productos.js";
import { volverACrearPaginaInicial } from "./generarPaginaPrincipal.js";

const mainContent = document.getElementById('main-content')
const imagen = document.getElementById("nro-imagen-1");
const verProductos = document.getElementById("boton-productos");
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonLogeo = document.getElementById('boton-log');
const formularioLogeo = document.getElementById('formulario-logeo');
const encabezado = document.getElementById('encabezado');
const cuerpoPagina = document.getElementById('cuerpo')
let sesionIniciada = false;



const delay = (ms) => new Promise(r => setTimeout(r, ms));

const usuariosRegistrados = [
  { nombreUsuario: 'julio4561',password: '1234'},
  { nombreUsuario: 'marco123', password: '2312'}
];

const logeo = {
    nomUsuario: document.getElementById('usuario'),
    pasUsuario: document.getElementById('contraseña'),
    labelUsuario: document.getElementById('label-usuario'),
    labelPassword: document.getElementById('label-contraseña')
}


const slide = {
  botonDerecho: document.getElementById("flecha-uno"),
  botonIzquierdo: document.getElementById("flecha-dos"),
  imagen1: document.getElementById("img-1"),
  imagen2: document.getElementById("img-2"),
  imagen3: document.getElementById("img-3")
};

function actualizarEstado() {
  const partesId = imagen.id.split("-");

  if (partesId[2] === "1") {
    slide.botonDerecho.style.opacity = "0.5";
    slide.botonDerecho.style.pointerEvents = "none";

    slide.botonIzquierdo.style.opacity = "1";
    slide.botonIzquierdo.style.pointerEvents = "auto";
  } else if(partesId[2] === "2"){
    slide.botonDerecho.style.opacity = "1";
    slide.botonDerecho.style.pointerEvents = "auto";
    
    slide.botonIzquierdo.style.opacity = "1";
    slide.botonIzquierdo.style.pointerEvents = "auto";
  } else if(partesId[2] === "3") {
    slide.botonIzquierdo.style.opacity = "0.5";
    slide.botonIzquierdo.style.pointerEvents =  "none";

    slide.botonDerecho.style.opacity = "1";
    slide.botonDerecho.style.pointerEvents  = "auto";
  }

}

actualizarEstado();

slide.botonIzquierdo.addEventListener("click", async () => {
  const partesId = imagen.id.split("-");

  imagen.classList.add("ocultar");
  await delay(100);

  if(partesId[2] === "1"){
    imagen.id = "nro-imagen-2";
    imagen.src = "./images/imagen2.jpg";
  } else if(partesId[2] === "2"){
    imagen.id = "nro-imagen-3";
    imagen.src = "./images/imagen3.jpg";
  }

  imagen.classList.remove("ocultar");
  imagen.classList.
  add("mostrar");
  await delay(100);
  imagen.classList.remove("mostrar");
  actualizarEstado();
});

slide.botonDerecho.addEventListener("click", async () => {
  const partesId = imagen.id.split("-");
  
  imagen.classList.add("ocultar");
  await delay(100);   
  
  if(partesId[2] === "3"){
    imagen.id = "nro-imagen-2";
    imagen.src = "./images/imagen2.jpg";
  } else {
    imagen.id = "nro-imagen-1";
    imagen.src = "./images/imagen1.jpg";
  }
  
  imagen.classList.remove("ocultar");
  imagen.classList.add("mostrar");
  await delay(300);
  imagen.classList.remove("mostrar");
  actualizarEstado();
});

slide.imagen1.addEventListener('click', () => {
  imagen.id = "nro-imagen-1";
  imagen.src = "./images/imagen1.jpg";
  actualizarEstado();
});

slide.imagen2.addEventListener('click',() => {
  imagen.id = "nro-imagen-2";
  imagen.src = "./images/imagen2.jpg";
  actualizarEstado();
})

slide.imagen3.addEventListener('click', () => {
  imagen.id = "nro-imagen-3";
  imagen.src = "./images/imagen3.jpg";
  actualizarEstado();
})

verProductos.addEventListener('click', async() => {
  
  const nuevoContenido = generarContenidoProductos();
  
  contenedorImagenes.classList.add('ocultar-contenido-imagenes');
  await delay(200);
  mainContent.replaceChildren(nuevoContenido); 
  await delay(200);
  nuevoContenido.classList.add('mostrar-contenido-carrito');
   
});


botonLogeo.addEventListener('click', (e) => {
    e.preventDefault();
    const textoLabel = document.querySelectorAll('.texto-label')
    const inputs = document.querySelectorAll('.input-dato')
  
    if(!sesionIniciada){
        
          const bienvenidaUsuario = document.createElement('div');
          bienvenidaUsuario.className = 'bienvenida-usuario';
            
          const tituloBienvenido = document.createElement('h5');
          tituloBienvenido.className = 'titulo-usuario';
          tituloBienvenido.textContent = `Bienvenido ${String(logeo.nomUsuario.value)}`;  

          const usuarioValido = usuariosRegistrados.some(user =>
              user.nombreUsuario === logeo.nomUsuario.value &&
              user.password === logeo.pasUsuario.value
          );
          
          if (usuarioValido) {
      
            textoLabel.forEach(lab => lab.classList.add('oculto'))
            inputs.forEach(inp => inp.classList.add('ocult'))
          
            botonLogeo.textContent = 'Cerrar Sesion';
            formularioLogeo.append(tituloBienvenido); 
            sesionIniciada = true;
          } else { 
              alert("El usuario o contraseña son incorrectos");
          }
      
    } else {

          const tituloDeBienvenida = document.querySelector('.titulo-usuario')

          textoLabel.forEach(lab => lab.classList.remove('oculto'))
          inputs.forEach(inp => inp.classList.remove('ocult')) 
          sesionIniciada = false;
          botonLogeo.textContent = "Iniciar Sesion"
          tituloDeBienvenida.remove()
    }

} )
