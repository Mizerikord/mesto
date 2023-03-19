import Popup from './Popup.js'

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._submitForm = this._popupCurrent.querySelector(this._config.formSelector);
        this._submitBtn = this._submitForm.querySelector(this._config.submitButtonSelector);
    }

    setSuccessHandler(itemEData, itemElement, setDeleteItem) {
        //Трансляция данных в сабмит и карточки для удаления
        this._setDeleteItem = setDeleteItem;
        this._itemEData = itemEData;
        this._itemEElement = itemElement;
      }

    setEventListeners() {
        super.setEventListeners();
        this._submitForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit( this._itemEData, this._itemEElement, this._setDeleteItem);
            this._submitBtn.value = this._submitBtn.dataset.alterText;
        })
    }

    resetPreloadBtn(){
        this._submitBtn.value = this._submitBtn.dataset.default;
    }

    close() {
        super.close();
    }

}