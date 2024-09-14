export default class UserInfo {
  constructor({ profileTitleSelector, profileDescriptionSelector }) {
    this._data = {};
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
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
