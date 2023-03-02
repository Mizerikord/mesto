import Popup from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(dataImg, config){
        super(config.popupCover);
        this._dataImg = dataImg;
        this._config = config;
    }

    open(){
        this._config.coverImg.src = this._dataImg.link;
        this._config.coverImg.alt = `Изображение места ${this._dataImg.name}`;
        this._config.coverText.textContent = this._dataImg.name;
        super.open();
        super.setEventListeners();
    }
}