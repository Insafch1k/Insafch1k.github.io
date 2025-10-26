import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  return `<div class="task" data-id="${task.id}">${task.title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null; // приватное поле

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}
