import Card from './models/card.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getCards() {
    return this._load({url: `items`})
      .then((response) => response.json())
      .then(Card.parseCards);
  }

  getCard(id) {
    return this._load({url: `item/${id}`})
      .then((response) => response.json())
      .then(Card.parseCards);
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
