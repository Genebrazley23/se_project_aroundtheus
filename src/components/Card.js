class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    cardImageClickHandler,
    handleDelete,
    cardLikeClick
  ) {
    this._isLiked = isLiked;
    this._handleCardLikeClick = cardLikeClick;
    this._name = name;
    this._link = link;
    this.id = _id;
    this._cardSelector = cardSelector;
    this._cardImageClickHandler = cardImageClickHandler;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._isLiked = !this._isLiked;
      this.updateLikeState();
      this._handleCardLikeClick(this, this.id, this._isLiked);
    });
    const removeButton = this._cardElement.querySelector(".delete__button");
    removeButton.addEventListener("click", () => {
      const cardItem = removeButton.closest(".card");
      this._handleDelete(this, cardItem);
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
    this.updateLikeState();
  }

  updateLikeState() {
    const activeClass = "card__like-button_active";
    if (this._isLiked) {
      this._likeButton.classList.add(activeClass);
    } else {
      this._likeButton.classList.remove(activeClass);
    }
  }

  getView() {
    const cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = cardTemplate.content.cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._setEventListeners();
    this._bindInfo();
    return this._cardElement;
  }
}

export default Card;
