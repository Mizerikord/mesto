import { config } from '../constants.js'

export function openPopup(elem) {
    elem.classList.add(config.popupOpened);
    document.addEventListener('keyup', addEscFunction);
}

export function closePopup(elem) {
    elem.classList.remove(config.popupOpened);
    document.removeEventListener('keyup', addEscFunction);
}

export function addEscFunction(event) {
    event.preventDefault();
    const keyCodeEsc = 27;
    if (event.key === 'Escape' || event.keyCode === keyCodeEsc) {
        const currentPopup = document.querySelector(`.${config.popupOpened}`)
        closePopup(currentPopup);
    }
};