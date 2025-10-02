import {createElement} from '../framework/render.js';

function createTaskListTemplate(title, modifier) {
  return (
    `<article class="column ${modifier}">
      <h3>${title}</h3>
    </article>`
  );
}

export default class TaskListComponent {
  constructor(title, modifier) {
    this.title = title;
    this.modifier = modifier;
  }

  getTemplate() {
    return createTaskListTemplate(this.title, this.modifier);
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
