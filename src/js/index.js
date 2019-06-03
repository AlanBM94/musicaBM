const css = require('../sass/main.scss');
import {elementos} from './views/base';
import BusquedaArtista from './models/busquedaArtista';
import Lanzamientos from './models/nuevosLanzamientos';
import BusquedaCancion from './models/busquedaCancion';
import Likes from './models/likes';
import * as busquedaArtistaVista from './views/busquedaArtistaVista';
import * as lanzamientosVista from './views/nuevosLanzamientosVista';
import * as cancionVista from './views/busquedaCancionVista';
import * as likeVista from './views/likesVista';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

// Estado de las peticiones a APIS
const estado = {}

  //------------------------Controlador de la Busqueda del artista-----------------------------
  const controlBusqueda = async () => {
      
      const consulta = busquedaArtistaVista.conseguirVIA();
      if(consulta){
        const params = busquedaArtistaVista.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
          }

        //Nueva instancia de BusquedaArtista y se agrega al estado
        estado.busqueda = new BusquedaArtista(consulta);

        //Prepara el Dom para la aparición de los datos
        busquedaArtistaVista.limpiarInput();
        busquedaArtistaVista.limpiarResultados();
        busquedaArtistaVista.spinner();
        busquedaArtistaVista.limpiarResultadosAlbumes();
        try{
            await estado.busqueda.obtenerResultados();
            await estado.busqueda.obtenerAlbumes();
            busquedaArtistaVista.limpiarSpinner();
            //Muestra en el DOM los resultados principales del artista
            busquedaArtistaVista.mostrarResultadoArtista(estado.busqueda.resultado);
            //Muestra el titulo "Albumes"
            busquedaArtistaVista.mostrarTitulo();
            //Muestra en el DOM los resultados de los albumes del artista
            estado.busqueda.albumes.forEach(album => {
                busquedaArtistaVista.mostrarAlbum(album);
            })
        }catch(error){
            console.log(error);
            // alert('Ingresa un Artista Valido');
        }
    }
}

//---------------------Controlador de el buscador de nuevos lanzamientos-------------------------
const controlLanzamientos = async () => {
    
    const params = busquedaArtistaVista.getHashParams();
    const token = params.access_token;
    if (token) {
        spotifyApi.setAccessToken(token);
        }
    const ciudad = lanzamientosVista.obtenerCiudad();
    console.log(ciudad);
    //Se agrega al estado la busqueda de los lanzamientos
    estado.busquedaLanzamientos = new Lanzamientos(ciudad);
    //Prepara la UI para lanzar los lanzamientos
    lanzamientosVista.limpiarLanzamientos();
    lanzamientosVista.spinner();
    try{
        await estado.busquedaLanzamientos.obtenerLanzamientos();
        lanzamientosVista.limpiarSpinner();
        estado.busquedaLanzamientos.resultado.forEach(lanzamiento => {
            lanzamientosVista.mostrarLanzamiento(lanzamiento);
        })
    }catch(error){
        console.log(error);
    }
}


//---------------------Controlador de la busqueda de canciones-------------------------
const controladorCancion = async () => {
    const cancion = cancionVista.inputsCancion();
    if(cancion){
        const params = busquedaArtistaVista.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        //Se agrega al estado la busqueda de la canción
        estado.busquedaCancion = new BusquedaCancion(cancion.artista, cancion.cancion);
        //Prepara la UI para mostrar la letra de la canción
        cancionVista.limpiarCancion();
        cancionVista.limpiarInputsCancion();
        cancionVista.limpiarAnalisis();
        cancionVista.spinner();
        try{
            await estado.busquedaCancion.consultarCancion();
            await estado.busquedaCancion.idCancion();
            await estado.busquedaCancion.analisisCancion();
            cancionVista.limpiarSpinner();
            cancionVista.mostrarCancion(estado.busquedaCancion.resultado);
            cancionVista.mostrarAnalisis(estado.busquedaCancion.analisis);
        }catch(error){
            alert('Ingresa una canción Valida');
            console.log(error);
            cancionVista.limpiarSpinner();
        }
        
    }

}

//Lleva el control de los likes
const controlLikes = () => {

    if(!estado.likes) {
        estado.likes = new Likes();
    }
    console.log(estado.busqueda.resultado);
    
    const id = estado.busqueda.id;
    const imagen = estado.busqueda.resultado.images[0].url;
    const nombre = estado.busqueda.resultado.name;
    const genero = estado.busqueda.resultado.genres[0];
    if(!estado.likes.isLiked(id)){
        const nuevoLike = estado.likes.agregarLike(id, imagen, nombre, genero);
        likeVista.activarLike();
        //Agrega el artista likeado a la sección de favoritos
        likeVista.mostrarArtistaLikeado(nuevoLike);

    }

}

// --------------------Eventos-----------------------------

//Elemento que se dispara cuando se carga la pagina
window.addEventListener('load', () => {    
    // Restore likes
    estado.likes = new Likes();
    estado.likes.readStorage();
    estado.likes.likes.map(elemento => likeVista.mostrarArtistaLikeado(elemento));

});

//Evento que se dispara cuando se busca un artista
elementos.formArtista.addEventListener('submit', e => {
    e.preventDefault();
    controlBusqueda();

})

//Evento que se dispara cuando se presiona el boton de "Buscar"
elementos.botonBuscarLanzamientos.addEventListener('submit', e => {
    e.preventDefault();
    controlLanzamientos();
})

//Evento que se dispara cuando se busca una canción
elementos.formCancion.addEventListener('submit', e => {
    e.preventDefault();
    controladorCancion();
    // controladorAnalisis();
    
})

//Evento que se dispara cuando presionas el corazón
elementos.informacionArtistaContenedor.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('use')){
        controlLikes();  
    }
})


//Evento que se dispara cuando se presiona el boton de eliminar de local storage
elementos.contenedorLikes.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.likes__btn--eliminar')){
        const id = e.target.href.split('/');
        estado.likes.deleteStorage(id[id.length - 1]);
        likeVista.eliminarArtista(e.target);
    }
})


//Abre la pagina de spotify del artista seleccionado
elementos.contenedorLikes.addEventListener('click', e => {
    const btn = e.target.closest('svg');
    if (btn) {
        const id = btn.parentElement.href.split('/');
        open(`https://open.spotify.com/artist/${id[id.length - 1]}`);
    }
})

//Abre los enlaces de los lanzamientos
elementos.lanzamientosContenedor.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.item-cancion__nombre p')){
        const enlaces = estado.busquedaLanzamientos.resultado;
        const nom = e.target.textContent;
        // console.log(nom);
        const indiceNom = enlaces.findIndex(enlace => enlace.name == nom);
        open(`https://open.spotify.com/album/${enlaces[indiceNom].id}`)
       
    }
})











