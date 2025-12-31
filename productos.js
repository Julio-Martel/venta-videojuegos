export const generarContenidoProductos = () => {
    const contenidoProductoCarrito = document.createElement('div');
    const contedorProductos = document.createElement('div');
    const carrito = document.createElement('div');

    contenidoProductoCarrito.classList.add('carrito-producto');
    contenidoProductoCarrito.id = "car-prod";
    contenidoProductoCarrito.appendChild(contedorProductos);
    contenidoProductoCarrito.appendChild(carrito);

    contedorProductos.classList.add('contedor-productos')
    carrito.classList.add("contenedor-carrito");

    return contenidoProductoCarrito;

}