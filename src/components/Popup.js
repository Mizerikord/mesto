import { config } from '../pages/utils/constants.js'

export default class Popup {
    constructor({ popupSelector }) {
        this._popupCurrent = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._config = config;
        this._coverImgSelector = this._config.coverImg;
        this._coverTextSelector = this._config.coverText
    }

    _handleEscClose(event) {
        event.preventDefault();
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupCurrent.classList.add(this._config.popupOpened);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupCurrent.classList.remove(this._config.popupOpened);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popupCurrent.querySelector(this._config.closeButtons).addEventListener('click', () => this.close());
        this._popupCurrent.addEventListener('click', (event) => {
            if (event.target === this._popupCurrent) {
                this.close();
            }
        })
    }
}