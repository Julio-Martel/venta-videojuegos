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
    
    for (let i = 0; i < productos.totalCasillasProductos; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'casilla';
        casilla.id = `casilla-${i}`;

        const nombre = document.createElement('h3');
        nombre.className = 'nombre-producto';

        const imagen = document.createElement('img');
        imagen.className = 'imag-prod';

        const stock = document.createElement('div');
        stock.className = 'stock-producto';

        casilla.append(nombre, imagen, stock);
        productos.contedorProductos.appendChild(casilla);
    }

    const todasLasCasillas = document.querySelectorAll('casilla');

    for(casilla of todasLasCasillas){
        
    }

    return contenidoProductoCarrito;

}