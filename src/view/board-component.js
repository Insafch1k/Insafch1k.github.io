import {createElement} from '../framework/render.js';
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBoardTemplate() {
  return `<section class="columns"></section>`;
}

export default class BoardComponent extends AbstractComponent {
  get template() {
    return createBoardTemplate();
  }

}
