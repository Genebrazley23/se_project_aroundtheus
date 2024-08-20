class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListners() {}

  getView() {
    this._setEventListners();
  }
}

export default Card;
