const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__elem',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__elem_type_error',
    errorClass: 'form__elem-error_active'
}

function showInputError(errorElement, inputElement, errorMsg) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

function isValid(anyForm, inputElement) {
    const errorElement = anyForm.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(errorElement, inputElement);
    }
}

const setEventListeners = (anyForm) => {
    const inputList = Array.from(anyForm.querySelectorAll(validationConfig.inputSelector));
    const submitBtn = anyForm.querySelector(validationConfig.submitButtonSelector);
    toggleButton(inputList, submitBtn);
    inputList.forEach((anyInput) => {
        anyInput.addEventListener('input', () => {
            isValid(anyForm, anyInput);
            toggleButton(inputList, submitBtn);
        });
    });
}

function enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((anyForm) => {
        anyForm.addEventListener('submit', function () {
            deactivateBtn(anyForm);
        });
        setEventListeners(anyForm);
    });
};

enableValidation(validationConfig);

function checkValid(inputList) {
    return inputList.some((inputElem) => {
        return !inputElem.validity.valid;
    });
};

function toggleButton(inputList, buttonElement) {
    if (checkValid(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    };
};

function deactivateBtn(anyForm) {
    const submitBtn = anyForm.querySelector(validationConfig.submitButtonSelector);
    submitBtn.classList.add(validationConfig.inactiveButtonClass);
    submitBtn.setAttribute("disabled", "disabled");
}