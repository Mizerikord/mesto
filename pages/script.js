const popupProfile = document.querySelector('.popup_profile');
const popupInsert = document.querySelector('.popup_insert');
const popupCover = document.querySelector('.popup_cover');
const footer = document.querySelector('.footer');
const profileName = document.querySelector('.profile__name');
const profileTheme = document.querySelector('.profile__theme');
const popupName = popupProfile.querySelector('.form__elem_input_name');
const popupTheme = popupProfile.querySelector('.form__elem_input_theme');
const designation = popupInsert.querySelector('.form__elem_input_name');
const link = popupInsert.querySelector('.form__elem_input_theme');
const cardPlace = document.querySelector('.cards__list');
const card = document.querySelector('#card').content;
const coverImg = popupCover.querySelector('.popup__cover-img');
const coverText = popupCover.querySelector('.popup__text');
const closeButtons = document.querySelectorAll('.popup__disable');
const popups = document.querySelectorAll('.popup');
const profileForm = document.forms.profile;
const formAddCard = document.forms.insert;
const profileEditor = document.querySelector('.profile__editor');
const profileInsert = document.querySelector('.profile__insert');

//открытиепопа-па
function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keyup', addEscFunction);
}

//закрытие попапа
function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keyup', addEscFunction);
}

function addEscFunction(event) {
  event.preventDefault();
  const keyCodeEsc = 27;
  if (event.key === 'Escape' || event.keyCode === keyCodeEsc) {
    const currentPopup = document.querySelector('.popup_opened')
    closePopup(currentPopup);
  }
};

//Открыть редактор профиля
profileEditor.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupTheme.value = profileTheme.textContent;
  openPopup(popupProfile);
});

//Обработать форму профиля
function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileTheme.textContent = popupTheme.value;
  closePopup(popupProfile);
}

profileForm.addEventListener('submit', submitEditProfileForm);

function addCardSbmt(event) {
  event.preventDefault();
  renderCards(designation.value, link.value);
  event.target.reset();
  closePopup(popupInsert);
}
formAddCard.addEventListener('submit', addCardSbmt);

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
profileInsert.addEventListener('click', () => openPopup(popupInsert));

closeButtons.forEach((button) => {
  const nearestPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(nearestPopup));
});

popups.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    closePopup(event.target);
  });
})