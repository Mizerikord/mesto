import Popup from './Popup.js'

export class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._coverImg = this._popupCurrent.querySelector(this._config.coverImg)
        this._coverText = this._popupCurrent.querySelector(this._config.coverText);
    }

    open(cardData) {
        super.open();
        this._coverImg.src = cardData.link;
        this._coverImg.alt = `Изображение места ${cardData.name}`;
        this._coverText.textContent = cardData.name;
    }
}