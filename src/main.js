import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskItemComponent from './view/task-item-component.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');
    
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

const board = new TaskBoardComponent();
render(board, boardContainer);

const listsWrapper = board.getElement().querySelector('.taskboard__lists');

for (let i = 0; i < 4; i++) {
    const list = new TaskListComponent(i + 1);
    render(list, listsWrapper);
  
    const itemsWrapper = list.getElement().querySelector('.task-list__items');
  
    for (let j = 0; j < 4; j++) {
      render(new TaskItemComponent(`Название первой задачи`), itemsWrapper);
    }
}