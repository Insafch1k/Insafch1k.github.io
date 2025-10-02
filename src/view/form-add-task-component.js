import {createElement} from '../framework/render.js';

function createFormAddTaskTemplate() {
  return (
    `<section class="new-task">
      <label for="task">Новая задача</label>
      <div class="input-container">
        <input type="text" id="task" placeholder="Название задачи...">
        <button>+ Добавить</button>
      </div>
    </section>`
  );
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskTemplate();
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
