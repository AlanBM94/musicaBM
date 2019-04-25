import {elementos} from './base';

//Función para limpiar los lanzamientos
export const limpiarLanzamientos =  () => {
    elementos.lanzamientosContenedor.innerHTML = '';
}


//Función para obtener la ciudad de los lanzamientos

export const obtenerCiudad = () => elementos.inputLanzamiento.value;

// Función que muestra el spinner
export const spinner = () => {
    const markupSpinner = `
        <div class="spinner--azul spinner--azul--lanzamientos">
            <svg class="iformacion-general__icono">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></use>
            </svg>
        </div>
    `
    elementos.botonBuscarLanzamientos.insertAdjacentHTML('afterend', markupSpinner);
}

//Función que elimina el spinner
export const limpiarSpinner = () => {
    const loader = document.querySelector('.spinner--azul');
    if (loader) loader.parentElement.removeChild(loader);
    console.log(loader.parentElement);
};
    

export const mostrarLanzamiento = lanzamiento => {
    const markupLanzamiento = `
        <li class="lista-lanzamientos__item" id="${lanzamiento.id}">
            <div class="item-cancion">
                <svg class="item-cancion__icono">
                    <use xlink:href="img/symbol-defs.svg#icon-beamed-note"></use>
                </svg>
                <img src="${lanzamiento.images[0].url}" alt="${lanzamiento.name}" class="item-cancion__imagen">
                <a href="#" class="item-cancion__nombre">
                    <p>${lanzamiento.name}</p>
                </a>
                <p class="item-cancion__duracion">${lanzamiento.artists[0].name}</p>
            </div>
        </li> 
    `;
    elementos.lanzamientosContenedor.insertAdjacentHTML('beforeend', markupLanzamiento);
}