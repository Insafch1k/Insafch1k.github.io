import BoardComponent from '../view/board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import {render} from '../framework/render.js';
import {TASK_STATUS} from '../const.js';

export default class TasksBoardPresenter {
  constructor({boardContainer, tasksModel}) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;

    this.boardComponent = new BoardComponent();
  }

  init() {
    const boardTasks = this.tasksModel.getTasks();

    render(this.boardComponent, this.boardContainer);

    Object.values(TASK_STATUS).forEach((status) => {
      const taskListComponent = new TaskListComponent(status.title, status.className);
      render(taskListComponent, this.boardComponent.getElement());

      boardTasks
        .filter((task) => task.status === status.id)
        .forEach((task) => {
          const taskComponent = new TaskComponent(task);
          render(taskComponent, taskListComponent.getElement());
        });

      if (status.id === 'trash') {
        const clearButton = document.createElement('button');
        clearButton.textContent = '✖ Очистить';
        clearButton.classList.add('clear-button');
        taskListComponent.getElement().append(clearButton);
      }
    });
  }
}
