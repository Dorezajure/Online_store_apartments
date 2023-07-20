export default class Bids {
    constructor(){

    }
    async getBids(){
        try {
            const queryString = `http://cc61457.tw1.ru/api/bids`;
            const result = await fetch(queryString);
            const data = await result.json();
            this.bids = await data;
        } catch(error) {
            alert('Error with getting Bids');
            console.log(error);
        }
    }
}