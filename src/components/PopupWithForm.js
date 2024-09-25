import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._getInputValues = this._getInputValues.bind(this);
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  _clearInputs() {
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      this.renderLoading(true);
      this._handleFormSubmit(data)
        .then(() => {
          this._clearInputs();
          this.close();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
}
