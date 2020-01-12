import CardComponent from "../components/card";
import CardPopupComponent from "../components/card-popup";
import {isEscEvent, renderComponent} from "../util";

export default class CardController {
  constructor(container, api) {
    this._container = container;

    this._cardComponent = null;
    this._cardPopupComponent = null;
    this.data = {};
    this._api = api;

    this._onCardEscPress = this._onCardEscPress.bind(this);
    this._closeCardPopup = this._closeCardPopup.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
  }

  render(card) {
    this.data = card;
    this._cardComponent = new CardComponent(card);
    renderComponent(this._container, this._cardComponent);

    this._cardComponent.setCardClickHandler(this._onCardClick);
  }

  _showOverlay() {
    document.querySelector(`.overlay`).classList.remove(`visually-hidden`);
  }

  _hideOverlay() {
    document.querySelector(`.overlay`).classList.add(`visually-hidden`);
  }

  _closeCardPopup() {
    if (this._cardPopupComponent) {
      this._cardPopupComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onCardEscPress);
      this._hideOverlay();
    }
  }

  _onCardEscPress(evt) {
    isEscEvent(evt, this._closeCardPopup);
  }

  _onCardClick(e) {
    e.preventDefault();
    this._cardComponent.getElement().classList.remove(`shake`);
    this._api.getCard(this.data.id)
      .then((card) => {
        this._cardPopupComponent = new CardPopupComponent(card[0]);
        renderComponent(this._container, this._cardPopupComponent);
        this._setCardPopupHandlers();
        this._showOverlay();
      }).catch(() => this._cardComponent.getElement().classList.add(`shake`));
  }

  _setCardPopupHandlers() {
    this._cardPopupComponent.setCloseBtnClickHandler(this._closeCardPopup);
    document.addEventListener(`keydown`, this._onCardEscPress);
  }
}
