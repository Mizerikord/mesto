import Popup from './Popup.js'

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._submitForm = this._popupCurrent.querySelector(this._config.formSelector);
        this._submitBtn = this._submitForm.querySelector(this._config.submitButtonSelector);
    }

    setSuccessHandler(cardData, cardElement, setDeleteCard) {
        //Трансляция данных в сабмит и карточки для удаления
        this._setDeleteCard = setDeleteCard;
        this._cardData = cardData;
        this._cardElement = cardElement;
      }

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit( this._cardData, this._cardElement, this._setDeleteCard);
            this._submitBtn.value = this._submitBtn.dataset.alterText;
        })
    }

    close() {
        this._submitBtn.value = this._submitBtn.dataset.default;
        super.close();
    }

}