import AbstractComponent from '../framework/view/abstract-component.js';
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

export default class TaskListComponent extends AbstractComponent {
  constructor({status}) {
    super();
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }
}