export const listaDeProductosAgregadosAlCarrito = () => {
    const contenedorMostrarListado = document.createElement('div');
    const contenedoresListadoPagar = {
        lista: document.createElement('div'),
        mostrarPrecioBotonPagar: document.createElement('div'),
        mostrarPrecio: document.createElement('div'),
        botonPagar: document.createElement('button'),
        botonQuitarProducto: document.createElement('button')
    }

    contenedorMostrarListado.className = 'listado-productos';
    
    contenedoresListadoPagar.lista.className = "lista";
    contenedoresListadoPagar.mostrarPrecioBotonPagar.className = "contenedor-precio-boton";
    contenedoresListadoPagar.botonQuitarProducto.className = "boton-quitar-producto";



    contenedorMostrarListado.append(contenedoresListadoPagar.lista, contenedoresListadoPagar.mostrarPrecioBotonPagar);

    contenedoresListadoPagar.mostrarPrecio.className = "contenedor-precio";
    contenedoresListadoPagar.botonPagar.className = "boton-de-pagar";
    contenedoresListadoPagar.botonPagar.id = "pagar-btn"

    contenedoresListadoPagar.botonPagar.textContent = "Realizar pago!"
    contenedoresListadoPagar.botonQuitarProducto.textContent = "Quitar producto del carrito"

    contenedoresListadoPagar.mostrarPrecioBotonPagar.append(contenedoresListadoPagar.mostrarPrecio, contenedoresListadoPagar.botonQuitarProducto,contenedoresListadoPagar.botonPagar);

    return contenedorMostrarListado;

}