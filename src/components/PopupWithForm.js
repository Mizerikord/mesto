import Popup from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._inputsList = this._popupCurrent.querySelectorAll(this._config.inputSelector);
        this._submitForm = this._popupCurrent.querySelector(this._config.formSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        //Получаем содержимое инпутов
        const inputsData = {};
        this._inputsList.forEach((input) => {
            inputsData[input.name] = input.value;
        })
        return inputsData
    }

    setEventListeners() {
        super.setEventListeners();
        //событие сабмита
        this._submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        this._submitForm.reset();
        super.close();
    }
}