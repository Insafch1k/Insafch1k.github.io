import {createElement} from '../framework/render.js';
import { StatusLabel } from '../const.js';

function createTaskItemComponentTemplate(task) {

  const {title, status} = task;
    return (
      `
      <div class="task-item task-item--${status}">
        <p class="task-item__title">${title}</p>
      </div>
      `
    );
}

// `<div class="task-item task task--${status}"
// <div class="task-item-body">
// <p class="task-item__title">${title}</p>
// <input type="text" class="task--input" />
// </div>
// <button aria-label="Изменить" class="task-item__edit" type="button"></button>
// </div>`

export default class TaskItemComponent {

  constructor ({task}) {
    this.task = task;
  }

  getTemplate() {
    return createTaskItemComponentTemplate(this.task);
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