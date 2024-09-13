import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import "../pages/index.css";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import Section from "../scripts/Section.js";

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

const cardSection = new Section(
  { renderer: createCard, items: initialCards },
  ".cards__list"
);
cardSection.renderItems();

const popupWithImage = new PopupWithImage("#image__popup");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

userInfo.setUserInfo({ title: "Jacques Cousteau", description: "Explorer" });

const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleEditFormSubmit
);

profileEditPopup.setEventListeners();

const placeCreatePopup = new PopupWithForm(
  "#place__create-modal",
  handlePlaceCreateForm
);

placeCreatePopup.setEventListeners();

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
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDiscriptionInput.value = userData.description;
  profileEditPopup.open();
});

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
}

function handlePlaceCreateForm(data) {
  const cardData = {
    name: data.title,
    link: data.link,
  };
  placeCreateFormValidator.disableSubmit();

  const card = createCard(cardData);
  cardSection.addItem(card);
  placeCreateForm.reset();
  placeCreatePopup.close();
  return false;
}

profileAddButton.addEventListener("click", function () {
  placeCreatePopup.open();
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
