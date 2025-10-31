import TaskListComponent from '../view/task-list-component.js'
import TaskItemComponent from '../view/task-item-component.js'
import TaskBoardComponent from '../view/task-board-component.js'
import { render } from '../framework/render.js'
import TasksModel from '../model/task-model.js';
import { Status } from '../const.js';
import ClearBasketComponent from '../view/clear-basket-component.js';
import TaskListEmptyComponent from '../view/task-list-empty-component.js';

function getTasksByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    init() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderBoard();
    }

    createTask() {
        const taskTitle = document.querySelector('#add-task').value.trim();
        if (!taskTitle) {
          return;
        }
        this.#tasksModel.addTask(taskTitle);
        document.querySelector('#add-task').value = '';
    }

    clearBasket() {
        this.#tasksModel.clearBasket();
    }
    
    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #renderBoard() {
        Object.values(Status).forEach((status) => {
          this.#renderTasksList(status);
        });
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #renderTasksList(status) {
        const taskListComponent = new TaskListComponent({status});
        render(taskListComponent, this.#tasksBoardComponent.element);
    
        if (status === Status.BASKET) {
          this.#renderClearBasketButton(taskListComponent.element);
        }
    
        const tasksForStatus = getTasksByStatus(this.tasks, status);
        const container = taskListComponent.element.querySelector('.task-list__items');
    
        if (tasksForStatus.length === 0) {
          this.#renderEmptyList(container);
        } else {
          tasksForStatus.forEach((task) => {
            this.#renderTask(task, container);
          });
        }
    }

    #renderTask(task, container) {
        const taskComponent = new TaskItemComponent({task});
        render(taskComponent, container);
    }

    #renderClearBasketButton(container) {
        const clearButton = new ClearBasketComponent();
        render(clearButton, container);
        const buttonElement = clearButton.element;
        buttonElement.addEventListener('click', () => this.clearBasket());
        const basketTasks = this.tasks.filter(task => task.status === Status.BASKET);
        if (basketTasks.length === 0) {
          buttonElement.disabled = true;
        }
    }

    #renderEmptyList(container) {
        const emptyComponent = new TaskListEmptyComponent();
        render(emptyComponent, container);
    }


}