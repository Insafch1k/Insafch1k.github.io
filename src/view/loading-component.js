import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class LoadingComponent extends AbstractComponent {
  get template() {
    return `<div class="loading">Загрузка...</div>`;
  }
}
