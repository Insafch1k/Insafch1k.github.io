import BoardComponent from "../view/board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import { render } from "../framework/render.js";
import { TASK_STATUS } from "../const.js";
import EmptyListComponent from "../view/empty-list-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #boardComponent = new BoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    render(this.#boardComponent, this.#boardContainer);
    Object.values(TASK_STATUS).forEach((status) => {
      this.#renderTasksList(status);
    });
  }

  // Отрисовка списка задач
  #renderTasksList(status) {
    const taskListComponent = new TaskListComponent(status.title, status.className);
    render(taskListComponent, this.#boardComponent.element);

    const tasks = this.#tasksModel.tasks.filter((t) => t.status === status.id);

    if (tasks.length === 0) {
      this.#renderEmptyList(taskListComponent);
      return;
    }

    tasks.forEach((task) => this.#renderTask(taskListComponent, task));

    if (status.id === "trash") {
      this.#renderClearButton(taskListComponent);
    }
  }

  // Отдельный метод для рендера задачи
  #renderTask(container, task) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container.element);
  }

  // Рендер пустого списка
  #renderEmptyList(container) {
    const emptyListComponent = new EmptyListComponent();
    render(emptyListComponent, container.element);
  }

  // Рендер кнопки очистки
  #renderClearButton(container) {
    const clearButton = document.createElement("button");
    clearButton.textContent = "✖ Очистить";
    clearButton.classList.add("clear-button");
    container.element.append(clearButton);
  }
}
