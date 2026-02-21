import { generarContenidoProductos } from "./productos.js";
import { actualizarBotones } from "./bloquearBotones.js";
import { listaDeProductosAgregadosAlCarrito } from "./listadoDeProductos.js";

const mainContent = document.getElementById('main-content')
const imagen = document.getElementById("nro-imagen-1");
const verProductos = document.getElementById("boton-productos");
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonLogeo = document.getElementById('boton-log');
const formularioLogeo = document.getElementById('formulario-logeo');
let sesionIniciada = false;
let carrito = [];
let productosAQuitar = [];
let productosQuitarClick = [];
let saldoDelUsuario = null;
let usuarioRegistrado = null;
let totalAgregadoAlCarrito = null;
const tituloPagina = document.getElementById('titulo-pagina');
const botonVerCarrito = document.getElementById('ver-carrito');


botonVerCarrito.style.opacity = "0.5";
botonVerCarrito.style.pointerEvents = "none";

const listadoProductos = [
  {idVideojuego: 0, nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000, stock: 5},
  {idVideojuego: 1, nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000, stock: 8},
  {idVideojuego: 2, nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000, stock: 0},
  {idVideojuego: 3, nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000, stock: 2}
]

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const usuariosRegistrados = [
  { nombreUsuario: 'julio4561',password: '1234', saldo: 454451, acumladorPrecio: 0},
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

  const todosLosDisplaysFijos = nuevoContenido.querySelectorAll('.display');

  let j = 0;
  for(const display of todosLosDisplaysFijos){
    display.value = String(listadoProductos[j].stock);
    j++;
  }
  
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

    if(maximoValor === 1) {
      botonMenosClick.style.opacity = "0.5";
      botonMenosClick.style.pointerEvents = "none";
      botonMasClick.style.opacity = "0.5";
      botonMasClick.style.pointerEvents = "none";
    } else {
          actualizarBotones(stockActual, maximoValor, botonMenosClick, botonMasClick);
    }



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

let posicionEnCarrito = null;

const comprobarProductoEnCarrito = (videojuego) => {
  posicionEnCarrito = null;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].productoSeleccionado === videojuego) {
      posicionEnCarrito = i;
      return true;
    }
  }

  return false;
};

  const botonAgregarAlCarrito = document.querySelector('.boton-agregar-carrito');

  const textoContenido = document.querySelector('.texto-contenido');
        
  let numImag = null;

  for(const imagen of todasLasImagenes){
    imagen.addEventListener('click', () => {
       textoContenido.remove()
      const obtenerId = imagen.id;
      const separarString = obtenerId.split('-');
      numImag = parseInt(separarString[1]);
    });   
  }

  botonAgregarAlCarrito.addEventListener('click', () => {
     
        const productoDelCarrito = {
          productoSeleccionado: null,
          cantidadSeleccionada: null,
          precioTotal: null
        };

        if(!sesionIniciada){
          console.log('Se debe iniciar sesion para poder agregar productos al carrito y comprar')
        
        } else {

          if(numImag === null){
            console.log('Debes hacer click en alguna imagen para empezar a agregar al carrito')
          } else {
            const obtenerIdDisplay = document.getElementById(`display-${numImag}`);
            let stockActual = parseInt(obtenerIdDisplay.value);

            if(stockActual === 0){
              console.log('No hay stock disponible para agregar al carrito')
            } 

             totalAgregadoAlCarrito = stockActual * listadoProductos[numImag].precio;

            if(carrito.length === 0){

              botonVerCarrito.style.opacity = "1";
              botonVerCarrito.style.pointerEvents = "auto";
              productoDelCarrito.productoSeleccionado = listadoProductos[numImag];
              productoDelCarrito.cantidadSeleccionada = stockActual;
              productoDelCarrito.precioTotal = totalAgregadoAlCarrito;


              productosAQuitar.push(numImag);
              carrito.push(productoDelCarrito);
              
              posicionEnCarrito = null;

            } else {     

              const enElCarrito = comprobarProductoEnCarrito(listadoProductos[numImag]);

              if(enElCarrito){
                carrito[posicionEnCarrito].cantidadSeleccionada = stockActual;
                carrito[posicionEnCarrito].precioTotal = totalAgregadoAlCarrito;
              } else {
         
                productoDelCarrito.productoSeleccionado = listadoProductos[numImag];  
                productoDelCarrito.cantidadSeleccionada = stockActual;
                productoDelCarrito.precioTotal = totalAgregadoAlCarrito;           
              
                
                carrito.push(productoDelCarrito)
                productosAQuitar.push(numImag);
              }         
            }
           
          }
        }
  })
});

  botonLogeo.addEventListener('click', (e) => {
      e.preventDefault();
      const textoLabel = document.querySelectorAll('.texto-label')
      const inputs = document.querySelectorAll('.input-dato')
    
      if(!sesionIniciada){
          
            
            const bienvenidaUsuario = document.createElement('div');
            const textoSaldoUsuario = document.createElement('h5')
            
            bienvenidaUsuario.className = 'bienvenida-usuario';
            
            const tituloBienvenido = document.createElement('h5');
            const nomUsuarioMostrar = document.createElement('span');

            tituloBienvenido.innerHTML = `<h5> Bienvenido </h5>`;
            tituloBienvenido.className = 'titulo-usuario';

            nomUsuarioMostrar.className = "titulo-nombre-usuario";
            nomUsuarioMostrar.textContent = `| ${logeo.nomUsuario.value} |`;

            tituloBienvenido.appendChild(nomUsuarioMostrar);

            const saldoUsuario = document.createElement('input');
            saldoUsuario.className = "saldo";
            saldoUsuario.id = "saldo-del-usuario";

            textoSaldoUsuario.className = "titulo-saldo"
            textoSaldoUsuario.textContent = "Su saldo es de: $"

            const usuarioValido = usuariosRegistrados.some(user =>
                user.nombreUsuario === logeo.nomUsuario.value &&
                user.password === logeo.pasUsuario.value
              );

              if (usuarioValido) {  
              const obtenerSaldoUsuario = () => {
                for(let i = 0; i < usuariosRegistrados.length; i++){
                  if(logeo.nomUsuario.value === usuariosRegistrados[i].nombreUsuario){
                    usuarioRegistrado = usuariosRegistrados[i];
                    return usuariosRegistrados[i].saldo;
                  }
                }
              } 

              saldoUsuario.value  = String(obtenerSaldoUsuario());
                          
              saldoDelUsuario = parseInt(saldoUsuario.value)
              
              formularioLogeo.appendChild(botonVerCarrito);
              formularioLogeo.appendChild(saldoUsuario);
             
              formularioLogeo.appendChild(textoSaldoUsuario);
              

              botonVerCarrito.style.display = "flex";


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
            const tituloSaldo = document.querySelector('.titulo-saldo');

            textoLabel.forEach(lab => lab.classList.remove('oculto'))
            inputs.forEach(inp => inp.classList.remove('ocult')) 
            sesionIniciada = false;
            botonLogeo.textContent = "Iniciar Sesion"
            tituloDeBienvenida.remove()
            saldoUsuairo.remove();
            botonVerCarrito.remove();
            tituloSaldo.remove();

            formularioLogeo.style.flexDirection = "row";

            botonVerCarrito.style.opacity = "0.5";
            botonVerCarrito.style.pointerEvents = "none"
      

      
          }

  } )

  botonVerCarrito.addEventListener('click',(e)=>{
    e.preventDefault();
    if(carrito.length === 0){
        console.log('Para ver el carrito debe agregar al menos un producto al mismo')
    } else {

      mainContent.replaceChildren(listaDeProductosAgregadosAlCarrito());
      
      const lista = document.querySelector('.lista');
      const contenedorPrecio = document.querySelector('.contenedor-precio');
      const elementoPrecio = document.createElement('h1')
      const botonDePagar = document.getElementById('pagar-btn');

      let totalParaPagar = 0
      carrito.forEach(producto => {
        const elementoDelListado = document.createElement('div');
        const contenidoInfo = document.createElement('div');
        const textoInfo = document.createElement('p');
        const imagenDelProducto = document.createElement('img');

        elementoDelListado.className = "elemento-lista";
        elementoPrecio.classList = "estilo-precio";

        textoInfo.className = "texto-info";
        contenidoInfo.className = "contenido-info";
        imagenDelProducto.className = "imagen-prod"

        switch(producto.productoSeleccionado.idVideojuego){
          case 0:
            imagenDelProducto.src = './images/portada1.jpg';
            textoInfo.textContent = `
              Videojuego: ${producto.productoSeleccionado.nombreVideojuego}.
              Cantidad seleccionada: ${producto.cantidadSeleccionada}.
              Importe total: ${producto.precioTotal}.
            `;
          break;

          case 1:
            imagenDelProducto.src = './images/portada2.jpg';
            textoInfo.textContent = `
              Videojuego: ${producto.productoSeleccionado.nombreVideojuego}.
              Cantidad seleccionada: ${producto.cantidadSeleccionada}.
              Importe total: ${producto.precioTotal}.
            `;
            break;


          case 2:
            imagenDelProducto.src = './images/portada3.jpg';
            textoInfo.textContent = `
              Videojuego: ${producto.productoSeleccionado.nombreVideojuego}.
              Cantidad seleccionada: ${producto.cantidadSeleccionada}.
              Importe total: ${producto.precioTotal}.
            `;         
            break;

          case 3:
            imagenDelProducto.src = './images/portada4.jpg';
            textoInfo.textContent = `
              Videojuego: ${producto.productoSeleccionado.nombreVideojuego}.
              Cantidad seleccionada: ${producto.cantidadSeleccionada}.
              Importe total: ${producto.precioTotal}.
            `;          
          break;

        }

        totalParaPagar = totalParaPagar + producto.precioTotal

        contenidoInfo.appendChild(textoInfo);
        
        elementoDelListado.append(imagenDelProducto,contenidoInfo);

        lista.appendChild(elementoDelListado);
        

        elementoPrecio.textContent = `Total a pagar: 
        $${totalParaPagar}`;

        contenedorPrecio.appendChild(elementoPrecio)
      });    

      const botonQuitarProducto = document.querySelector('.boton-quitar-producto');
      const todosLosElementosLista = document.querySelectorAll('.elemento-lista');

      let aEliminar = false;
      let elimProd = null;

      let k = 0;
      for(const elemLista of todosLosElementosLista){
       elemLista.id = `elem-${productosAQuitar[k]}`;
       const textElem = elemLista.id.split('-');
        const nroElem = parseInt(textElem[1]); 
        elimProd = nroElem;

        elemLista.addEventListener('mouseover', () => {
          elemLista.style.cursor = "pointer";
        })

        elemLista.addEventListener('click', () => {
          if(!aEliminar) {
            elemLista.style.opacity = "0.8";
            aEliminar = true;
            productosQuitarClick.push(elemLista);
          } else {
            elemLista.style.opacity = "1";
            aEliminar = false;
          }        
        })
      
        k++;
      }

      botonQuitarProducto.addEventListener('click', () => {
        if(productosAQuitar.length === 0){
       
          console.log('No se han agregado productos a la lista de eliminar productos');
       
        } else {

          productosQuitarClick.forEach(producto => {
          const nroElemento = producto.id;
          const parteNroId = nroElemento.split('-');
          const numberString = parseInt(parteNroId[1]);
          
          for(let i =  0; i < carrito.length; i++){
            if(carrito[i].productoSeleccionado.idVideojuego === numberString){
              carrito.splice(i,1);
            }
          }

          producto.remove()
    
        })
        
          const textoCartelPrecio = document.querySelector('.estilo-precio');

          let total = 0;
          carrito.forEach(producto => {
            total = total + producto.precioTotal;
          })
            
          let totalPrecioTexto = String(total);

          if(carrito.length === 0){
            textoCartelPrecio.textContent = `El carrito esta vacio`;
          } else {
            textoCartelPrecio.textContent = `Total a pagar: 
            $${totalPrecioTexto}`;
          }

        }

      })

      botonDePagar.addEventListener('mouseover', () => {
        botonDePagar.style.cursor = "pointer";
      })

      botonDePagar.addEventListener('click', async() => {
        const inputSaldoUsuario = document.getElementById('saldo-del-usuario');

        if(carrito.length === 0){
          console.log('Para poder comprar necesitar ir a la pagina principal y comprar agregar productos al carrito');
        }else if(totalParaPagar > saldoDelUsuario){
          botonDePagar.style.backgroundColor = "darkred";
          botonDePagar.textContent = "Saldo insuficiente"
          botonDePagar.style.pointerEvents = "none";
        } else {
          botonDePagar.style.backgroundColor = "green";
          botonDePagar.textContent = "Pago realizado con exito!"          
          botonDePagar.style.pointerEvents = "none";

          usuarioRegistrado.saldo = usuarioRegistrado.saldo - totalParaPagar;
          inputSaldoUsuario.value = String(usuarioRegistrado.saldo);

          for(let i = 0; i < carrito.length; i++){
            const idDelVidejuego = carrito[i].productoSeleccionado.idVideojuego;
            const cantidadComprada = carrito[i].cantidadSeleccionada;

            listadoProductos[idDelVidejuego].stock =  listadoProductos[idDelVidejuego].stock - cantidadComprada;
          }
          
          for(const elemLista of todosLosElementosLista){
            elemLista.style.pointerEvents = "none";
          }

          carrito = [];
          
          await delay(500);
          mainContent.replaceChildren(contenedorImagenes);
          await delay(100);
          contenedorImagenes.classList.remove('ocultar-contenido-imagenes');
        }
      })

    }
  });

  tituloPagina.addEventListener('click',async() => {
    mainContent.replaceChildren(contenedorImagenes);
    await delay(200);
    contenedorImagenes.classList.remove('ocultar-contenido-imagenes');
  })