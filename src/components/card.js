import AbstractComponent from "./abstract-component";

const createCardTemplate = (data) => {
  const {id, address, title, previewImage, price} = data;
  return (`<article class="cards__card-item card-item">
            <a class="card-item__link" href="#">
              <p class="card-item__picture">
                <img class="card-item__image" src="${previewImage}" alt="Фото объекта">
              </p>
              <h3 class="card-item__title">${title}</h3>
            </a>
            <ul class="card-item__property-list">
              <li class="card-item__property-item card-item__property-item--id">id: ${id}</li>
              <li class="card-item__property-item"><span class="card-item__property-title">Адрес: </span>${address}</li>
              <li class="card-item__property-item"><span class="card-item__property-title">Цена: </span>${price}</li>
            </ul>
           </article>`);
};

export default class Card extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createCardTemplate(this._data);
  }

  setCardClickHandler(handler) {
    this._element.querySelector(`.card-item__image`).addEventListener(`click`, handler);
  }

}


