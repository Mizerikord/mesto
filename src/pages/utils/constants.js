export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://s.mediasalt.ru/cache/content/data/images/262/262203/original.jpg'
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
        link: 'https://vsegda-pomnim.com/uploads/posts/2022-03/1648753820_2-vsegda-pomnim-com-p-ozero-baikal-zima-foto-2.jpg'
    }
];

export const config = {
    profileForm: document.forms.profile,
    formAddCard: document.forms.insert,
    formSelector: '.form',
    popupProfile: '.popup_profile',
    popupInsert: '.popup_insert',
    popupCover: '.popup_cover',
    popupOpened: 'popup_opened',
    popups: '.popup',
    profileEditor: document.querySelector('.profile__editor'),
    profileInsert: document.querySelector('.profile__insert'),
    profileName: '.profile__name',
    profileTheme: '.profile__theme',
    popupName: document.querySelector('.form__elem_input_name'),
    popupTheme: document.querySelector('.form__elem_input_theme'),
    cardPlace: '.cards__list',
    coverImg: '.popup__cover-img',
    coverText: '.popup__text',
    card: document.querySelector('#card'),
    cardLike: '.card__like',
    cardLikeActive: 'card__like_active',
    cardImage: '.card__img',
    cardTitle: '.card__title',
    cardDelete: '.card__delete',
    closeButtons: '.popup__disable',
    inputSelector: '.form__elem',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__elem_type_error',
    errorClass: 'form__elem-error_active',
}