import BoardComponent from "../view/board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import { render } from "../framework/render.js";
import { TASK_STATUS } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #boardComponent = new BoardComponent();

  #currentDrop = { listEl: null, targetId: null, position: null };

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));

  
    this.#boardContainer.addEventListener('dragstart', this.#onDragStart.bind(this));
  
    this.#boardContainer.addEventListener('dragover', this.#onDragOver.bind(this));
    this.#boardContainer.addEventListener('dragleave', this.#onDragLeave.bind(this));
    this.#boardContainer.addEventListener('drop', this.#onDrop.bind(this));
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#clearBoard();
    render(this.#boardComponent, this.#boardContainer);
    Object.values(TASK_STATUS).forEach((status) => this.#renderTasksList(status));
  
  }

  #clearBoard() {
    this.#boardComponent.element.innerHTML = "";
  }

  #renderTasksList(status) {
    const taskListComponent = new TaskListComponent(status.title, status.className);
    render(taskListComponent, this.#boardComponent.element);

    taskListComponent.element.dataset.status = status.id;

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

  #renderTask(container, task) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container.element);
  }

  #renderEmptyList(container) {
    const emptyListComponent = new EmptyListComponent();
    render(emptyListComponent, container.element);
  }

  #renderClearButton(container) {
    const clearButton = document.createElement("button");
    clearButton.textContent = "✖ Очистить";
    clearButton.classList.add("clear-button");
    clearButton.addEventListener("click", () => {
      this.#tasksModel.clearTrash();
      clearButton.disabled = true;
    });
    container.element.append(clearButton);
  }

  #handleModelEvent(eventType) {
    switch (eventType) {
      case "task-added":
      case "task-updated":
      case "task-moved":
      case "trash-cleared":
        this.#renderBoard();
        break;
    }
  }

  #handleDropTask(taskId, newStatus, targetTaskId = null, position = null) {

    this.#tasksModel.moveTask(taskId, newStatus, targetTaskId, position);
  }

  #onDragStart(evt) {
    const taskEl = evt.target.closest('.task');
    if (!taskEl) return;
    evt.dataTransfer.setData('text/plain', taskEl.dataset.id);
    evt.dataTransfer.effectAllowed = 'move';
  }

 
  #onDragOver(evt) {
    const listEl = evt.target.closest('.column'); 
    if (!listEl) return;

    evt.preventDefault(); 

    const taskEl = evt.target.closest('.task');

    if (taskEl && listEl.contains(taskEl)) {
      const rect = taskEl.getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;
      const position = (evt.clientY < middleY) ? 'before' : 'after';

      this.#currentDrop = {
        listEl,
        targetId: taskEl.dataset.id,
        position,
      };

      this.#clearDropHints();
      taskEl.classList.add(position === 'before' ? 'drop-before' : 'drop-after');

    } else {
      this.#currentDrop = {
        listEl,
        targetId: null,
        position: null
      };
      this.#clearDropHints();
      listEl.classList.add('drop-hover-end');
    }
  }

  #onDragLeave(evt) {

    const listEl = evt.target.closest('.column');
    if (!listEl) return;
    if (!listEl.contains(evt.relatedTarget)) {
      this.#clearDropHints();
      this.#currentDrop = { listEl: null, targetId: null, position: null };
    }
  }

  #onDrop(evt) {
    const listEl = evt.target.closest('.column');
    if (!listEl) return;

    evt.preventDefault();

    const draggedId = evt.dataTransfer.getData('text/plain');
    if (!draggedId) return;

    const newStatus = listEl.dataset.status;

    const { targetId, position } = this.#currentDrop || {};

    this.#handleDropTask(draggedId, newStatus, targetId, position);

    this.#clearDropHints();
    this.#currentDrop = { listEl: null, targetId: null, position: null };
  }

  #clearDropHints() {
    const before = this.#boardContainer.querySelectorAll('.drop-before');
    before.forEach((el) => el.classList.remove('drop-before'));
    const after = this.#boardContainer.querySelectorAll('.drop-after');
    after.forEach((el) => el.classList.remove('drop-after'));
    const ends = this.#boardContainer.querySelectorAll('.drop-hover-end');
    ends.forEach((el) => el.classList.remove('drop-hover-end'));
  }
}
