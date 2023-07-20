export default class SingleItem {
    constructor(id){
        this.id = id;
    }

    // Создаем запрос на сервер 
    async getItem(){
        try {
            const queryString = `http://cc61457.tw1.ru/api/items/${this.id}`;
            const responce = await fetch(queryString);
            const data = await responce.json();
            this.result = await data;
        } catch(error) {
            alert(error);
        }
    }

    // Данный метод будет отправлять данные на сервер 
    async submitForm(formData){
        const queryString = 'http://cc61457.tw1.ru/api/bidnew';

        const responce = await fetch(queryString, {
            method: 'POST', 
            headers: {
				'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(formData),
        });

        const data = await responce.json();
        this.responce = await data;
    }
}