import AbstractComponent from "./abstract-component";

const createGalleryMarkup = (pics) => pics.map((pic) =>
  `<li class="card-popup__gallery-item">
    <p class="card-popup__gallery-picture">
      <img class="card-popup__gallery-image" src="${pic}" alt="Фото-превью объекта">
    </p>
  </li>`).join(`\n`);

const createCardPopupTemplate = (data) => {
  return (`<section class="card-popup">
              <p class="card-popup__picture">
                <img class="card-popup__image" src="${data.images[0]}" alt="Фото объекта">
              </p>
              <h3 class="card-popup__title">${data.title}</h3>
              <ul class="card-popup__property-list">
                <li class="card-popup__property-item"><span class="card-popup__property-title">id: </span>${data.id}</li>
                <li class="card-popup__property-item"><span class="card-popup__property-title">Адрес: </span>${data.address}</li>
                <li class="card-popup__property-item"><span class="card-popup__property-title">Цена: </span>${data.price}</li>
                <li class="card-popup__property-item"><span class="card-popup__property-title">Описание: </span>${data.description}</li>
                <li class="card-popup__property-item"><span class="card-popup__property-title">Имя продавца: </span>${data.sellerName}</li>
              </ul>
              <ul class="card-popup__gallery-list">${createGalleryMarkup(data.images)}</ul>
              <button class="card-popup__close-btn" type="button">close</button>
              <button class="card-popup__slide-btn card-popup__slide-btn--prev" type="button">←</button>
              <button class="card-popup__slide-btn card-popup__slide-btn--next" type="button">→</button>              
           </section>`);
};

export default class CardPopup extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
    this._images = data.images;
    this._imgIndex = null;
    this._previews = Array.from(this.getElement().querySelectorAll(`.card-popup__gallery-image`));
    this._onGalleryImgClick();
    this._onGalleryButtonClick();
  }

  getTemplate() {
    return createCardPopupTemplate(this._data);
  }

  setCloseBtnClickHandler(handler) {
    this._element.querySelector(`.card-popup__close-btn`).addEventListener(`click`, handler);
  }

  _getFullImage() {
    return this.getElement().querySelector(`.card-popup__image`);
  }

  _onGalleryButtonClick() {
    const galleryBtn = this.getElement().querySelectorAll(`.card-popup__slide-btn`);

    galleryBtn.forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`card-popup__slide-btn--next`)) {
          this._previews[this._imgIndex].classList.remove(`card-popup__gallery-image--active`);
          let newIndex = this._imgIndex + 1;
          if (newIndex === this._images.length) {
            newIndex = 0;
          }
          this._getFullImage().src = this._images[newIndex];
          this._imgIndex = newIndex;
          this._previews[this._imgIndex].classList.add(`card-popup__gallery-image--active`);
        }
        if (evt.target.classList.contains(`card-popup__slide-btn--prev`)) {
          this._previews[this._imgIndex].classList.remove(`card-popup__gallery-image--active`);
          let newIndex = this._imgIndex - 1;
          if (this._imgIndex === 0) {
            newIndex = this._images.length - 1;
          }
          this._getFullImage().src = this._images[newIndex];
          this._imgIndex = newIndex;
          this._previews[this._imgIndex].classList.add(`card-popup__gallery-image--active`);
        }
      });
    });
  }

  _onGalleryImgClick() {
    if (!this._imgIndex) {
      this._imgIndex = 0;
      this._previews[this._imgIndex].classList.add(`card-popup__gallery-image--active`);
    }

    this._previews.forEach((it) => {
      it.addEventListener(`click`, () => {
        this._previews[this._imgIndex].classList.remove(`card-popup__gallery-image--active`);
        this._getFullImage().src = it.src;
        this._imgIndex = this._images.findIndex((currentValue) => currentValue === it.src);
        this._previews[this._imgIndex].classList.add(`card-popup__gallery-image--active`);
      });
    });
  }
}
