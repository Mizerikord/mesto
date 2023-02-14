import { initialCards, config } from './constants.js'
import { Card } from './card.js'
import { FormValidator } from './FormValidator.js'

initialCards.forEach((elem) => {
  const card = new Card(elem, config);
  const cardElem = card.generateCard();
  deployImgOverlay(elem, cardElem);
  config.cardPlace.prepend(cardElem);
})

//открытиепопа-па
function openPopup(elem) {
  elem.classList.add(config.popupOpened);
  document.addEventListener('keyup', addEscFunction);
}

//закрытие попапа
function closePopup(elem) {
  elem.classList.remove(config.popupOpened);
  document.removeEventListener('keyup', addEscFunction);
}

function addEscFunction(event) {
  event.preventDefault();
  const keyCodeEsc = 27;
  if (event.key === 'Escape' || event.keyCode === keyCodeEsc) {
    const currentPopup = document.querySelector(`.${config.popupOpened}`)
    closePopup(currentPopup);
  }
};

//Открыть редактор профиля
config.profileEditor.addEventListener('click', () => {
  config.popupName.value = config.profileName.textContent;
  config.popupTheme.value = config.profileTheme.textContent;
  openPopup(config.popupProfile);
  const validator = new FormValidator(config, config.profileForm);
  validator.enableValidation();
});

//Обработать форму профиля
function submitEditProfileForm(event) {
  event.preventDefault();
  config.profileName.textContent = config.popupName.value;
  config.profileTheme.textContent = config.popupTheme.value;
  closePopup(config.popupProfile);
}

config.profileForm.addEventListener('submit', submitEditProfileForm);

function addCardSbmt(event) {
  event.preventDefault();
  renderCards(config.formAddCard.title.value, config.formAddCard.url.value);
  event.target.reset();
  closePopup(config.popupInsert);
}
config.formAddCard.addEventListener('submit', addCardSbmt);

//Отрисовываем новую карточку
function createCard(nameValue, linkValue) {
  const element = {};
  element.name = nameValue;
  element.link = linkValue;
  const newCard = new Card(element, config);
  const newCardElem = newCard.generateCard();
  deployImgOverlay(element, newCardElem);
  return newCardElem;
}

//развернуть попап места
function deployImgOverlay(cardData, newCardElem) {
  newCardElem.querySelector(config.cardImage).addEventListener('click', () => {
    config.coverImg.src = cardData.link;
    config.coverImg.alt = `Изображение места ${cardData.name}`;
    config.coverText.textContent = cardData.name;
    openPopup(config.popupCover);
  });
}

function renderCards(nameValue, linkValue) {
  const cardElem = createCard(nameValue, linkValue);
  config.cardPlace.prepend(cardElem);
}

//Добавление новой карточки
config.profileInsert.addEventListener('click', () => {
  openPopup(config.popupInsert)
});
const validator = new FormValidator(config, config.formAddCard);
validator.enableValidation();
config.closeButtons.forEach((button) => {
  const nearestPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(nearestPopup));
});

config.popups.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    closePopup(event.target);
  });
})
