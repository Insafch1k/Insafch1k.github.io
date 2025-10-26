import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListTemplate(title, modifier) {
  return `
    <article class="column ${modifier}" data-status="${modifier}">
      <h3>${title}</h3>
    </article>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  #title = null;
  #modifier = null;

  constructor(title, modifier) {
    super();
    this.#title = title;
    this.#modifier = modifier;
  }

  get template() {
    return createTaskListTemplate(this.#title, this.#modifier);
  }

  setDropHandlers(onDropTask) {
    const element = this.element;

    element.addEventListener("dragover", (evt) => {
      evt.preventDefault(); // разрешаем сброс
      element.classList.add("drop-hover");
    });

    element.addEventListener("dragleave", () => {
      element.classList.remove("drop-hover");
    });

    element.addEventListener("drop", (evt) => {
      evt.preventDefault();
      element.classList.remove("drop-hover");

      const taskId = evt.dataTransfer.getData("text/plain");
      const newStatus = this.#modifier;
      onDropTask(taskId, newStatus);
    });
  }
}
