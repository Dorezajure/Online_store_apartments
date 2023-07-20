import bids from './../bids/bidsController';

export default function(state) {
    // Очищаем контейнер app
    document.querySelector("#app").innerHTML = '';
    // Запускаем компонент bids из bidsController
    bids(state);
}
