let initialCards = [
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

//Изменить профиль
const popupId = document.querySelector('#popup-profile').content;
const footer = document.querySelector('.footer');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileTheme = document.querySelector('.profile__theme');

//открытие-закрытие попа-па
function openPopup(){
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}
function closePopup(){
  const popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
  setTimeout(()=>popup.remove(), 1000);
}
const popupElem = popupId.querySelector('.popup').cloneNode(true);
const popupName = popupElem.querySelector('.popup__elem_input_name');
const popupTheme = popupElem.querySelector('.popup__elem_input_theme');
    document.querySelector('.profile__editor').addEventListener('click', function(){
    footer.after(popupElem);
    popupName.value = profileName.textContent;
    popupTheme.value = profileTheme.textContent;
    openPopup();
    popupElem.querySelector('.popup__form').addEventListener('submit', function(event){
      event.preventDefault();
      if(popupName.value || popupTheme.value !== ''){
      profileName.textContent = popupName.value;
      profileTheme.textContent = popupTheme.value;
      closePopup();
      }
    });
    popupElem.querySelector('.popup__disable').addEventListener('click', closePopup);
});

const card = document.querySelector('#card').content;
const cardPlace = document.querySelector('.cards__list');

//Выводим массив карточки из массива
for(elem of initialCards){
  const cardElem = card.querySelector('.card').cloneNode(true);
  cardElem.querySelector('.card__img').src = elem.link;
  cardElem.querySelector('.card__title').textContent = elem.name;
  cardPlace.prepend(cardElem);
  }
//Отрисовываем новую карточку
function renderCards(nameValue, linkValue){
    const cardElem = card.querySelector('.card').cloneNode(true);
    cardElem.querySelector('.card__title').textContent = nameValue;
    cardElem.querySelector('.card__img').src = linkValue;
    cardPlace.prepend(cardElem);
}

const popupIdInsert = document.querySelector('#popup-insert').content; //Записываем в переменную попап для карточек

//Добавление новой карточки
document.querySelector('.profile__insert').addEventListener('click', function(){
  const popupInsertElem = popupIdInsert.querySelector('.popup').cloneNode(true);
  const name = popupInsertElem.querySelector('.popup__elem_input_name');
  const link = popupInsertElem.querySelector('.popup__elem_input_theme');
  footer.after(popupInsertElem);
  openPopup();
  popupInsertElem.querySelector('.popup__form').addEventListener('submit', function(event){
    event.preventDefault();
    if(name.value || link.value !==''){
      renderCards(name.value, link.value);
      closePopup();
      }
  });
  popupInsertElem.querySelector('.popup__disable').addEventListener('click', closePopup);
});

//ставим лайк
document.querySelector('.cards__list').addEventListener('click', function(event){
  if(event.target.classList.contains('card__like')){
  event.target.classList.toggle('card__like_active');
}});

//удаление карточки
document.querySelector('.cards__list').addEventListener('click', function(event){
  if(event.target.classList.contains('card__delete')){
    event.target.closest('.card').remove();
}})

//Попап во весь экран
const popupCover = document.querySelector('#popup-cover').content;
document.querySelector('.cards__list').addEventListener('click', function(event){
  if(event.target.classList.contains('card__img')){
    const viewCover = popupCover.querySelector('.popup').cloneNode(true);
    viewCover.querySelector('.popup__cover-img').src = event.target.src;
    footer.after(viewCover);
    //текст под картинкой-попапом
    const text = event.target.nextElementSibling.firstElementChild.textContent;
    viewCover.querySelector('.popup__text').textContent = text;
    openPopup();
    viewCover.querySelector('.popup__disable').addEventListener('click', closePopup);
    }
})



