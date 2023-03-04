export class FormValidator {
    constructor(config, checkForm) {
        this._config = config;
        this._checkForm = checkForm;
        this._inputList = Array.from(checkForm.querySelectorAll(this._config.inputSelector));
        this._submitBtn = this._checkForm.querySelector(this._config.submitButtonSelector);
    };

    _showInputError(errorElement, inputElement, errorMsg) {
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMsg;
        errorElement.classList.add(this._config.errorClass);
    };

    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _deactivateBtn() {
        this._submitBtn.classList.add(this._config.inactiveButtonClass);
        this._submitBtn.setAttribute("disabled", "disabled");
    };

    _setEventListeners = () => {
        this._toggleButton();
        this._inputList.forEach((anyInput) => {
            anyInput.addEventListener('input', () => {
                this._isValid(anyInput);
                this._toggleButton();
            });
        });
    };

    _isValid(inputElement) {
        const errorElement = this._checkForm.querySelector(`.${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(errorElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(errorElement, inputElement);
        }
    };

    _toggleButton() {
        if (this._checkValid()) {
            this._deactivateBtn();
        } else {
            this._submitBtn.classList.remove(this._config.inactiveButtonClass);
            this._submitBtn.removeAttribute("disabled");
        };
    };

    _checkValid() {
        return this._inputList.some((inputElem) => {
            return !inputElem.validity.valid;
        });
    };

    _startValid() {
        this._checkForm.addEventListener('reset', () => {
            this._deactivateBtn();
        });
        this._setEventListeners();
    };

    enableValidation() {
        this._startValid();
    };
}