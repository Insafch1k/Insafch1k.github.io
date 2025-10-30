import {createElement} from '../framework/render.js';

function createClearBasketComponentTemplate() {
  return `<button class="clear-basket" type="button">Очистить<span>Х</span></button>`;
}

export default class ClearBasketComponent {
  getTemplate() {
    return createClearBasketComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}