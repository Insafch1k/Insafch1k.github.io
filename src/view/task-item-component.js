import {createElement} from '../framework/render.js';

function createTaskItemComponentTemplate() {
  return (
    `<div class="task-item">
      <h3 class="task-item__title">Название первой задачи</h3>
    </div>`
  );
}

export default class TaskItemComponent {
  getTemplate() {
    return createTaskItemComponentTemplate();
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