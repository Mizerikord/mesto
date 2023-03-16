import Popup from './Popup.js'

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._submitForm = this._popupCurrent.querySelector(this._config.formSelector);
        this._successHandler = '';
        this._cardToDelete = '';
        this._submitBtn = this._submitForm.querySelector(this._config.submitButtonSelector);
    }

    setSuccessHandler(currentCard, cardToDelete) {
        //Трансляция данных в сабмит и карточки для удаления
        this._successHandler = currentCard;
        this._cardToDelete = cardToDelete;
      }

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._successHandler, this._cardToDelete);
            this._successHandler = '';
            this._cardToDelete = '';
            this._submitBtn.value = this._submitBtn.dataset.alterText;
        })
    }

    close() {
        this._submitBtn.value = this._submitBtn.dataset.default;
        super.close();
    }

}