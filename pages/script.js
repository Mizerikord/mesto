

const popup = document.querySelector('.popup');

//открыть - закрыть попап
function openPopup(){
    popup.classList.remove('popup_opened');
}
function closePopup(){
    popup.classList.add('popup_opened');
}
document.querySelector('.profile__editor').addEventListener('click', openPopup);
document.querySelector('.popup__disable').addEventListener('click', closePopup);

//редактирвоание полей
const popupName = document.querySelector('.popup__elem_input-name');
const popupTheme = document.querySelector('.popup__elem_input-theme');
const profileName = document.querySelector('.profile__name');
const profileTheme = document.querySelector('.profile__theme');
const popupForm = document.querySelector('.popup__form')
const popupButton = document.querySelector('.popup__save-button');

//меняем текст на новый

popupForm.addEventListener('submit',  function newName(event){
    event.preventDefault();
    if(popupName.value || popupName.value !==''){
    profileName.textContent = popupName.value;
    profileTheme.textContent = popupTheme.value;
    }
    closePopup();
});

//добавляем фоточки разные
//реализуем в новом сезоне


