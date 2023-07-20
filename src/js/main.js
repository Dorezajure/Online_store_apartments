import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventImitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel';

const state = {
	results: [],
	emitter: new EventImitter(),
	favourites: new Favourites()
}

// Роутер 
// Маршруты 
const routes = [
	{ path: '/', component: homePage },
	{ path: 'item', component: singleItem },
	{ path: 'favourites', component: favouritesPage },
	{ path: 'bids', component: bidsPage },
];

function findComponentByPath(path, routes) {
	return routes.find(function (route) {
		return route.path === path;
	});
}

// По какому адресу мы зашли на сайт, вычленить маршрут, по маршруту найти нужный компонент и вывести его на страницу 
function router() {
    // обращаемся к тому что написано в адресной строке далее разбиваю массив через /
    const pathArray = location.hash.split('/'); 

    // Смотрим какой массив мы получили и проверяем через тернарный оператор наличие пустой строки или / 
    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath;

    // Сохранение параметра роутера 
    state.routeParams = pathArray[2] ? pathArray[2] : '';
    // Проверяем на наличие пустой строки, в этом случае сбрасываем на главную то есть на /
    const {component = errorPage} = findComponentByPath(currentPath, routes) || {};

    // Подразумеваем что переменная становится функцией и осуществляет рендер страницы за которую она отвечает 
    component(state);
}

// Запуск роутера осуществляется в случае если мы перешли по ссылке тем самым изменив hash и запускаем функцию router
window.addEventListener("hashchange", router);
// И когда страница загружается 
window.addEventListener("load", router);
