import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  setEventListeners() {}

  close() {
    this._popupForm.reset();
    super.close();
  }
}
