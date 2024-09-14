import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._imageModalZoom = this._popElement.querySelector(".modal__zoom");
    this._imageModalName = this._popElement.querySelector(".modal__name");
  }

  open(data) {
    this._imageModalName.textContent = data.name;
    this._imageModalZoom.src = data.link;
    this._imageModalZoom.alt = data.name;
    super.open();
  }
}
