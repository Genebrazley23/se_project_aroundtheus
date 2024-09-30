import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import Api from "../utils/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/* ELEMENTS */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const openPopupButton = document.querySelector("#image__popup");
const profileEditForm = document.forms["profile__form"];
const profileModalClose = profileEditModal.querySelector(".modal__close");
const profileAddButton = document.querySelector(".profile__add-button");

const cardListElement = document.querySelector(".cards__list");

const placeCreateForm = document.forms["place__create-form"];
const placeCreateModal = document.querySelector("#place__create-modal");
const placeCreateClose = placeCreateModal.querySelector(".modal__close");

const placeNameInput = document.querySelector("#place__name-input");
const placeImageInput = document.querySelector("#place__image-link-input");

const avatarEditButton = document.querySelector(".profile__avatar");
const updateAvatarForm = document.forms["avatar__update-form"];
const avatarInput = document.querySelector("#avatar__image-link-input");

const cardSection = new Section({ renderer: createCard }, ".cards__list");

const popupWithImage = new PopupWithImage("#image__popup");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

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

const setAvatarPopup = new PopupWithForm(
  "#avatar__update-modal",
  handleAvatarUpdate
);

setAvatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  setAvatarPopup.open();
});

// find avatar image element and add a click handler to open the update form.
//
const updateAvatarFormValidator = new FormValidator(
  validationConfig,
  updateAvatarForm
);
updateAvatarFormValidator.enableValidation();

const popupWithConfirm = new PopupWithConfirm("#place__delete-modal");
popupWithConfirm.setEventListeners();

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
  profileDescriptionInput.value = userData.description;
  profileEditPopup.open();
});

function handleEditFormSubmit(data) {
  return api
    .updateUserInfo({ name: data.title, about: data.description })
    .then(() => {
      userInfo.setUserInfo(data);
    });
}

function handlePlaceCreateForm(data) {
  const cardData = {
    name: data.title,
    link: data.link,
  };
  placeCreateFormValidator.disableSubmit();
  return api.createCard(cardData).then((card) => {
    const cardElement = createCard(card);
    cardSection.addItem(cardElement);
  });
}

profileAddButton.addEventListener("click", function () {
  placeCreatePopup.open();
});

/* Functions */

function handleAvatarUpdate({ link }) {
  return api.updateAvatar({ avatar: link }).then((res) => {
    userInfo.setUserInfo({
      title: res.name,
      description: res.about,
      avatar: res.avatar,
    });
  });
}

function cardLikeClick(cardId, isLiked) {
  if (isLiked) {
    api.likeCard(cardId).catch((error) => {
      console.error(`Failed to like card with ID ${cardId}:`, error);
    });
  } else {
    api.unlikeCard(cardId).catch((error) => {
      console.error(`Failed to unlike card with ID ${cardId}:`, error);
    });
  }
}

function createCard(cardData) {
  const cardInfo = new Card(
    cardData,
    "#card__template",
    function () {
      openZoomPicture(cardData.link, cardData.name);
    },
    handleDeleteCard,
    cardLikeClick
  );
  const cardElement = cardInfo.getView();
  return cardElement;
}
function handleDeleteCard(card, cardElement) {
  popupWithConfirm.open();

  popupWithConfirm.setSubmitAction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        cardElement.remove();

        popupWithConfirm.close();
      })
      .catch((err) => {
        console.err(`Error deleting card: ${err}`);
      });
  });
}

function openZoomPicture(src, alt) {
  const data = { name: alt, link: src };

  popupWithImage.open(data);
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "93b64164-7992-45be-bad2-1f9098f0ec32",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    title: userData.name,
    description: userData.about,
    avatar: userData.avatar,
  });
});

api.getInitialCards().then((cards) => {
  cardSection.setItems(cards);
});
