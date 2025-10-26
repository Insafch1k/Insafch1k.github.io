import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListTemplate(title, modifier) {
  return `
    <article class="column ${modifier}">
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
}
