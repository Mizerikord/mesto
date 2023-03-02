export class Section {
    constructor({ items, renderer }, itemSelector) {
        this._items = items;
        this._renderer = renderer;
        this._itemSelector = itemSelector;
    }

    addItem(element) {
        this._itemSelector.prepend(element);
    }

    renderCards() {
        this._items.forEach((elem) => {
            this.addItem(this._renderer(elem));
        })
    }
}