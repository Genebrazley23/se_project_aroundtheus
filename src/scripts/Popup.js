export default class Popup {
  constructor(popupSelector) {
    this._popElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popElement.querySelector(".modal__close");
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
  }

  open() {
    this._popElement.classList.add("modal_open");
  }

  close() {
    this._popElement.classList.remove("modal_open");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose() {
    this.close();
  }

  _handleCloseButton() {
    this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popElement.addEventListener("click", this._handleOverlayClose, false);
    this._popupCloseButton.addEventListener("click", this._handleCloseButton);
    this._popElement
      .querySelector(".modal__container")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });
  }
}
