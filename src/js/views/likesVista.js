import {elementos} from './base';

export const activarLike = () => {
    document.querySelector('.informacion-general__like use').style.fill = '#8c85ff'; 
}

//Pone las primeras letra de los generos en mayusculas
const formatearGenero = genero => genero.split(' ').map(elemento => {
    return `${elemento.split('')[0].toUpperCase()}${elemento.slice(1)}`;
    }).join(' ');

export const mostrarArtistaLikeado = artista => {
    const markupArtista = `
            <li >
                <div class="likes__link">
                    <figure class="likes__fig">
                        <img src="${artista.imagen}" alt="Test">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${artista.nombre}</h4>
                        <p class="likes__genre">${formatearGenero(artista.genero)}</p>
                    </div>
                    <div class="likes__btn">
                        <a class="likes__btn--buscar" href="https://open.spotify.com/artist/${artista.id}" target="_blank" >
                            <svg>
                                <use xlink:href="img/symbol-defs.svg#icon-magnifying-glass"></use>
                            </svg>
                        </a>
                        <a href="${artista.id}" class="likes__btn--eliminar">X</a>
                    </div>
                </div>
            </li> 
    `;
    elementos.contenedorLikes.insertAdjacentHTML('beforeend', markupArtista);
}

export const eliminarArtista = e => {
    const artistaSeleccionado = e.parentElement.parentElement.parentElement.parentElement;
    const li = document.querySelector('.likes__link').parentElement;
    artistaSeleccionado.removeChild(li);

}