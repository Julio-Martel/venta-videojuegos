export const generarContenidoProductos = () => {
    const contenidoProductoCarrito = document.createElement('div');
    
    const productos = {
        contedorProductos: document.createElement('div'),
        totalCasillasProductos: 4,
        listadoProductos: [
            {nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000},
            {nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000},
            {nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000},
            {nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000}
        ]
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