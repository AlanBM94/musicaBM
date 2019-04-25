import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();


export default class Lanzamientos {
    constructor(id){
        this.id = id;
    }
    //Función para obtener los nuevos lanzamientos de México
    async obtenerLanzamientos(){
        try{

            const solicitudLanzamientos = await spotifyWebApi.getNewReleases({country: `${this.id}`, limit: 10})
                .then(function(data){
                    return data;
                }, function(error){
                    console.log(error);
                })
                
            this.resultado = solicitudLanzamientos.albums.items.filter(elemento => elemento.album_type = "single");
            this.uri = this.resultado.map(elemento => elemento.uri);

        }catch(error){
            console.log(error);
        }
    }
}

