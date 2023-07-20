import * as view from './bidsView.js';
import Bids from './bidsModel.js';

export default async function (state) {

    // Создаем объект модели для работы с заявками
    if ( !state.bids ) state.bids = new Bids();

    // Получаем заявки с сервера
    await state.bids.getBids();

    // Отображаем заявки на странице
    view.renderBids(state.bids.bids);

}