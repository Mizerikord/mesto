function showInputError(errorElement, inputElement, errorMsg, data) {
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.add(data.errorClass);
};

function hideInputError(errorElement, inputElement, data) {
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = '';
};

function isValid(anyForm, inputElement, data) {
    const errorElement = anyForm.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, data);
    } else {
        hideInputError(errorElement, inputElement, data);
    }
}

const setEventListeners = (anyForm, data) => {
    const inputList = Array.from(anyForm.querySelectorAll(data.inputSelector));
    const submitBtn = anyForm.querySelector(data.submitButtonSelector);
    toggleButton(inputList, submitBtn, data);
    inputList.forEach((anyInput) => {
        anyInput.addEventListener('input', () => {
            isValid(anyForm, anyInput, data);
            toggleButton(inputList, submitBtn, data);
        });
    });
}

function enableValidation(data) {
    const forms = Array.from(document.querySelectorAll(data.formSelector));
    forms.forEach((anyForm) => {
        anyForm.addEventListener('submit', function () {
            deactivateBtn(anyForm, data);
        });
        setEventListeners(anyForm, data);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__elem',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__elem_type_error',
    errorClass: 'form__elem-error_active'
});

function checkValid(inputList) {
    return inputList.some((inputElem) => {
        return !inputElem.validity.valid;
    });
};

function toggleButton(inputList, buttonElement, data) {
    if (checkValid(inputList)) {
        buttonElement.classList.add(data.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(data.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    };
};

function deactivateBtn(anyForm, data) {
    const submitBtn = anyForm.querySelector(data.submitButtonSelector);
    submitBtn.classList.add(data.submitButtonSelector);
    submitBtn.setAttribute("disabled", "disabled");
}