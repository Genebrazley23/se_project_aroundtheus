export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  renderItems() {
    this._items.forEach((element) => {
      console.log(element);
      const node = this._renderer(element);
      this.addItem(node);
    });
  }
  addItem(node) {
    this._container.prepend(node);
  }
}