import Popup from './Popup.js'

export class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector });
        this._coverImg = this._popupCurrent.querySelector(this._coverImgSelector)
        this._coverText = this._popupCurrent.querySelector(this._coverTextSelector);
    }

    open(cardData) {
        super.open();
        this._coverImg.src = cardData.link;
        this._coverImg.alt = `Изображение места ${cardData.name}`;
        this._coverText.textContent = cardData.name;
        super.setEventListeners();
    }
}