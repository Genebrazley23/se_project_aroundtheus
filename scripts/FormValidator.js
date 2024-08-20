class FormValidator {
  constructor(config, formEle) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this.formEle = formEle;
  }

  _showInputError(inputEle) {
    const errorMessageEle = this.formEle.querySelector(`#${inputEle.id}-error`);
    if (errorMessageEle) {
      errorMessageEle.textContent = inputEle.validationMessage;
      errorMessageEle.classList.add(this._errorClass);
      inputEle.classList.add(this._inputErrorClass);
    }
  }

  _hideInputError(inputEle) {
    const errorMessageEle = this.formEle.querySelector(`#${inputEle.id}-error`);
    if (errorMessageEle) {
      errorMessageEle.textContent = "";
      errorMessageEle.classList.remove(this._errorClass);
      inputEle.classList.remove(this._inputErrorClass);
    }
  }

  _checkInputValidity(inputEle) {
    if (!inputEle.validity.valid) {
      this._showInputError(inputEle);
    } else {
      this._hideInputError(inputEle);
    }
  }

  _toggleButtonState() {
    const inputEles = [...this.formEle.querySelectorAll(this._inputSelector)];
    const submitButton = this.formEle.querySelector(this._submitButtonSelector);
    const foundInvalid = inputEles.some((inputEle) => !inputEle.validity.valid);

    if (foundInvalid) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEles = [...this.formEle.querySelectorAll(this._inputSelector)];
    const submitButton = this.formEle.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputEles, submitButton);
    inputEles.forEach((inputEle) => {
      inputEle.addEventListener("input", () => {
        this._checkInputValidity(inputEle);
        this._toggleButtonState(inputEles, submitButton);
      });
    });

    this._inputEles = inputEles;
    this._submitButton = submitButton;
  }

  enableValidation() {
    this.formEle.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
