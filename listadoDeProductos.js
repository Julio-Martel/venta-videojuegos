export const listaDeProductosAgregadosAlCarrito = () => {
    const contenedorMostrarListado = document.createElement('div');
    const contenedoresListadoPagar = {
        lista: document.createElement('div'),
        mostrarPrecioBotonPagar: document.createElement('div')
    }

    contenedorMostrarListado.className = 'listado-productos';
    
    contenedoresListadoPagar.lista.className = "lista";
    contenedoresListadoPagar.mostrarPrecioBotonPagar.className = "contenedor-precio-boton";




    return contenedorMostrarListado;


}