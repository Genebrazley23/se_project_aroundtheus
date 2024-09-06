import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import "../pages/index.css";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* ELEMENTS */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileDescription = document.querySelector(".profile__discription");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDiscriptionInput = document.querySelector(
  "#profile-discription-input"
);
const profileEditForm = document.forms["profile__form"];
const profileModalClose = profileEditModal.querySelector(".modal__close");
const profileAddButton = document.querySelector(".profile__add-button");

const cardListElement = document.querySelector(".cards__list");

const placeCreateForm = document.forms["place__create-form"];
const placeCreateModal = document.querySelector("#place__create-modal");
const placeCreateClose = placeCreateModal.querySelector(".modal__close");

const placeNameInput = document.querySelector("#place__name-input");
const placeImageInput = document.querySelector("#place__image-link-input");

const popupWithImage = new PopupWithImage("#image__popup");
popupWithImage.setEventListeners();
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleEditFormSubmit
);

profileEditPopup.setEventListeners();

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
const placeCreateFormValidator = new FormValidator(
  validationConfig,
  placeCreateForm
);
profileEditFormValidator.enableValidation();
placeCreateFormValidator.enableValidation();

/* LISTENERS */
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDiscriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

function handleEditFormSubmit(e, data) {
  e.preventDefault();
  profileTitle.textContent = data["title"];
  profileDescription.textContent = data["description"];
  profileEditPopup.close();
  return false;
}

placeCreateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: placeImageInput.value,
  };

  placeCreateFormValidator.disableSubmit();

  const card = createCard(cardData);
  cardListElement.prepend(card);
  placeNameInput.value = null;
  placeImageInput.value = null;
  closeModal(placeCreateModal);
  return false;
});

profileModalClose.addEventListener("click", function () {
  closeModal(profileEditModal);
});

placeCreateClose.addEventListener("click", function () {
  closeModal(placeCreateModal);
});

profileAddButton.addEventListener("click", function () {
  openModal(placeCreateModal);
});

/* Functions */

// Define the createCard function
function createCard(cardData) {
  // Select the template element and clone its contents
  const cardInfo = new Card(cardData, "#card__template", function () {
    openZoomPicture(cardData.link, cardData.name);
  });
  const cardElement = cardInfo.getView();
  return cardElement;
}

function openZoomPicture(src, alt) {
  const data = { name: alt, link: src };

  popupWithImage.open(data);
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData);
  cardListElement.append(cardElement);
});
