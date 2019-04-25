import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();



export default class BusquedaCancion {
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    async consultarCancion(){
        const busqueda = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;
        const resultadoBusqueda = await fetch(busqueda)
        .then(function(response) {
            return response.json();
          })
        this.resultado = resultadoBusqueda.lyrics;
    }

    async idCancion(){
        const solicitudIdCancion = await spotifyWebApi.searchTracks(this.cancion)
            .then(function(data){
                return data;
            })
        this.id = solicitudIdCancion.tracks.items[0].id;

    }

    async analisisCancion(){
        this.analisis = await spotifyWebApi.getAudioFeaturesForTrack(this.id)
            .then(function(data){
                return data;
            })
            
    }

}