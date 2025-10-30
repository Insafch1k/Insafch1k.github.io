import TaskListComponent from '../view/task-list-component.js'
import TaskItemComponent from '../view/task-item-component.js'
import TaskBoardComponent from '../view/task-board-component.js'
import { render } from '../framework/render.js'
import TasksModel from '../model/task-model.js';
import { Status } from '../const.js';
import ClearBasketComponent from '../view/clear-basket-component.js';

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
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);
        const statuses = Object.values(Status);
        for (let i = 0; i < statuses.length; i++) {
            const tasksListComponent = new TaskListComponent({status: statuses[i]});
            render(tasksListComponent, this.#tasksBoardComponent.getElement());

            if (statuses[i] === Status.BASKET) {
                const clearButton = new ClearBasketComponent();
                render(clearButton, tasksListComponent.getElement());
            }
            
            const tasksForStatus = this.#boardTasks.filter(task => task.status === statuses[i]);
            for (let j = 0; j < tasksForStatus.length; j++) {
                const taskComponent = new TaskItemComponent({task: tasksForStatus[j]});
                render(taskComponent, tasksListComponent.getElement().querySelector('.task-list__items'));
            }
        }
    }
}