import {createElement} from '../framework/render.js';

function createTaskItemComponentTemplate(title = 'Название первой задачи') {
  return (
    `<section class="task-card">
      <h4 class="task-card__title">${title}</h4>
    </section>`
  );
}

export default class TaskItemComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskItemComponentTemplate(this.title);
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