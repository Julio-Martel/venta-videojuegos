export const listaDeProductosAgregadosAlCarrito = () => {
    const contenedorMostrarListado = document.createElement('div');
    const contenedoresListadoPagar = {
        lista: document.createElement('div'),
        mostrarPrecioBotonPagar: document.createElement('div'),
        mostrarPrecio: document.createElement('div'),
        botonPagar: document.createElement('button')
    }

    contenedorMostrarListado.className = 'listado-productos';
    
    contenedoresListadoPagar.lista.className = "lista";
    contenedoresListadoPagar.mostrarPrecioBotonPagar.className = "contenedor-precio-boton";

    contenedorMostrarListado.append(contenedoresListadoPagar.lista, contenedoresListadoPagar.mostrarPrecioBotonPagar);


    return contenedorMostrarListado;

}