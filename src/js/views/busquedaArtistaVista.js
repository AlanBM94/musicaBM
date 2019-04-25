import {elementos} from './base';

//Conseguir valor input artista
export const conseguirVIA = () => elementos.busquedaInputArtista.value; 

// Función que limpia el input de la busqueda
export const limpiarInput = () => {
    elementos.busquedaInputArtista.value = '';
}
//Función que limpa los resultados de la información general del artista
export const limpiarResultados = () => {
    elementos.informacionArtistaContenedor.innerHTML = '';
}

//Función que limpa los resultados de los albumes
export const limpiarResultadosAlbumes = () => {
    elementos.informacionAlbumesContenedor.innerHTML = '';
}

//Función que formatea los generos
const formateaGeneros = generos => generos.map(elemento => elemento[0].toUpperCase() + elemento.slice(1)).join(', ');

//Función que formatea el número de seguidores en spotify
const formateaSeguidores = seguidores => {
    if(seguidores.toString().length <= 6 ){
        let res = seguidores.toString().split('');
        const grupo1 = res.splice(-3);
        const grupo2 = res.splice(-3);
        return `${grupo2.join('')},${grupo1.join('')}`;
    }else if(seguidores.toString().length > 6 && seguidores.toString().length < 9){
        let res = seguidores.toString().split('');
        const grupo1 = res.splice(-3);
        const grupo2 = res.splice(-3);
        return `${res.join('')},${grupo2.join('')},${grupo1.join('')}`;
    }
}

//Función que formatea las fechas de los albumes

const formateaFechas = fechas => {
    fechas = fechas.split('-');
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dia = fechas[fechas.length - 1];
    let mes = fechas[fechas.length - 2];
    const año = fechas[fechas.length - 3];
    let mesNombre = '';
    mes == '10' ? mesNombre = meses[10 - 1] : mesNombre = meses[mes-1];
    if(fechas.length > 1){
        mes = parseInt(mes.split('').filter(elemento => elemento !== '0').join(''));
    }
    return fechas.length > 1 ? `${dia} de ${mesNombre} del ${año}` : `Año: ${fechas}`;
}

//Funcion que genera el spinner
export const spinner = () => {
    const markupSpinner = `
        <div class="spinner--azul">
            <svg class="iformacion-general__icono">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></use>
            </svg>
        </div>
    `
    elementos.contenedorSpinner.insertAdjacentHTML('afterbegin', markupSpinner);
}

// ---------------Esta función da los permisos de la API de spotify--------------------
export const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

export const limpiarSpinner = () => {
    const loader = document.querySelector('.spinner--azul');
    if (loader) loader.parentElement.removeChild(loader);
};

//Función que muestra los resultados del artista en el DOM
export const mostrarResultadoArtista = resultado => {
    const markup = `
            <div class="informacion-general__foto">
                <img src="${resultado.images[0].url}" alt="Artista">
            </div>
            <a href="${resultado.id}">
                <svg class="informacion-general__like">
                    <use href="img/symbol-defs.svg#icon-heart"></use>
                </svg>
            </a>
            <h3 class="informacion-general__nombre-artista">
                ${resultado.name}
            </h3>
            <div class="informacion-general__datos-generales">
                <ul class="lista-datos">
                    <li class="lista-datos__item">Género(s): <span>${formateaGeneros(resultado.genres)}.</span></li>
                    <li class="lista-datos__item">Popularidad en spotify: <span>${resultado.popularity}%</span></li>
                    <li class="lista-datos__item">Seguidores en spotify: <span>${formateaSeguidores(resultado.followers.total)} personas están escuchando esto.</span></li>
                </ul>
            </div>
        </div>
        
    `;
    elementos.informacionArtistaContenedor.insertAdjacentHTML('beforeend', markup);
}

//Función que muestra el titulo "Albumes"

export const mostrarTitulo = () => {
    const markupTitulo = `
        <h3 class="informacion-albumes__titulo">
            Álbumes
        </h3>
    `;

    elementos.informacionAlbumesContenedor.insertAdjacentHTML('beforeend', markupTitulo);
}

//Función que muestra los albumes en el DOM
export const mostrarAlbum = album => {
    const markupAlbum = `
            <li class="listaAlbumes__item">
                <div class="album">
                    <img src="${album.images[0].url}" alt="${album.name}" class="album__foto">
                    <div class="album__descripcion">
                        <p class="album__descripcion--grande">
                            ${album.name}
                        </p>
                        <p class="album__descripcion--pequeña">
                            Tracks: ${album.total_tracks}
                        </p>
                        <p class="album__descripcion--pequeña">
                            Fecha de lanzamiento: ${formateaFechas(album.release_date)}
                        </p>
                    </div>
                </div>
            </li>
        `;
    elementos.informacionAlbumesContenedor.insertAdjacentHTML('beforeend', markupAlbum);
}



