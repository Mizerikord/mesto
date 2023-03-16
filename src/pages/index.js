import './index.css'
import { config } from './utils/constants.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { Api } from '../components/Api.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

//Глобальная переменная для хранения id текущего юзера
let currentUserId = '';

//Создаем класс редактора аватара
const popupAvatarEdit = new PopupWithForm({
  popupSelector: config.popupAvatar,
  handleFormSubmit: (inputsData) => {
    userData.setUserInfo(inputsData);
  }
})

//Открываем попап аватара
config.profileAvatarContainer.addEventListener('click', () => {
  popupAvatarEdit.open();
})

//Открываем попап профиля
const popupProfileEdit = new PopupWithForm({
  popupSelector: config.popupProfile,
  handleFormSubmit: (inputsData) => {
    api.patchProfile(inputsData)
      .then((patchUser) => {
        userData.setUserInfo(patchUser);
        popupProfileEdit.close();
      })
      .catch((err) => { console.log(err) });
  }
})

//обрабатываем данные пользвоателя
const userData = new UserInfo(config.profileName, config.profileAbout);
config.profileEditor.addEventListener('click', () => {
  popupProfileEdit.open();
  const data = userData.getUserInfo();
  config.popupName.value = data.name;
  config.popupAbout.value = data.about;
}
);
popupProfileEdit.setEventListeners();

//Добавление карточки
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', '91b42385-e6f0-450f-ba44-00fb0fcb8aac');
//Подгружаем карточки и данные пользователя с сервера
Promise.all([
  api.getInitialCards(),
  api.getUserData()
])
  .then(([cards, user]) => {
    currentUserId = user._id;
    cardList.renderCards(cards)
  })
  .catch((err) => { console.log(err) });

//Редактируем данные пользователя
api.getUserData()
  .then((userInfo) => {
    const inputsData = { name: userInfo.name, about: userInfo.about };
    userData.setUserInfo(inputsData);
    config.profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => { console.log(err) });

//Редактирвоание Аватара
const popupAvatarEditor = new PopupWithForm({
  popupSelector: config.popupAvatar,
  handleFormSubmit: () => {
    api.patchAvatarUser(config.avatarInputLink.value)
      .then((res) => {
        config.profileAvatar.src = res.avatar;
        popupAvatarEdit.close();
      })
      .catch((err) => { console.log(err) });
  }
})
popupAvatarEditor.setEventListeners();

//Создание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, currentUserId, {
    handleCardClick: (cardData) => { popupOpenCover.open(cardData) },
    handleDeleteCard: (currentCard, cardToDelete) => {
      popupCardDelete.setSuccessHandler(currentCard, cardToDelete);
      popupCardDelete.open();
    },
    //Добавляем логику лайка
    handleLikeClick: (likeElement, likeActive, templateLike, cardData) => {
      if (likeElement.classList.contains(likeActive)) {
        api.deleteLikeCard(cardData)
          .then((card) => {
            if (card.likes.length === 0) {
              templateLike.textContent = '';
            }
            else {
              templateLike.textContent = card.likes.length;
            }
          })
          .catch((err) => { console.log(err) })
      }
      else {
        api.makeLikeCard(cardData)
          .then((card) => { templateLike.textContent = card.likes.length })
          .catch((err) => { console.log(err) })
      }
    }
  }, config);
  return card.generateCard();
}

//Рендер карточки
const cardList = new Section({
  renderer: createCard,
},
  config.cardPlace
);

//Создание экземпляра класса добавления карточки
const popupInsertCard = new PopupWithForm({
  popupSelector: config.popupInsert,
  handleFormSubmit: (inputsData) => {
    api.postNewCard(inputsData)
      .then((res) => {
        cardList.renderCards([res]);
        popupInsertCard.close();
      })
      .catch((err) => { console.log(err) })
  }
})

popupInsertCard.setEventListeners();

//Эклемпляр класса удаления карточки

const popupCardDelete = new PopupWithConfirmation({
  popupSelector: config.popupDeleteCard,
  handleFormSubmit: (cardData, currentCard) => {
    api.deleteMyCard(cardData)
      .then(() => {
        currentCard.remove();
        popupCardDelete.close();
      })
      .catch((err) => { console.log(err); })
  }
});

popupCardDelete.setEventListeners();

config.profileInsert.addEventListener('click', () => {
  popupInsertCard.open();
})

const popupOpenCover = new PopupWithImage({ popupSelector: config.popupCover });
popupOpenCover.setEventListeners();

//Запуск валидации
const checkItems = [config.profileForm, config.formAddCard, config.formAvatarEditor];
checkItems.forEach((elem) => {
  const validatorForms = new FormValidator(config, elem);
  validatorForms.enableValidation();
});