export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const config = {
    profileForm: document.forms.profile,
    formAddCard: document.forms.insert,
    formSelector: document.querySelectorAll('.form'),
    popupProfile: document.querySelector('.popup_profile'),
    popupInsert: document.querySelector('.popup_insert'),
    popupCover: document.querySelector('.popup_cover'),
    popupOpened: 'popup_opened',
    popups: document.querySelectorAll('.popup'),
    profileEditor: document.querySelector('.profile__editor'),
    profileInsert: document.querySelector('.profile__insert'),
    profileName: document.querySelector('.profile__name'),
    profileTheme: document.querySelector('.profile__theme'),
    popupName: document.querySelector('.form__elem_input_name'),
    popupTheme: document.querySelector('.form__elem_input_theme'),
    link: document.querySelector('.popup_insert').querySelector('.form__elem_input_theme'),
    cardPlace: document.querySelector('.cards__list'),
    coverImg: document.querySelector('.popup_cover').querySelector('.popup__cover-img'),
    coverText: document.querySelector('.popup_cover').querySelector('.popup__text'),
    card: document.querySelector('#card'),
    cardLike: '.card__like',
    cardLikeActive: 'card__like_active',
    cardImage: '.card__img',
    cardTitle: '.card__title',
    cardDelete: '.card__delete',
    closeButtons: document.querySelectorAll('.popup__disable'),
    inputSelector: '.form__elem',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__elem_type_error',
    errorClass: 'form__elem-error_active'
}