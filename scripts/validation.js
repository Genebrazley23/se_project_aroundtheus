function showInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.textContent = inputEle.validationMessage;
    errorMessageEle.classList.add(errorClass);
    inputEle.classList.add(inputErrorClass);
  }
}

function hideInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.textContent = "";
    errorMessageEle.classList.remove(errorClass);
    inputEle.classList.remove(inputErrorClass);
  }
}

function checkInputValidity(formEle, inputEle, options) {
  if (!inputEle.validity.valid) {
    return showInputError(formEle, inputEle, options);
  }
  hideInputError(formEle, inputEle, options);
}

function toggleButtonState(inputEles, submitButton, { inactiveButtonClass }) {
  const foundInvalid = inputEles.some((inputEle) => !inputEle.validity.valid);
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return (submitButton.disabled = true);
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEle, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEles = [...formEle.querySelectorAll(inputSelector)];
  const submitButton = formEle.querySelector(submitButtonSelector);
  inputEles.forEach((inputEle) => {
    inputEle.addEventListener("input", (e) => {
      checkInputValidity(formEle, inputEle, options);
      toggleButtonState(inputEles, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEles = [...document.querySelectorAll(options.formSelector)];
  formEles.forEach((formEle) => {
    formEle.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEle, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
