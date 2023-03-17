export class Card {
  constructor(cardData, currentUserId, { handleCardClick, handleDeleteCard, handleLikeClick }, config) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._cardData = cardData;
    this._template = config.card;
    this._config = config;
    this._currentUserId = currentUserId;
    this._isOwner = this._cardData.owner._id === this._currentUserId;
    this._isLike = this._cardData.likes.length === 0;
  }

  _getTemplate() {
    return this._template.content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    
    this._cardLikeElement.addEventListener('click', () => {
      this._handleLikeClick(this._cardLikeElement, this._config.cardLikeActive, this._likeIsCount, this._cardData);
    });

    if(!this._isOwner){
      this._cardElement.querySelector(this._config.cardDelete).remove();
      }
    else{
      this._cardElement.querySelector(this._config.cardDelete).addEventListener('click', () => {
        this._handleDeleteCard(this._cardData, this._cardElement, this.setDeleteCard);
      });
    }
    
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardData);
    })
  }

  _getMyLike(){
    const even = (element) => element._id === this._currentUserId;
    return this._cardData.likes.some(even);
  }

  setDeleteCard(cardToDelete){
    cardToDelete.remove();
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardLikeElement = this._cardElement.querySelector(this._config.cardLike);
    this._likeIsCount = this._cardElement.querySelector(this._config.cardLikecounter);
    this._cardImageElement = this._cardElement.querySelector(this._config.cardImage);
    this._cardElement.querySelector(this._config.cardTitle).textContent = this._cardData.name;
    this._cardImageElement.src = this._cardData.link;
    this._cardImageElement.alt = `Изображение места ${this._cardData.name}`;
    if(!this._isLike){
      if(this._getMyLike()){ this._cardLikeElement.classList.add(this._config.cardLikeActive);}
      this._likeIsCount.textContent = this._cardData.likes.length;
    }
    this._setEventListeners();
    return this._cardElement;
  }
}