import Filter from './filterModel';
import * as view from './filterView';

// Функция, отвечающая за работу фильтра 
export default async function(state) {
    // Метод getParams() сделает запрос на сервер, получит данные и запишет из в объект filter 
    // filter.getParams();

    //Создание объекта filter с проверкой есть ли он 
    if(!state.filter) state.filter = new Filter();

    // Получение параметров для фильтра
    await state.filter.getParams();

    // Отрисовка фильтра
    view.render(state.filter.params);

    // Запрос на сервер (Так как метод getResults() связан с fetch надо подождать пока он вернет ответ мы дописываем await)
    await state.filter.getResults();
    state.results = state.filter.result;

    // Обновляем счетчик на кнопке 
    view.changeButtonText(state.filter.result.length);

    // Прослушка событий формы 
    const form = document.querySelector("#filter-form");

    // Слушаем изменилось ли что-то в форме 
    form.addEventListener('change', async function(e){
        // Отменили стандартное поведение
        e.preventDefault();
        // Собрали данные из формы и сохранили 
        state.filter.query = view.getInput();
        // Делает запрос на сервер и получает новые объекты
        await state.filter.getResults();
        // Сохраним в общий state приложения
        state.results = state.filter.result;
        // Значение квартир на кнопке в виде числа 
        view.changeButtonText(state.filter.result.length);
    });

    // Прослушка кнопки сброса 
    form.addEventListener('reset', async function(){
        state.filter.query = '';
        await state.filter.getResults();
        view.changeButtonText(state.filter.result.length);
    });

    // Отправка формы 
    form.addEventListener('submit', function(e){
        e.preventDefault();
        state.emitter.emit('event:render-listing', {});
    });
}
