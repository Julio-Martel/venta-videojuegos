import { generarContenidoProductos } from "./productos.js";
import { actualizarBotones } from "./bloquearBotones.js";

const mainContent = document.getElementById('main-content')
const imagen = document.getElementById("nro-imagen-1");
const verProductos = document.getElementById("boton-productos");
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonLogeo = document.getElementById('boton-log');
const formularioLogeo = document.getElementById('formulario-logeo');
let sesionIniciada = false;
let primerProductoAgregado = false

const listadoProductos = [
  {idVideojuego: 0, nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000, stock: 5},
  {idVideojuego: 1, nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000, stock: 8},
  {idVideojuego: 2, nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000, stock: 0},
  {idVideojuego: 3, nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000, stock: 2}
]

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const usuariosRegistrados = [
  { nombreUsuario: 'julio4561',password: '1234', saldo: 45611, acumladorPrecio: 0},
  { nombreUsuario: 'marco123', password: '2312', saldo: 12374, acumladorPrecio: 0}
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
  imagen.classList.add("mostrar");
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
  
  const nuevoContenido = generarContenidoProductos()

  contenedorImagenes.classList.add('ocultar-contenido-imagenes');
  await delay(200);
  mainContent.replaceChildren(nuevoContenido); 
  await delay(200);
  nuevoContenido.classList.add('mostrar-contenido-carrito');
   
  const todosLosDisplays = document.querySelectorAll('.display');
  const todasLasImagenes = document.querySelectorAll('.imag-prod');


  let i = 0;
  for(const display of todosLosDisplays){
    const botonMenos = document.getElementById(`boton-menos-${i}`);
    const botonMas = document.getElementById(`boton-mas-${i}`); 
    let maximoValor = parseInt(display.value);
    let stockActual = maximoValor
      

    actualizarBotones(stockActual, maximoValor, botonMenos, botonMas);
/*  agregar la logica aqui de los botones*/

    botonMenos.addEventListener('click', () => {
      let stockActualAUsar = parseInt(display.value);
      
      if (stockActualAUsar > 1) {
        stockActualAUsar--;
        display.value = String(stockActualAUsar);
        actualizarBotones(stockActualAUsar, maximoValor, botonMenos, botonMas);
      }
    });

    botonMas.addEventListener('click', () => {
      let stockActualAUsar = parseInt(display.value);
      if (stockActualAUsar < maximoValor) {
        stockActualAUsar++;
        display.value = String(stockActualAUsar);
        actualizarBotones(stockActualAUsar, maximoValor, botonMenos, botonMas);
      }
    });


    i++;
  }


  const descontarStock = (indice,cantidad) => {
    for(let i = 0; i < listadoProductos.length; i++){
      if(indice === listadoProductos[i].idVideojuego){
        if(cantidad <= listadoProductos[i].stock ){
          listadoProductos[i].stock = listadoProductos[i].stock - cantidad;
          break;
        }
      }
    }
  }
  
  for(const imagen of todasLasImagenes){
    const obtenerId = imagen.id;
    const separarString = obtenerId.split('-');
    const valorNumericoImagen = parseInt(separarString[1]);
  
    imagen.addEventListener('click', () => {
     
      const botonAgregarAlCarrito = document.getElementById('boton-agregar-carrito');
      
      botonAgregarAlCarrito.addEventListener('click', () => {
     
        if(!sesionIniciada){
          console.log('Se debe iniciar sesion para poder agregar productos al carrito y comprar')
        } else {
          const obtenerIdDisplay = document.getElementById(`display-${valorNumericoImagen}`);
          const stockActual = parseInt(obtenerIdDisplay.value);

          descontarStock(valorNumericoImagen,stockActual);

          obtenerIdDisplay.value =  String(listadoProductos[valorNumericoImagen].stock);

         // actualizarBotones(stockActual, stockActual, botonDecrementar, botonIncrementar);



          
          console.log(obtenerIdDisplay.value)


          /*AGREGAR LA LOGICA DE COMO SERIA PARA QUE CUANDO SE ACTUALIZEN LOS STOCKS TRAS AGREGAR AL CARRITO */



        }
      })
    
    });
  
  
  }



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

          const saldoUsuario = document.createElement('input');
          saldoUsuario.className = "saldo";

          const usuarioValido = usuariosRegistrados.some(user =>
              user.nombreUsuario === logeo.nomUsuario.value &&
              user.password === logeo.pasUsuario.value
            );
          
            if (usuarioValido) {
            
            const obtenerSaldoUsuario = () => {
              for(let i = 0; i < usuariosRegistrados.length; i++){
                if(logeo.nomUsuario.value === usuariosRegistrados[i].nombreUsuario){
                  return usuariosRegistrados[i].saldo;
                }
              }
            } 

            saldoUsuario.value  = String(obtenerSaldoUsuario());
            formularioLogeo.appendChild(saldoUsuario);

            textoLabel.forEach(lab => lab.classList.add('oculto'))
            inputs.forEach(inp => inp.classList.add('ocult'))
        
            botonLogeo.textContent = 'Cerrar Sesion';
            formularioLogeo.append(tituloBienvenido); 

            formularioLogeo.style.flexDirection = 'row-reverse';

            sesionIniciada = true;
          } else { 
              alert("El usuario o contraseña son incorrectos");
          }
      
    } else {

          const tituloDeBienvenida = document.querySelector('.titulo-usuario')
          const saldoUsuairo = document.querySelector('.saldo');

          textoLabel.forEach(lab => lab.classList.remove('oculto'))
          inputs.forEach(inp => inp.classList.remove('ocult')) 
          sesionIniciada = false;
          botonLogeo.textContent = "Iniciar Sesion"
          tituloDeBienvenida.remove()
          saldoUsuairo.remove();
          formularioLogeo.style.flexDirection = "row";
    }

} )

