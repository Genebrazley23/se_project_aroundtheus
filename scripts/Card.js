class Card {
  constructor({ name, link }, cardSelector, cardImageClickHandler) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardImageClickHandler = cardImageClickHandler;
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

    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", this._cardImageClickHandler);
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
