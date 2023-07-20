import * as view from './listingView';

export default function(state) {
	// Рендер контейнера для карточек
	view.render();

	// Рендер карточек
	state.results.forEach(function (item) {
		view.renderCard(item, state.favourites.isFav(item.id));
	});

	// Запускаем прослушку клика на иконки добавить в избранное 
	addToFavsListener();

	state.emitter.subscribe('event:render-listing', () => {
        // Очистить контейнер с карточками
        view.clearListingContainer();

        // Отрендерить карточки
        state.results.forEach(function (item) {
			view.renderCard(item, state.favourites.isFav(item.id));
		});

		// Запускаем прослушку клика на иконки добавить в избранное 
		addToFavListener();
	});

	// Функция для работы иконок "добавить в избранное"
	function addToFavsListener(){
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
		});
	});
	}
}
