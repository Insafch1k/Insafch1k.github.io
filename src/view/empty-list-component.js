import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyListTemplate() {
  return `<p class="task-empty">Нет задач</p>`;
}

export default class EmptyListComponent extends AbstractComponent {
  get template() {
    return createEmptyListTemplate();
  }
}
