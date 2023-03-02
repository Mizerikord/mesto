import './index.css';
import { initialCards, config } from './utils/constants.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'

//Открываем попап профиля
const sampleEditor = new PopupWithForm({
  popupSelector: config.popupProfile,
  handleFormSubmit: (inputsData) => {
    userData.setUserInfo(inputsData);
  }
})

const userData = new UserInfo(config.profileName, config.profileTheme);
config.profileEditor.addEventListener('click', () => {
  sampleEditor.open();
  const data = userData.getUserInfo();
  config.popupName.value = data.name;
  config.popupTheme.value = data.theme;
}
);

sampleEditor.setEventListeners();

//Открываем попап карточки
config.profileInsert.addEventListener('click', () => {
  sampleInsert.open();
}
);

//Добавление карточки
const sampleInsert = new PopupWithForm({
  popupSelector: config.popupInsert, handleFormSubmit: (inputsData) => {
    const [title, src] = inputsData;
    const item = [{ name: title.value, link: src.value }];
    const newCard = new Section({
      items: item,
      renderer: (item) => {
        const openCover = new PopupWithImage(item, config);
        const card = new Card(item, config, {
          handleCardClick: (cardImageElement) => {
            cardImageElement.addEventListener('click', () => {
              openCover.open();
            });
          }
        });
        return card.generateCard();
      }
    },
      config.cardPlace
    )
    newCard.renderCards();
  }
})
sampleInsert.setEventListeners();

//Запуск валидации
const checkItems = [config.profileForm, config.formAddCard];
checkItems.forEach((elem) => {
  const validatorForms = new FormValidator(config, elem);
  validatorForms.enableValidation();
});

//Заливаем базу карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, config, {
      handleCardClick: (cardImageElement) => {
        const openCover = new PopupWithImage(item, config)
        cardImageElement.addEventListener('click', () => {
          openCover.open();
        });
      }
    });
    return card.generateCard();
  }
},
  config.cardPlace
)

cardList.renderCards();

