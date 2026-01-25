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

    carrito.id = "contenedor-carrito";

    const contenidoVideojuego = {
        contVideojuego: document.createElement('div'),
        tituloVideojuego: document.createElement('h3'),
        imagenVideojuego: document.createElement('img'),
        descripcionVideojuego: document.createElement('p'),
        precioVideojuego: document.createElement('input'),
        sotckVideojuego: document.createElement('input'),
        botonAgregarAlCarrito: document.createElement('button'),
        botonFinalizareCompra: document.createElement('button')
    }

    productos.contedorProductos.classList.add('contedor-productos');

    const contenidoDelProducto = document.createElement('div');
    contenidoDelProducto.id = "contenido-del-producto"


    carrito.classList.add("contenedor-carrito");
    
    carrito.appendChild(contenidoDelProducto);

    contenidoVideojuego.botonAgregarAlCarrito.textContent = "AGREGAR AL CARRITO";
    contenidoVideojuego.botonAgregarAlCarrito.className = "boton-agregar-carrito";
    contenidoVideojuego.botonFinalizareCompra.id = "boton-finalizar-compra";
    contenidoVideojuego.botonFinalizareCompra.textContent = "FINALIZAR COMPRA";
    contenidoVideojuego.botonFinalizareCompra.className = "boton-finalizar"

    for (let i = 0; i < productos.totalCasillasProductos; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'casilla-producto';
        casilla.id = `casilla-${i}`;

        const nombre = document.createElement('h3');
        nombre.className = 'nombre-producto';

        const imagen = document.createElement('img');
        imagen.className = 'imag-prod';

        const stock = document.createElement('div');
        stock.className = 'stock-producto';

        const agregarStock = {
            simboloMenos: document.createElement('img'),
            simboloMas: document.createElement('img'),
            displayStock: document.createElement('input')
        }

        agregarStock.simboloMenos.src = './images/botonMenos.png';
        agregarStock.simboloMas.src = './images/botonMas.png';

        agregarStock.simboloMenos.id = `boton-menos-${i}`;
        agregarStock.simboloMas.id = `boton-mas-${i}`;

        agregarStock.simboloMenos.className = "boton-stock";
        agregarStock.simboloMas.className = "boton-stock";

        agregarStock.displayStock.className = "display";
        agregarStock.displayStock.id = `display-${i}`;
        agregarStock.displayStock.readOnly  = true;

        agregarStock.displayStock.value = productos.listadoProductos[i].stock;

        stock.append(agregarStock.simboloMenos,agregarStock.displayStock,agregarStock.simboloMas);

        casilla.append(nombre, imagen, stock);
        productos.contedorProductos.appendChild(casilla);
    }

    const todasLasCasillas = productos.contedorProductos.querySelectorAll('.casilla-producto');
    const todasLasImagenes = productos.contedorProductos.querySelectorAll('.imag-prod')


    let i = 0;
    for (const casilla of todasLasCasillas) {
        const idCasilla = casilla.id;

        const nombreProducto = casilla.querySelector('h3');
        const imagenProducto = casilla.querySelector('img');

        if(idCasilla === `casilla-${i}`){
            switch(i){
                case 0:
                    nombreProducto.textContent = productos.listadoProductos[0].nombreVideojuego
                    imagenProducto.src = './images/portada1.jpg';
                    imagenProducto.id  = "imag-0";
                    break;
                    
                case 1:
                    nombreProducto.textContent = productos.listadoProductos[1].nombreVideojuego
                    imagenProducto.src = './images/portada2.jpg';
                    imagenProducto.id  = "imag-1";
                break;
                case 2:
                    nombreProducto.textContent = productos.listadoProductos[2].nombreVideojuego
                    imagenProducto.src = './images/portada3.jpg';
                    imagenProducto.id  = "imag-2";
                break;
                case 3:
                    nombreProducto.textContent = productos.listadoProductos[3].nombreVideojuego
                    imagenProducto.src = './images/portada4.jpg';
                    imagenProducto.id  = "imag-3";
                break;

            }
        }
        i++;
    }

    for(const imagen of todasLasImagenes){
        
        imagen.addEventListener('click',(e) => {
           if (e.target !== e.currentTarget) return;
            const obtenerId = imagen.id; 
            const separarString = obtenerId.split('-');
            const valorNumeroId = parseInt(separarString[1]);

           switch(valorNumeroId){
                case 0:
                    contenidoVideojuego.tituloVideojuego.textContent = "Resident Evil Requiem";
                    contenidoVideojuego.imagenVideojuego.src = './images/portada1.jpg';   
                    contenidoVideojuego.imagenVideojuego.className = 'img-prod';
                    contenidoVideojuego.tituloVideojuego.className = 'nombre-producto';
                    contenidoVideojuego.descripcionVideojuego.className = "descripcion";
                    contenidoVideojuego.descripcionVideojuego.textContent = "Una nueva era del survival horror llega con Resident Evil Requiem, el capítulo más reciente e inmersivo hasta ahora de la icónica serie Resident Evil. Vive el terror del survival horror con la analista del FBI Grace Ashcroft y sumérgete en acción trepidante con el legendario agente Leon S. Kennedy. Sus dos caminos y estilos singulares de juego se entrelazan en una experiencia electrizante que te helará la sangre."          
                    break;

                case 1:
                    contenidoVideojuego.tituloVideojuego.textContent = "Silent Hill F";
                    contenidoVideojuego.imagenVideojuego.src = './images/portada2.jpg';   
                    contenidoVideojuego.imagenVideojuego.className = 'img-prod';
                    contenidoVideojuego.tituloVideojuego.className = 'nombre-producto';
                    contenidoVideojuego.descripcionVideojuego.className = "descripcion";
                    contenidoVideojuego.descripcionVideojuego.textContent = "La ciudad natal de Hinako está sumida en la niebla, lo que la obliga a luchar contra monstruos grotescos y a resolver rompecabezas espeluznantes. Descubre la belleza del terror en este thriller psicológico."

                break;

                case 2:
                    contenidoVideojuego.tituloVideojuego.textContent = "Battlefield 6";
                    contenidoVideojuego.imagenVideojuego.src = './images/portada3.jpg';   
                    contenidoVideojuego.imagenVideojuego.className = 'img-prod';
                    contenidoVideojuego.tituloVideojuego.className = 'nombre-producto';
                    contenidoVideojuego.descripcionVideojuego.className = "descripcion";
                    contenidoVideojuego.descripcionVideojuego.textContent = "La experiencia bélica definitiva. En una guerra de tanques, cazas y gigantescos arsenales de combate, el arma más mortífera es tu patrulla."                

                    break;

                case 3:
                    contenidoVideojuego.tituloVideojuego.textContent = "Resident Evil 4";
                    contenidoVideojuego.imagenVideojuego.src = './images/portada4.jpg';   
                    contenidoVideojuego.imagenVideojuego.className = 'img-prod';
                    contenidoVideojuego.tituloVideojuego.className = 'nombre-producto';
                    contenidoVideojuego.descripcionVideojuego.className = "descripcion";
                    contenidoVideojuego.descripcionVideojuego.textContent = "La historia de Resident Evil 4 sigue a Leon S. Kennedy, seis años después de Raccoon City, mientras es enviado a una remota zona rural de España para rescatar a Ashley Graham, la hija secuestrada del presidente de EE.UU. Allí, descubre una secta misteriosa, los Ganados, aldeanos controlados por parásitos llamados Las Plagas, que atacan violentamente a extraños, llevando a Leon a una lucha por la supervivencia y el rescate de Ashley en un entorno de terror y acción."

                    break;

           }

           contenidoDelProducto.append(contenidoVideojuego.tituloVideojuego,contenidoVideojuego.imagenVideojuego,contenidoVideojuego.descripcionVideojuego)

        })    

        carrito.append(contenidoVideojuego.botonAgregarAlCarrito, contenidoVideojuego.botonFinalizareCompra)
       

    }

    return contenidoProductoCarrito;

}