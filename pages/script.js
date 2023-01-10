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

const popupProfile = document.querySelector('.popup_profile');
const popupInsert = document.querySelector('.popup_insert');
const popupCover = document.querySelector('.popup_cover');
const footer = document.querySelector('.footer');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileTheme = document.querySelector('.profile__theme');
//открытие-закрытие попа-па
function openPopup(elem){
  elem.classList.add('popup_opened');
}
function closePopup(elem){
  elem.classList.remove('popup_opened');
  elem.style.transition = 'visibility 1s, opacity 1s linear';
}
const popupName = popupProfile.querySelector('.popup__elem_input_name');
const popupTheme = popupProfile.querySelector('.popup__elem_input_theme');
    document.querySelector('.profile__editor').addEventListener('click', function(){
    popupName.value = profileName.textContent;
    popupTheme.value = profileTheme.textContent;
    openPopup(popupProfile);
    popupProfile.querySelector('.popup__form').addEventListener('submit', function(event){
      event.preventDefault();
      if(popupName.value || popupTheme.value !== ''){
      profileName.textContent = popupName.value;
      profileTheme.textContent = popupTheme.value;
      closePopup(popupProfile);
      }
    });
    popupProfile.querySelector('.popup__disable').addEventListener('click', ()=>closePopup(popupProfile));
});


const cardPlace = document.querySelector('.cards__list');
const card = document.querySelector('#card').content;
//Выводим массив карточки из массива
for(elem of initialCards){
  const cardElem = card.querySelector('.card').cloneNode(true);
  cardElem.querySelector('.card__img').src = elem.link;
  cardElem.querySelector('.card__title').textContent = elem.name;
  cardPlace.prepend(cardElem);
  }
//Отрисовываем новую карточку
function renderCards(nameValue, linkValue){
  console.log(nameValue, linkValue);
  const cardElem = card.querySelector('.card').cloneNode(true);
  cardElem.querySelector('.card__title').textContent = nameValue;
  cardElem.querySelector('.card__img').src = linkValue;
  cardPlace.prepend(cardElem);
}

//Добавление новой карточки
document.querySelector('.profile__insert').addEventListener('click', ()=>openPopup(popupInsert));

popupInsert.querySelector('.popup__form').addEventListener('submit', function(event){
  event.preventDefault();
  const name = popupInsert.querySelector('.popup__elem_input_name');
  const link = popupInsert.querySelector('.popup__elem_input_theme');
  renderCards(name.value, link.value);
  closePopup(popupInsert);
});
popupInsert.querySelector('.popup__disable').addEventListener('click', ()=>closePopup(popupInsert));

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
document.querySelector('.cards__list').addEventListener('click', function(event){
  if(event.target.classList.contains('card__img')){
    popupCover.querySelector('.popup__cover-img').src = event.target.src;
    //текст под картинкой-попапом
    const text = event.target.nextElementSibling.firstElementChild.textContent;
    popupCover.querySelector('.popup__text').textContent = text;
    openPopup(popupCover);
    popupCover.querySelector('.popup__disable').addEventListener('click', ()=>closePopup(popupCover));
    }
})



