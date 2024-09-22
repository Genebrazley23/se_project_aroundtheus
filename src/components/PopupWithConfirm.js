import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
  }

  setSubmitAction(fn) {
    this._handleSubmit = fn;
  }

  setEventListeners() {
    // extends parent method
    // set submission handler
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
