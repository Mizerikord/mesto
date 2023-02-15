import { config } from './constants.js'
import { openPopup } from './index.js'
export class Card {
  constructor(element, config) {
    this._element = element;
    this._template = config.card;
    this._config = config;
  }

  _getTemplate() {
    return this._template.content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement.querySelector(this._config.cardLike).addEventListener('click', () => {
      this._cardElement.querySelector(this._config.cardLike).classList.toggle(this._config.cardLikeActive);
    });

    this._cardElement.querySelector(this._config.cardDelete).addEventListener('click', () => {
      this._cardElement.remove();
    });

    this._cardElement.querySelector(this._config.cardImage).addEventListener('click', () => {
      this._config.coverImg.src = this._element.link;
      this._config.coverImg.alt = `Изображение места ${this._element.name}`;
      this._config.coverText.textContent = this._element.name;
      openPopup(this._config.popupCover);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(this._config.cardTitle).textContent = this._element.name;
    this._cardElement.querySelector(this._config.cardImage).src = this._element.link;
    this._cardElement.querySelector(this._config.cardImage).alt = `Изображение места ${this._element.name}`;
    this._setEventListeners();
    return this._cardElement;
  }
}



