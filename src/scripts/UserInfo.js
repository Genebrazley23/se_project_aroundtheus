export default class UserInfo {
  constructor({ profileTitleSelector, profileDescriptionSelector }) {
    this._data = {};
    this._profileTitle = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__discription");
  }

  getUserInfo() {
    const userData = {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
    return userData;
  }
  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
  }
}
