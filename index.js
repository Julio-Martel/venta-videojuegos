import { generarContenidoProductos } from "./productos.js";

const mainContent = document.getElementById('main-content')
const imagen = document.getElementById("nro-imagen-1");
const verProductos = document.getElementById("boton-productos");
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonLogeo = document.getElementById('boton-log');
const formularioLogeo = document.getElementById('formulario-logeo');
let primerValorStockAgregadoAlCarrito = true;
let sesionIniciada = false;


     const listadoProductos = [
        {nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000, stock: 5},
        {nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000, stock: 8},
        {nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000, stock: 0},
        {nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000, stock: 2}
      ]

const delay = (ms) => new Promise(r => setTimeout(r, ms));

let totalAcumulado = 0;
let totalFinal = 0;
let totalAcumuladoBotones = 0;

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
    const valorDisplay = display.value;
    const strNum = parseInt(valorDisplay);
    let stockActual = strNum;

    if(stockActual === strNum && stockActual !== 0){
      botonMas.style.opacity = "0.5";
      botonMas.style.pointerEvents = "none";
    } else if(stockActual === 1) {
      botonMenos.style.opacity = "0.5";
      botonMenos.style.pointerEvents = "none";
    } else {
      botonMenos.style.opacity = "0.5";
      botonMenos.style.pointerEvents = "none";
      botonMas.style.opacity = "0.5";
      botonMas.style.pointerEvents = "none";    
    }

    botonMenos.addEventListener('click', () => {
   
      if(stockActual >= 1 && stockActual <= strNum){
        totalAcumuladoBotones = stockActual;
        stockActual--; 
        const numStr = String(stockActual);
        display.value = numStr;
          totalAcumuladoBotones = stockActual;   
          console.log(typeof totalAcumuladoBotones) 
        if(stockActual === 1){
          botonMenos.style.opacity = "0.5";
          botonMenos.style.pointerEvents = "none";    
          botonMas.style.pointerEvents = "auto";
          botonMas.style.opacity = "1";  
          totalAcumuladoBotones = stockActual;
        } else {
          botonMas.style.pointerEvents = "auto";
          botonMas.style.opacity = "1";
        }      
        
        primerValorStockAgregadoAlCarrito = false;
      } 
    })

   botonMas.addEventListener('click', () => {

      if(stockActual  >= 1 && stockActual <= strNum){
       totalAcumuladoBotones = stockActual;
        stockActual++;
        const numStr = String(stockActual);
        display.value = numStr;
          totalAcumuladoBotones = stockActual;   
          console.log(typeof totalAcumuladoBotones)       
        if(stockActual === strNum){
          botonMas.style.opacity = "0.5";
          botonMas.style.pointerEvents = "none";
          botonMenos.style.opacity = "1";
          botonMenos.style.pointerEvents = "auto";   

        } else {
          botonMenos.style.pointerEvents = "auto";
          botonMenos.style.opacity = "1"
        }
       primerValorStockAgregadoAlCarrito = false;
      } 
    
    })

    i++;
  }

  let j = 0;
  for(const imagen of todasLasImagenes){
    const obtenerId = imagen.id;
    const imagenId = document.getElementById(obtenerId);(j)
    const obtenerIdDisplay = document.getElementById(`display-${j}`);
    const valorDelDisplay = obtenerIdDisplay.value;
    const strToNumber = parseInt(valorDelDisplay);

    imagenId.addEventListener('click', () => {
      const botonAgregarAlCarrito = document.getElementById('boton-agregar-carrito');
      
      botonAgregarAlCarrito.addEventListener('click', () => {
        if(!sesionIniciada){  
          console.log('Deberas iniciar Sesion para comprar')}
        else {

            if(primerValorStockAgregadoAlCarrito){
              totalAcumulado = strToNumber;
              totalFinal = totalFinal + totalAcumulado;
            } else {
              totalFinal = totalFinal + totalAcumuladoBotones;
            }
        }
      })

    })
    j++;
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

