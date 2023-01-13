const initialCards = [
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

const popupProfile = document.querySelector('.popup_profile');
const popupInsert = document.querySelector('.popup_insert');
const popupCover = document.querySelector('.popup_cover');
const footer = document.querySelector('.footer');
const profileName = document.querySelector('.profile__name');
const profileTheme = document.querySelector('.profile__theme');
const popupName = popupProfile.querySelector('.popup__elem_input_name');
const popupTheme = popupProfile.querySelector('.popup__elem_input_theme');
const name = popupInsert.querySelector('.popup__elem_input_name');
const link = popupInsert.querySelector('.popup__elem_input_theme');
const cardPlace = document.querySelector('.cards__list');
const card = document.querySelector('#card').content;
const coverImg = popupCover.querySelector('.popup__cover-img');
const coverText = popupCover.querySelector('.popup__text');
const closeButtons = document.querySelectorAll('.popup__disable');
const profileForm = document.forms.profile;
const insertForm = document.forms.insert;

//открытие-закрытие попа-па
function openPopup(elem) {
  elem.classList.add('popup_opened');
}
function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

//Открыть редактор профиля
document.querySelector('.profile__editor').addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupTheme.value = profileTheme.textContent;
  openPopup(popupProfile);
});

//Обработать форму профиля
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (popupName.value || popupTheme.value !== '') {
    profileName.textContent = popupName.value;
    profileTheme.textContent = popupTheme.value;
    closePopup(popupProfile);
  }
});

//Отрисовываем новую карточку
function createCard(nameValue, linkValue) {
  const cardElem = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElem.querySelector('.card__img');
  cardElem.querySelector('.card__title').textContent = nameValue;
  cardImage.src = linkValue;
  cardImage.alt = `Изображение места ${nameValue}`;
  //ставим лайк
  cardElem.querySelector('.card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like_active');
  });
  //удаление карточки
  cardElem.querySelector('.card__delete').addEventListener('click', function (event) {
    event.target.closest('.card').remove();
  });
  //Попап во весь экран
  cardImage.addEventListener('click', () => {
    coverImg.src = linkValue;
    coverImg.alt = `Изображение места ${nameValue}`;
    coverText.textContent = nameValue;
    openPopup(popupCover);
  });
  return cardElem
}

function renderCards(nameValue, linkValue) {
  const cardElem = createCard(nameValue, linkValue);
  cardPlace.prepend(cardElem);
}

//Выводим карточки из массива
for (elem of initialCards) {
  renderCards(elem.name, elem.link);
}

//Добавление новой карточки
document.querySelector('.profile__insert').addEventListener('click', () => openPopup(popupInsert));

insertForm.addEventListener('submit', function (event) {
  event.preventDefault();
  renderCards(name.value, link.value);
  event.target.reset();
  closePopup(popupInsert);
});

closeButtons.forEach((close) => {
  const nearestPopup = close.closest('.popup');
  close.addEventListener('click', () => closePopup(nearestPopup));
});