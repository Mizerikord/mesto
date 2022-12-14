let popupActive = document.querySelector('.popup');

//открыть - закрыть попап
function openPopup(){
    popupActive.classList.toggle('popup_opened');
}
document.querySelector('.profile__editor').addEventListener('click', openPopup);
document.querySelector('.popup__disable').addEventListener('click', openPopup);

//редактирвоание полей
let popupName = document.querySelector('.popup__name');
let popupTheme = document.querySelector('.popup__theme');
let profileName = document.querySelector('.profile__name');
let profileTheme = document.querySelector('.profile__theme');
let popupButton = document.querySelector('.popup__save-button');
    //очистка поля
popupName.addEventListener('click', function(){
    popupName.value = '';
})

popupTheme.addEventListener('click', function(){
    popupTheme.value = '';
})
//меняем текст на новый
function newName(){
    if(popupName.value || popupName.value !==''){
    profileName.textContent = popupName.value;
    profileTheme.textContent = popupTheme.value;
    } else { //оставляем текст, если введено пустое поле
        alert('Строки не могут быть пустыми, изменения не внесены');
        profileName.textContent = profileName.textContent;
        profileTheme.textContent = profileTheme.textContent;
    }
openPopup();
}

popupButton.addEventListener('click', newName);
document.querySelector('.popup').addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
       newName();
    }
});

//ставим Like
function like(event){
    if (event.target.classList.contains('card__like')){
    event.target.classList.toggle('card__dislike');
    }
}
document.querySelector('.card__list').addEventListener('click', like)

//добавляем фоточки разные
//реализуем в новом сезоне


