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

//Открываем попап профиля
const popupProfileEdit = new PopupWithForm({
  popupSelector: config.popupProfile,
  handleFormSubmit: (inputsData) => {
    api.patchProfile(inputsData)
      .then((patchUser) => {
        userData.setUserInfo(patchUser);
      })
      .catch((err) => { console.log(err) })
      .finally(() => { popupProfileEdit.close() })
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
  .then(([cards, userInfo]) => {
    currentUserId = userInfo._id;
    const inputsData = { name: userInfo.name, about: userInfo.about, userAvatar: userInfo.avatar };
    userData.setUserInfo(inputsData);
    userData.setUserAvatar(config.profileAvatar, inputsData.userAvatar);
    const cardOrder = cards.reverse();
    cardList.renderCards(cardOrder)
  })
  .catch((err) => { console.log(err) });

//Редактирвоание Аватара
const popupAvatarEditor = new PopupWithForm({
  popupSelector: config.popupAvatar,
  handleFormSubmit: () => {
    api.patchAvatarUser(config.avatarInputLink.value)
      .then((res) => {
        userData.setUserAvatar(config.profileAvatar, res.avatar);
      })
      .catch((err) => { console.log(err) })
      .finally(() => { popupAvatarEditor.close(); })
  }
})
popupAvatarEditor.setEventListeners();

//Открываем попап аватара
config.profileAvatarContainer.addEventListener('click', () => {
  popupAvatarEditor.open();
})


//Создание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, currentUserId, {
    handleCardClick: (cardData) => { popupOpenCover.open(cardData) },
    handleDeleteCard: (cardData, cardElement, setDeleteCard) => {
      popupCardDelete.setSuccessHandler(cardData, cardElement, setDeleteCard);
      popupCardDelete.open();
    },
    //Добавляем логику лайка
    handleLikeClick: (likeElement, likeActive, templateLike, cardData) => {
      function likeToggle() { likeElement.classList.toggle(likeActive) };
      if (likeElement.classList.contains(likeActive)) {
        api.deleteLikeCard(cardData)
          .then((card) => {
            likeToggle();
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
          .then((card) => {
            likeToggle();
            templateLike.textContent = card.likes.length
          })
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
      })
      .catch((err) => { console.log(err) })
      .finally(() => { popupInsertCard.close() })
  }
})

popupInsertCard.setEventListeners();

//Эклемпляр класса удаления карточки

const popupCardDelete = new PopupWithConfirmation({
  popupSelector: config.popupDeleteCard,
  handleFormSubmit: (cardData, cardElement, setDeleteCard) => {
    api.deleteMyCard(cardData)
      .then(() => {
        setDeleteCard(cardElement);
      })
      .catch((err) => { console.log(err) })
      .finally(() => { popupCardDelete.close() })
  }
});

popupCardDelete.setEventListeners();

config.profileInsert.addEventListener('click', () => {
  popupInsertCard.open();
})

const popupOpenCover = new PopupWithImage({ popupSelector: config.popupCover });
popupOpenCover.setEventListeners();

//Запуск валидации

const validatorProfileForm = new FormValidator(config, config.profileForm);
validatorProfileForm.enableValidation();
const validatorAddCardForm = new FormValidator(config, config.formAddCard);
validatorAddCardForm.enableValidation();
const validatorChangeAvatarForm = new FormValidator(config, config.formAvatarEditor);
validatorChangeAvatarForm.enableValidation();