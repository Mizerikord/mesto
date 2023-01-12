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

//открытие-закрытие попа-па
function openPopup(elem) {
  elem.classList.add('popup_opened');
}
function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

document.querySelector('.profile__editor').addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupTheme.value = profileTheme.textContent;
  openPopup(popupProfile);
});

popupProfile.querySelector('.popup__form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (popupName.value || popupTheme.value !== '') {
    profileName.textContent = popupName.value;
    profileTheme.textContent = popupTheme.value;
    event.target.reset();
    closePopup(popupProfile);
  }
});

popupProfile.querySelector('.popup__disable').addEventListener('click', () => closePopup(popupProfile));

//Отрисовываем новую карточку

function createCard(nameValue, linkValue) {
  const cardElem = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElem.querySelector('.card__img');
  cardElem.querySelector('.card__title').textContent = nameValue;
  cardImage.src = linkValue;
  return cardElem
}

function renderCards(nameValue, linkValue) {
  const cardElem = createCard(nameValue, linkValue);
  //ставим лайк
  cardElem.querySelector('.card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like_active');
  });
  //удаление карточки
  cardElem.querySelector('.card__delete').addEventListener('click', function (event) {
    event.target.closest('.card').remove();
  });
  //Попап во весь экран
  cardElem.querySelector('.card__img').addEventListener('click', () => {
    coverImg.src = linkValue;
    //текст под картинкой-попапом
    const text = nameValue;
    coverText.textContent = text;
    openPopup(popupCover);
  });

  cardPlace.prepend(cardElem);
}

//Выводим карточки из массива

for (elem of initialCards) {
  renderCards(elem.name, elem.link);
}

//Добавление новой карточки
document.querySelector('.profile__insert').addEventListener('click', () => openPopup(popupInsert));

popupInsert.querySelector('.popup__form').addEventListener('submit', function (event) {
  event.preventDefault();
  renderCards(name.value, link.value);
  event.target.reset();
  closePopup(popupInsert);
});

popupInsert.querySelector('.popup__disable').addEventListener('click', () => closePopup(popupInsert));

popupCover.querySelector('.popup__disable').addEventListener('click', () => closePopup(popupCover));




