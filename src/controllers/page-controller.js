import {renderComponent} from "../util";
import MainCardsComponent from "../components/main-cards";
import CardController from "./card-controller";

const renderCards = (cards, container, api) => {
  return cards.map((card) => {
    const cardController = new CardController(container, api);
    cardController.render(card);

    return cardController;
  });
};

export default class PageController {
  constructor(container, cardsModel, api) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._api = api;

    this._mainCardsComponent = new MainCardsComponent();
  }

  render() {
    const cards = this._cardsModel.getCards();
    this._renderCards(cards);
    renderComponent(this._container, this._mainCardsComponent);
  }

  _renderCards(cards) {
    renderCards(cards, this._mainCardsComponent.getContainer(), this._api);
  }

  showErrorMessage() {
    this._mainCardsComponent.getContainer().innerHTML = `<p class="cards__error">Failed to load data. Please, try again later</p>`;
    this.render();
  }
}
