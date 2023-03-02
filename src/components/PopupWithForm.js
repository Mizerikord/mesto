import Popup from './Popup.js'
import { config } from '../pages/utils/constants.js'

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._selector = popupSelector;
        this._submitFormButton = this._selector.querySelector(config.formSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        //берем инпуты
        return this._selector.querySelectorAll(config.inputSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        //событие сабмита
        this._submitFormButton.addEventListener('submit', (event) => {
              event.preventDefault();
              this._handleFormSubmit(this._getInputValues());
              this.close();
            })
        }

    close() {
        this._submitFormButton.reset();
        super.close();
    }
}