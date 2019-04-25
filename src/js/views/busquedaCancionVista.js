import {elementos} from './base';

//Consigue el valor del input de la canción
export const inputsCancion = () => {
    const busquedaCancion = {
        'artista': elementos.inputArtista.value,
        'cancion': elementos.inputCancion.value
    }
    return busquedaCancion;
}


//Limpia el contenedor de la canción
export const limpiarCancion = () => {
    elementos.contenedorLetra.innerHTML = '';
}

//Limpia el contenedor del analisis
export const limpiarAnalisis = () => {
    elementos.contenedorAnalisis.innerHTML = '';
}



//Limpia los inputs de la cancion
export const limpiarInputsCancion = () => {
    elementos.inputArtista.value = '';
    elementos.inputCancion.value = '';
}

//Muestra el spinner de la canción buscada
export const spinner = () => {
    const markupSpinner = `
        <div class="spinner--azul spinner--blanco spinner--azul--lanzamientos">
            <svg class="iformacion-general__icono">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></use>
            </svg>
        </div>
    `
    elementos.botonCancionBlanco.insertAdjacentHTML('afterend', markupSpinner);
}

//Elimina el spinner de la canción buscada
export const limpiarSpinner = () => {
    const loader = document.querySelector('.spinner--blanco');
    if (loader) loader.parentElement.removeChild(loader);
};

//Muestra la canción en el DOM
export const mostrarCancion = cancion => {
    const markupCancion = `<p>${cancion}</p>`;
    elementos.contenedorLetra.insertAdjacentHTML('beforeend', markupCancion);
}


const duracion = tiempo => (tiempo / 60000).toFixed(2);

// Muestra el analisis de la canción en el DOM
export const mostrarAnalisis = analisis => {
    const markupAnalisis = `
        <div class="contenedor-analisis">
            <h4 class="contenedor-analisis__titulo">Analisis de Canción</h4>
            <ul class="contenedor-analisis-lista">
                <li class="contenedor-analisis-lista__item">Acustica: <span>${analisis.acousticness}</span></li>
                <li class="contenedor-analisis-lista__item">Bailabilidad: <span>${analisis.danceability}</span></li>
                <li class="contenedor-analisis-lista__item">Duración: <span>${duracion(analisis.duration_ms)} minutos</span></li>
                <li class="contenedor-analisis-lista__item">Energía: <span>${analisis.energy}</span></li>
                <li class="contenedor-analisis-lista__item">Instrumentalidad: <span>${analisis.instrumentalness}</span></li>
                <li class="contenedor-analisis-lista__item">Volumen: <span>${analisis.instrumentalness}</span></li>
                <li class="contenedor-analisis-lista__item">Tempo: <span>${analisis.tempo}</span></li>
            </ul>
        </div>
    `;
    elementos.contenedorAnalisis.insertAdjacentHTML('beforeend', markupAnalisis);
}



