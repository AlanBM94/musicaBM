import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export default class BusquedaArtista {
    constructor(consulta){
        this.consulta = consulta;
        
    }

    async obtenerResultados(){
        //Consigue la autorización de la API de spotify
        try{
            const solicitud = await spotifyWebApi.searchArtists(this.consulta)
            .then(function(data) {
                return data;
            }, function(err) {
                console.error(err);
            });

            //Obtiene el resultado de la petición 
            this.resultado = solicitud.artists.items[0];
            //Agrega el atributo id a la clase
            this.id = this.resultado.id;
          
        }catch(error){
            alert('Ingresa un artista valido');
        }
    }

    async obtenerAlbumes(){
        try{

            const solicitudAlbumes = await spotifyWebApi.getArtistAlbums(this.id)
            .then(function(data) {
                return data;
            }, function(err) {
                console.error(err);
            });

            this.albumes = solicitudAlbumes.items.filter(elemento => elemento.album_type == 'album');

        }catch(error){
            console.log(error);
        }
    }

}