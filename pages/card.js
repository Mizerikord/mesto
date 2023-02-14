import { config } from './constants.js'

export class Card {
  constructor(element, config) {
    this._element = element;
    this._template = config.card;
    this._config = config;
  }

  _getTemplate() {
    return this._template.content.querySelector('.card').cloneNode(true);
  }

  _setLikeListeners() {
    this._cardElement.querySelector(this._config.cardLike).addEventListener('click', () => {
      this._cardElement.querySelector(this._config.cardLike).classList.toggle(this._config.cardLikeActive);
    });
  }

  _setDeleteCard() {
    this._cardElement.querySelector(this._config.cardDelete).addEventListener('click', () => {
      this._cardElement.remove();
    });
  }
  
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(this._config.cardTitle).textContent = this._element.name;
    this._cardElement.querySelector(this._config.cardImage).src = this._element.link;
    this._setLikeListeners();
    this._setDeleteCard();
    return this._cardElement;
  }
}



