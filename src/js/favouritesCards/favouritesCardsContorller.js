import FavouritesCards from "./favouritesCardsModel";
import * as view from "./favouritesCardsView";


export default async function(state){
    // Получаем список объектов, которые находятся в избранном 
    const favsList = state.favourites.favs;

    // Получение данных с сервера 
    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    // Отображаем контейнер и карточки 
    view.renderPage(favouriteCards.cards);

    // Запускаем прослушку клика на иконки добавить в избранное 
	addToFavListener();

    // Функция для работы иконок "добавить в избранное"
	function addToFavListener(){
        // Прослушка клика по нажатию на кнопку "Добавить в избранное"
        Array.from(document.getElementsByClassName("card__like")).forEach((item) =>{
            item.addEventListener('click', (e)=>{
                // Отменяем стандартное поведение страницы
                e.preventDefault();
                // Находим ID объекта по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;
                // Добавляем/убираем элемент из избраного
                state.favourites.toggleFav(currentId);
                // Включаем/выключаем иконку с избранным 
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            })
        });
        }
}
