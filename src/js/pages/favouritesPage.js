import favouritesCards from "../favouritesCards/favouritesCardsContorller";

export default function (state) {
	document.querySelector("#app").innerHTML = '';
	favouritesCards(state);
}
