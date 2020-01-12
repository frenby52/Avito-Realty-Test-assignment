export default class Card {
  constructor(data) {

    this.id = data[`id`] || ``;
    this.address = data[`address`] || ``;
    this.title = data[`title`] || ``;
    this.previewImage = data[`previewImage`] || ``;
    this.price = data[`price`] || ``;
    this.description = data[`description`] || ``;
    this.sellerName = data[`sellerName`] || ``;
    this.images = data[`images`] || [];
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.map(Card.parseCard);
  }
}
