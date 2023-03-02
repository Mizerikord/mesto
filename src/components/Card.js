// import { openPopup } from '../pages/utils/utils.js'
export class Card {
  constructor(item, config, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this._element = item;
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
    this._handleCardClick.handleCardClick(this._cardImageElement);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector(this._config.cardImage);
    this._cardElement.querySelector(this._config.cardTitle).textContent = this._element.name;
    this._cardImageElement.src = this._element.link;
    this._cardImageElement.alt = `Изображение места ${this._element.name}`;
    this._setEventListeners(this._cardImageElement);
    return this._cardElement;
  }
}