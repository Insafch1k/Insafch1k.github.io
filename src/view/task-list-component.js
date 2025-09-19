import {createElement} from '../framework/render.js';

function createTaskListComponentTemplate(index = 1) {
  return (
    `<section class="task-list">
      <h3 class="task-list__title">Название блока</h3>
      <div class="task-list__items" aria-label="Списки задач #${index}"></div>
    </section>`
  );
}

export default class TaskListComponent {
  constructor(index = 1) {
    this.index = index;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.index);
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