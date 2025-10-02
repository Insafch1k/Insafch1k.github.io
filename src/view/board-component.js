import {createElement} from '../framework/render.js';

function createBoardTemplate() {
  return `<section class="columns"></section>`;
}

export default class BoardComponent {
  getTemplate() {
    return createBoardTemplate();
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
