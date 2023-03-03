export class Card {
  constructor(cardData, { handleCardClick }, config ) {
    this._handleCardClick = handleCardClick;
    this._cardData = cardData;
    this._template = config.card;
    this._config = config;
  }

  _getTemplate() {
    return this._template.content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeElement = this._cardElement.querySelector(this._config.cardLike);
    this._cardLikeElement.addEventListener('click', () => {
      this._cardLikeElement.classList.toggle(this._config.cardLikeActive);
    });

    this._cardElement.querySelector(this._config.cardDelete).addEventListener('click', () => {
      this._cardElement.remove();
    });
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardData);
    })
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(this._config.cardImage);
    this._cardElement.querySelector(this._config.cardTitle).textContent = this._cardData.name;
    this._cardImageElement.src = this._cardData.link;
    this._cardImageElement.alt = `Изображение места ${this._cardData.name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}