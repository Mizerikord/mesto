export class Section {
    constructor({renderer}, itemSelector) {
        this._renderer = renderer;
        this._itemSelector = document.querySelector(itemSelector);
    }

    addItem(element) {
        this._itemSelector.prepend(element);
    }

    renderCards(items) {
        items.forEach((elem) => {
            this.addItem(this._renderer(elem));
        })
    }
}