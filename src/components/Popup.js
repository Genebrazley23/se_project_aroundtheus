export default class Popup {
  constructor(popupSelector) {
    this._popElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popElement.querySelector(".modal__close");
    this._handleModalClose = this._handleModalClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleModalClose() {
    this.close();
  }

  setEventListeners() {
    this._popElement.addEventListener("click", this._handleModalClose, false);
    this._popupCloseButton.addEventListener("click", this._handleModalClose);
    this._popElement
      .querySelector(".modal__container")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });
  }
}
