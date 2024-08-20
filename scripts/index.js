import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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

const cardInfo = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const card = new Card(cardInfo);
card.getView();

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

const cardTemplate = document.querySelector("#card__template").content;
const cardListElement = document.querySelector(".cards__list");

const placeCreateForm = document.forms["place__create-form"];
const placeCreateModal = document.querySelector("#place__create-modal");
const placeCreateClose = placeCreateModal.querySelector(".modal__close");

const placeNameInput = document.querySelector("#place__name-input");
const placeImageInput = document.querySelector("#place__image-link-input");

const imageModal = document.querySelector("#image__popup");
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const imageModalZoom = document.querySelector(".modal__zoom");
const imageModalName = document.querySelector(".modal__name");

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
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDiscriptionInput.value;
  closeModal(profileEditModal);
  return false;
});

placeCreateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: placeImageInput.value,
  };

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

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

/* Functions */

// Define the createCard function
function createCard(cardData) {
  // Select the template element and clone its contents
  const cardElement = cardTemplate.cloneNode(true);

  // Access the card title and image elements within the cloned element
  const cardTitleElement = cardElement.querySelector(".card__name");
  const cardImageElement = cardElement.querySelector(".card__image");

  // Set the image path, alt text, and the card title
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const removeButton = cardElement.querySelector(".delete__button");
  removeButton.addEventListener("click", () => {
    const cardItem = removeButton.closest(".card");
    cardItem.remove();
  });

  cardImageElement.addEventListener("click", function () {
    openZoomPicture(cardData.link, cardData.name);
  });

  return cardElement;
}

function openZoomPicture(src, alt) {
  openModal(imageModal);
  imageModalName.textContent = alt;
  imageModalZoom.src = src;
  imageModalZoom.alt = alt;
}

function openModal(modal) {
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClose);
  modal.classList.add("modal_open");
}

function closeModal(modal) {
  modal.removeEventListener("click", handleOverlayClose);
  document.removeEventListener("keydown", handleEscClose);
  modal.classList.remove("modal_open");
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal_open")) {
    closeModal(evt.target);
  }
}

initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData);
  cardListElement.append(cardElement);
});
