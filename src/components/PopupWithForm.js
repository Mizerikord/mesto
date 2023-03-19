import Popup from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._inputsList = this._popupCurrent.querySelectorAll(this._config.inputSelector);
        this._submitForm = this._popupCurrent.querySelector(this._config.formSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitBtn = this._submitForm.querySelector(this._config.submitButtonSelector);
        console.log();
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
        this._submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._submitBtn.value = this._submitBtn.dataset.alterText;
        })
    }

    resetPreloadBtn(){
        this._submitBtn.value = this._submitBtn.dataset.default;
    }

    close() {
        this._submitForm.reset();
        super.close();
    }
}