import { generarContenidoProductos } from "./productos.js";
import { actualizarBotones } from "./bloquearBotones.js";

const mainContent = document.getElementById('main-content')
const imagen = document.getElementById("nro-imagen-1");
const verProductos = document.getElementById("boton-productos");
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonLogeo = document.getElementById('boton-log');
const formularioLogeo = document.getElementById('formulario-logeo');
let sesionIniciada = false;
let totalAgregadoAlCarrito = null;
let carrito = [];
let saldoDelUsuario = null;

const botonVerCarrito = document.getElementById('ver-carrito');


const listadoProductos = [
  {idVideojuego: 0, nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000, stock: 5},
  {idVideojuego: 1, nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000, stock: 8},
  {idVideojuego: 2, nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000, stock: 0},
  {idVideojuego: 3, nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000, stock: 2}
]

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const usuariosRegistrados = [
  { nombreUsuario: 'julio4561',password: '1234', saldo: 45, acumladorPrecio: 0},
  { nombreUsuario: 'marco123', password: '2312', saldo: 123714, acumladorPrecio: 0}
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
  let botonesMenos = [];
  let botonesMas = [];
  let maximosValores = [];
  let valorUsado = false;
  let maxVar;

  let i = 0;
  for(const display of todosLosDisplays){
    const botonMenos = document.getElementById(`boton-menos-${i}`);
    const botonMas = document.getElementById(`boton-mas-${i}`); 

    botonesMenos.push(botonMenos);
    botonesMas.push(botonMas);

    maximosValores.push(parseInt(display.value))

    const botonMenosClick = botonesMenos[i];
    const botonMasClick = botonesMas[i];

    let maximoValor = maximosValores[i];
    let stockActual = maximoValor;

    actualizarBotones(stockActual, maximoValor, botonMenosClick, botonMasClick);

    botonMenosClick.addEventListener('click', () => {
      

      if(valorUsado){
        maximoValor = maxVar;
      }

      let stockActualAUsar = parseInt(display.value);    
      if (stockActualAUsar > 1) {
        stockActualAUsar--;
        display.value = String(stockActualAUsar);
        actualizarBotones(stockActualAUsar, maximoValor, botonMenosClick, botonMasClick);
      }
    });

   botonMasClick.addEventListener('click', () => {

      let stockActualAUsar = parseInt(display.value);

      if(valorUsado){
        maximoValor = maxVar;
      }

      if (stockActualAUsar < maximoValor) {
        stockActualAUsar++;
        display.value = String(stockActualAUsar);
        actualizarBotones(stockActualAUsar, maximoValor, botonMenosClick, botonMasClick);
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
  
  const botonAgregarAlCarrito = document.querySelector('.boton-agregar-carrito');
  const botonFinalizarCompra = document.querySelector('.boton-final');

  let numImag = null;

  for(const imagen of todasLasImagenes){
    imagen.addEventListener('click', () => {
      const obtenerId = imagen.id;
      const separarString = obtenerId.split('-');
      numImag = parseInt(separarString[1]);
    });   
  }

  botonAgregarAlCarrito.addEventListener('click', () => {
     
        if(!sesionIniciada){
          //AGREGAR CONTENIDO HTML CON CSS PARA QUE SE MUESTRE EN LA PAGINA A LA HORA DE COMPRAR Y QUE NO SE HAYA INICIADO SESION
          console.log('Se debe iniciar sesion para poder agregar productos al carrito y comprar')
        
        } else {
          const obtenerIdDisplay = document.getElementById(`display-${numImag}`);
          const stockActual = parseInt(obtenerIdDisplay.value);
          
          totalAgregadoAlCarrito = stockActual * listadoProductos[numImag].precio;

        }
  })


  botonFinalizarCompra.addEventListener('click', () => {
         
      if(!sesionIniciada){
         console.log('Se debe iniciar sesion para poder agregar productos al carrito y comprar')
      } else {
          const obtenerIdDisplay = document.getElementById(`display-${numImag}`);
          const stockActual = parseInt(obtenerIdDisplay.value);
    
          if(totalAgregadoAlCarrito <= saldoDelUsuario){
            descontarStock(numImag,stockActual);

            obtenerIdDisplay.value =  String(listadoProductos[numImag].stock);

            maximosValores[numImag] = listadoProductos[numImag].stock;

            valorUsado = true;

            let stockActualizado = listadoProductos[numImag].stock

            maxVar = maximosValores[numImag];

            if(stockActualizado === 0){
                maxVar = 1;
            } else if(stockActualizado === 1){
                const valorCualquiera = 1.5;
                stockActualizado = valorCualquiera;
            }

            actualizarBotones(stockActualizado, maximosValores[numImag], botonesMenos[numImag], botonesMas[numImag]);             
          } else {
            //AGREGAR CONTENIDO HTML CON CSS PARA QUE SE MUESTRE EL CARTEL DE LOS SIN FONDOS PARA PODER COMPRAR
            console.log('Actualmente sin fondos o con menos')
          }
      }
  });

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
        
          /*AGREGAR LA LOGICA FALTANTE PARA EL BOTON DE VER EL CARRITO, POR CADA PRODUCTO Y SU CANTIDAD CORRESPONDIENTE, SE DEBERA IR AGREGANDO A UN ARRAY PARA QUE LUEGO CUANDO FINALICEMOS LA COMPRA
          PODAMOS VER EL LISTADO DE CADA PRODUCTO, JUNTO CON SUS ESPECIFICACIONES Y SU CANTIDAD Y EL TOTAL, SUMANDO TODOS LOS TOTALES CON EL CUAL DEBEMOS VERIFICAR EL TOTAL DE TODO LO AGREGADO AL CARRITO CON EL SALDO QUE EL USUARIO TENGA DISPONIBLE*/     

            if (usuarioValido) {
            
            const obtenerSaldoUsuario = () => {
              for(let i = 0; i < usuariosRegistrados.length; i++){
                if(logeo.nomUsuario.value === usuariosRegistrados[i].nombreUsuario){
                  return usuariosRegistrados[i].saldo;
                }
              }
            } 

            saldoUsuario.value  = String(obtenerSaldoUsuario());
            saldoDelUsuario = parseInt(saldoUsuario.value)
            formularioLogeo.appendChild(saldoUsuario);
            formularioLogeo.appendChild(botonVerCarrito)

            botonVerCarrito.style.display = "flex"

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
          botonVerCarrito.remove();
          formularioLogeo.style.flexDirection = "row";
    }

} )

botonVerCarrito.addEventListener('click',(e)=>{
  e.preventDefault();
  if(carrito.length === 0){
      console.log('Para ver el carrito debe agregar al menos un producto al mismo')
  }
});
