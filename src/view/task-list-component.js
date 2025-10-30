import {createElement} from '../framework/render.js';
import { StatusLabel } from '../const.js';

function createTaskListComponentTemplate(status) {
  return (
    `<div class="task-list">
      <h2 class="task-list__title task-list__title--${status}">${StatusLabel[status]}</h2>
      <div class="task-list__items"></div>
    </div>`
  );
}

export default class TaskListComponent {
  constructor({status}) {
    this.status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.status);
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