import { config } from '../pages/utils/constants.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    _handleEscClose(event) {
        event.preventDefault();
        const keyCodeEsc = 27;
        if (event.key === 'Escape' || event.keyCode === keyCodeEsc) {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add(config.popupOpened);
        document.addEventListener('keyup', this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove(config.popupOpened);
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
    }

    setEventListeners() {
        this._popupSelector.querySelector(config.closeButtons).addEventListener('click', () => this.close());
        this._popupSelector.addEventListener('click', (event) => {
            if (event.target === this._popupSelector) {
                this.close();
            }
        })
    }
}