import { initialCards, config } from './constants.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import * as utils from './utils/utils.js'

initialCards.forEach((elem) => {
  config.cardPlace.prepend(addCard(elem));
})

function addCard(elem) {
  const card = new Card(elem, config);
  return card.generateCard();
}

//Открыть редактор профиля
config.profileEditor.addEventListener('click', () => {
  config.popupName.value = config.profileName.textContent;
  config.popupTheme.value = config.profileTheme.textContent;
  utils.openPopup(config.popupProfile);
});

//Обработать форму профиля
function submitEditProfileForm(event) {
  event.preventDefault();
  config.profileName.textContent = config.popupName.value;
  config.profileTheme.textContent = config.popupTheme.value;
  utils.closePopup(config.popupProfile);
}

config.profileForm.addEventListener('submit', submitEditProfileForm);

function addCardSbmt(event) {
  event.preventDefault();
  renderCards(config.formAddCard.title.value, config.formAddCard.url.value);
  event.target.reset();
  utils.closePopup(config.popupInsert);
}
config.formAddCard.addEventListener('submit', addCardSbmt);

//Отрисовываем новую карточку
function createCard(nameValue, linkValue) {
  const element = {};
  element.name = nameValue;
  element.link = linkValue;
  return addCard(element);
}

function renderCards(nameValue, linkValue) {
  const cardElem = createCard(nameValue, linkValue);
  config.cardPlace.prepend(cardElem);
}

//Добавление новой карточки
config.profileInsert.addEventListener('click', () => {
  utils.openPopup(config.popupInsert);
});
config.closeButtons.forEach((button) => {
  const nearestPopup = button.closest('.popup');
  button.addEventListener('click', () => utils.closePopup(nearestPopup));
});

config.popups.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    utils.closePopup(event.target);
  });
})

const checkItems = [config.profileForm, config.formAddCard];
checkItems.forEach((elem) => {
  const validatorForms = new FormValidator(config, elem);
  validatorForms.enableValidation();
});