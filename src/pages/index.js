import './index.css';
import { initialCards, config } from './utils/constants.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'

//Открываем попап профиля
const popupProfileEdit = new PopupWithForm({
  popupSelector: config.popupProfile,
  handleFormSubmit: (inputsData) => {
    userData.setUserInfo(inputsData);
  }
})

//обрабатываем данные пользвоателя
const userData = new UserInfo(config.profileName, config.profileTheme);
config.profileEditor.addEventListener('click', () => {
  popupProfileEdit.open();
  const data = userData.getUserInfo();
  config.popupName.value = data.name;
  config.popupTheme.value = data.theme;
}
);
popupProfileEdit.setEventListeners();

//Добавление карточки

const createCard = (cardData) => {
  const card = new Card(cardData, { handleCardClick: (cardData) => { popupOpenCover.open(cardData) } }, config);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: createCard,
},
  config.cardPlace
);

cardList.renderCards();

const popupInsertCard = new PopupWithForm({
  popupSelector: config.popupInsert,
  handleFormSubmit: (inputsData) => {
    const card = createCard(inputsData);
    cardList.addItem(card);
  }
})

popupInsertCard.setEventListeners();

config.profileInsert.addEventListener('click', () => {
  popupInsertCard.open();
})

const popupOpenCover = new PopupWithImage({ popupSelector: config.popupCover });

//Запуск валидации
const checkItems = [config.profileForm, config.formAddCard];
checkItems.forEach((elem) => {
  const validatorForms = new FormValidator(config, elem);
  validatorForms.enableValidation();
});