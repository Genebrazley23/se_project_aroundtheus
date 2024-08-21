class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });
    const removeButton = this._cardElement.querySelector(".delete__button");
    removeButton.addEventListener("click", () => {
      const cardItem = removeButton.closest(".card");
      cardItem.remove();
    });
  }
  _bindInfo() {
    const cardTitleElement = this._cardElement.querySelector(".card__name");
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = cardTemplate.content.cloneNode(true);
    this._setEventListeners();
    this._bindInfo();
    return this._cardElement;
  }
}

export default Card;
