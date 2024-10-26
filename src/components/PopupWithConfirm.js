import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleSubmit = handleFormSubmit;
    this._button = this._popElement.querySelector(".modal__button");
  }

  setSubmitAction(fn) {
    this._handleSubmit = fn;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
