export default class UserInfo {
  constructor({
    profileTitleSelector,
    profileDescriptionSelector,
    avatarSelector,
  }) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
    return userData;
  }
  setUserInfo({ title, description, avatar }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
    this._avatar.src = avatar;
  }
}
