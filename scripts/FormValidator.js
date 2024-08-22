class FormValidator {
  constructor(config, formEle) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this.formEle = formEle;
    this._inputEles = [...this.formEle.querySelectorAll(this._inputSelector)];
    this._submitButton = this.formEle.querySelector(this._submitButtonSelector);
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
    const foundInvalid = this._inputEles.some(
      (inputEle) => !inputEle.validity.valid
    );

    if (foundInvalid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputEles, this._submitButton);
    this._inputEles.forEach((inputEle) => {
      inputEle.addEventListener("input", () => {
        this._checkInputValidity(inputEle);
        this._toggleButtonState(this._inputEles, this._submitButton);
      });
    });
  }

  enableValidation() {
    this.formEle.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
