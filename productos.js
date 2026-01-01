export const generarContenidoProductos = () => {
    const contenidoProductoCarrito = document.createElement('div');
    
    const productos = {
        contedorProductos: document.createElement('div'),
        totalCasillasProductos: 4,
        listadoProductos: {
            
        }
    };
    
    const carrito = document.createElement('div');

    contenidoProductoCarrito.classList.add('carrito-producto');
    contenidoProductoCarrito.id = "car-prod";
   
    contenidoProductoCarrito.appendChild(productos.contedorProductos);
   
    contenidoProductoCarrito.appendChild(carrito);

    productos.contedorProductos.classList.add('contedor-productos')
    carrito.classList.add("contenedor-carrito");

    for(let i = 0; i < productos.totalCasillasProductos; i++){
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');
        casilla.id = `casilla-${i}`;

        productos.contedorProductos.appendChild(casilla);
    }

    return contenidoProductoCarrito;

}