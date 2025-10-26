import {createElement} from '../framework/render.js';
import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class FormAddTaskComponent extends AbstractComponent{
  get template() {
    return createFormAddTaskTemplate();
  }


}
