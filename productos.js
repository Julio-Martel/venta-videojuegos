export const generarContenidoProductos = () => {
    const contenidoProductoCarrito = document.createElement('div');
    
    const productos = {
        contedorProductos: document.createElement('div'),
        totalCasillasProductos: 4,
        listadoProductos: [
            {nombreVideojuego: 'Resident Evil Requiem', descripcion: '', precio: 53000, stock: 5},
            {nombreVideojuego: 'Silent Hill F', descripcion: '', precio: 45000, stock: 8},
            {nombreVideojuego: 'Battelfield 6', descripcion: '', precio: 50000, stock: 0},
            {nombreVideojuego: 'Resident Evil 4', descripcion:'', precio: 25000, stock: 2}
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
        const elementosCasilla = {
            nombreProducto: document.createElement('h1'),
            imagenProducto: document.createAttribute('img'),
            stock: document.createAttribute('div')
        }
        
        casilla.classList.add('casilla');
        casilla.id = `casilla-${i}`;

        elementosCasilla.nombreProducto.classList.add('nombre-producto');
        elementosCasilla.imagenProducto.classList.add('imag-prod');
        elementosCasilla.stock.classList.add('stock-producto');
        
        casilla.appendChild(elementosCasilla.nombreProducto);
        casilla.appendChild(elementosCasilla.imagenProducto);
        casilla.appendChild(elementosCasilla.stock);
    
        productos.contedorProductos.appendChild(casilla);
    }


/*
    CAMBIAR LA FORMA DEL FOR PARA PODER IDENTIFICAR AL OBJETO PARA PODER COLOCAR SUS CARACTERISTICAS
*/

    return contenidoProductoCarrito;

}