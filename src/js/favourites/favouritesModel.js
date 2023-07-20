export default class Favourites {
	constructor() {
		this.favs = [];
		this.readStorage();
	}

	addFav(id) {
		this.favs.push(id);
		this.saveData();
	}

	removeFav(id) {
		const index = this.favs.indexOf(id);
		this.favs.splice(index, 1);
		this.saveData();
	}

	isFav(id) {
		return this.favs.indexOf(id) !== -1 ? true : false;
	}

	toggleFav(id) {
		this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    saveData(){
        localStorage.setItem('favs', JSON.stringify(this.favs));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favs'));
        if ( storage ) this.favs = storage;
    }
}
