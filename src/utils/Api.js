export default class Api {
  constructor({ headers, baseUrl }) {
    this._defaultHeaders = headers;
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return this.handleResponse(
      fetch(this._baseUrl + "/cards", { headers: this._defaultHeaders })
    );
  }

  getUserInfo() {
    return this.handleResponse(
      fetch(this._baseUrl + "/users/me", { headers: this._defaultHeaders })
    );
  }

  updateUserInfo(userInfo) {
    return this.handleResponse(
      fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._defaultHeaders,
        body: JSON.stringify(userInfo),
      })
    );
  }

  createCard(createCardInfo) {
    return this.handleResponse(
      fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: this._defaultHeaders,
        body: JSON.stringify(createCardInfo),
      })
    );
  }

  deleteCard(cardId) {
    return this.handleResponse(
      fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._defaultHeaders,
      })
    );
  }

  likeCard(cardId) {
    return this.handleResponse(
      fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
        method: "PUT",
        headers: this._defaultHeaders,
      })
    );
  }

  unlikeCard(cardId) {
    return this.handleResponse(
      fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
        method: "DELETE",
        headers: this._defaultHeaders,
      })
    );
  }

  updateAvatar(avatar) {
    return this.handleResponse(
      fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._defaultHeaders,
        body: JSON.stringify(avatar),
      })
    );
  }

  handleResponse(request) {
    return request
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  loadAll() {
    return Promise.all(this.getInitialCards(), this.getUserInfo());
  }
}
