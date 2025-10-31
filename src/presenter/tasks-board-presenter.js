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
    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        Object.values(Status).forEach((status) => {
            this.#renderTasksList(status);
        });
    }

    #renderTasksList(status) {
        const taskListComponent = new TaskListComponent({status});
        render(taskListComponent, this.#tasksBoardComponent.element);

        if (status === Status.BASKET) {
            this.#renderClearBasketButton(taskListComponent.element);
        }

        const tasksForStatus = getTasksByStatus(this.#boardTasks, status);
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
    }

    #renderEmptyList(container) {
        const emptyComponent = new TaskListEmptyComponent();
        render(emptyComponent, container);
    }
}