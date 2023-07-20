import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function(state) {
    state.singleItem = new SingleItem(state.routeParams);
    // Получаем данные с сервера 
    await state.singleItem.getItem();

    // Отрисовываем разметку для отдельного объекта 
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // Запуск прослушки событий (Несколько функций)
    // Открытие модального окна 
    document.querySelector(".button-order").addEventListener('click', () => {
        view.showModal();
    });

    // Закрытие модального окна
    document.querySelector(".modal__close").addEventListener('click', () => {
        view.hideModal();
    });

    // Закрытие модального окна - клик по оверлею
    document.querySelector(".modal-wrapper").addEventListener('click', (e) => {
        if(e.target.closest('.modal')) {
            return null;
        } else {
            view.hideModal();
        }
    });

    // Отправка формы 
    document.querySelector(".modal__form").addEventListener("submit", async function(e){
        e.preventDefault();
        // Возвращает объект с данными из модалки 
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);

        // Переменная для более краткой записи условия ниже 
        const responce = state.singleItem.responce;

        if(responce.message === 'Bid Created'){
            alert('Ваша заявка успешно получена!');
            // Закрываем форму
            view.hideModal();
            // Очищаем форму от прошлых данных 
            view.clearInput();
        } else if(responce.message === 'Bid Not Created') {
            responce.errors.forEach((item) => {
                alert(item);
            });
        }
    });

    // Клик по кнопке "Добавить в Избранное"
    document.querySelector('#addToFavouriteBtn').addEventListener('click', ()=>{
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    })
}
