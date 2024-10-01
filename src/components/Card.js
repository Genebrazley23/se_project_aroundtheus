class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    cardImageClickHandler,
    handleDelete,
    cardLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;

    this._cardSelector = cardSelector;
    this._cardImageClickHandler = cardImageClickHandler;
    this._handleDelete = handleDelete;
    this._handleCardLikeClick = cardLikeClick;

    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._removeButton = this._cardElement.querySelector(".delete__button");
    this._cardImageElement = this._cardElement.querySelector(".card__image");

    this._setEventListeners();
    this._bindInfo();
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _bindInfo() {
    const cardTitleElement = this._cardElement.querySelector(".card__name");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
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

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      const isCurrentlyLiked = this._isLiked;

      this._handleCardLikeClick(this._id, !isCurrentlyLiked)
        .then(() => {
          this._isLiked = !isCurrentlyLiked;
          this.updateLikeState();
        })
        .catch((err) => {
          console.error("Failed to toggle like:", err);
        });
    });

    // Delete Button Event Listener
    this._removeButton.addEventListener("click", () => {
      this._handleDelete(this, this._cardElement);
    });

    this._cardImageElement.addEventListener(
      "click",
      this._cardImageClickHandler
    );
  }

  getView() {
    return this._cardElement;
  }
}

export default Card;
