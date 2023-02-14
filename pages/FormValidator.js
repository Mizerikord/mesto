import { config } from './constants.js'

export class FormValidator {
    constructor(config, checkForm) {
        this._config = config;
        this._checkForm = checkForm;
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

    _deactivateBtn(checkForm) {
        const submitBtn = checkForm.querySelector(this._config.submitButtonSelector);
        submitBtn.classList.add(this._config.inactiveButtonClass);
        submitBtn.setAttribute("disabled", "disabled");
    };

    _setEventListeners = (checkForm) => {
        const inputList = Array.from(checkForm.querySelectorAll(this._config.inputSelector));
        const submitBtn = checkForm.querySelector(this._config.submitButtonSelector);
        this._toggleButton(inputList, submitBtn);
        inputList.forEach((anyInput) => {
            anyInput.addEventListener('input', () => {
                this._isValid(checkForm, anyInput);
                this._toggleButton(inputList, submitBtn);
            });
        });
    };

    _isValid(checkForm, inputElement) {
        const errorElement = checkForm.querySelector(`.${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(errorElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(errorElement, inputElement);
        }
    };

    _toggleButton(inputList, buttonElement) {
        if (this._checkValid(inputList)) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.setAttribute("disabled", "disabled");
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        };
    };

    _checkValid(inputList) {
        return inputList.some((inputElem) => {
            return !inputElem.validity.valid;
        });
    };

    _startValid() {
        this._checkForm.addEventListener('submit', () => {
            this._deactivateBtn(this._checkForm);
        });
        this._setEventListeners(this._checkForm);
    };

    enableValidation() {
        this._startValid();
    };
}