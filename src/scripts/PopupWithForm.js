import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      console.log("hytu", input);
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      const data = this._getInputValues();
      this._handleFormSubmit(data);
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
