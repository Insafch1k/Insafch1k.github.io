import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  return `<div class="task" draggable="true" data-id="${task.id}">${task.title}</div>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  setDragHandlers() {
    this.element.addEventListener("dragstart", (evt) => {
      evt.dataTransfer.setData("text/plain", this.#task.id);
      evt.dataTransfer.effectAllowed = "move";
    });
  }

  
}
