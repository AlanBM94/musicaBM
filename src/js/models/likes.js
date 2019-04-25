export default class Likes {
    constructor(){
        this.likes = [];
    }

    agregarLike(id, imagen, nombre, genero){
        const like = {id, imagen, nombre, genero}
        this.likes.push(like);
        this.likeStorage();
        console.log(like);
        return like;
    }
    
    //Guarda los likes en local storage
    likeStorage(){
        localStorage.setItem('likesArtistas', JSON.stringify(this.likes));
    }
    
    //Cuando se da un like retorna el elemento seleccionado
    isLiked(id){
        // console.log(this.likes.findIndex(elemento => elemento.id === id) !== -1);
        return this.likes.findIndex(elemento => elemento.id === id) !== -1;
    }


    //Leé el local storage y lo agrega a this.likes
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likesArtistas'));
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }

    //Elimina un elemento de local Storage
    deleteStorage(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.likeStorage();
    }

    
}
