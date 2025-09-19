import {createElement} from '../framework/render.js';

function createTaskBoardComponentTemplate() {
  return (
    `<div class="taskboard__inner">
      <h2 class="taskboard__title">Название блока</h2>
      <div class="taskboard__lists" aria-label="Списки задач"></div>
    </div>`
  );
}

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponentTemplate();
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