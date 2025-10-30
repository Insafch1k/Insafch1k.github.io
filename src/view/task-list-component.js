import {createElement} from '../framework/render.js';

function createTaskListComponentTemplate() {
  return (
    `<div class="task-list">
      <h2 class="task-list__title">Название блока</h2>
      <div class="task-list__items"></div>
    </div>`
  );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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