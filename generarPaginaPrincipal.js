export const volverACrearPaginaInicial = () => {
    const contenidoMainContent = `
               <label for="usuario" class="texto-label" id="label-usuario">Usuario:</label>
            <input type="text" id="usuario">
            <label for="contraseña" class="texto-label" id="label-contraseña">contraseña:</label>
            <input type="password" id="contraseña">
            <button class="boton" id="boton-log">Iniciar Sesion</button>
    `;

    return contenidoMainContent;

}