import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

const tasksModel = new TaskModel();
const tasksBoardPresenter = new TasksBoardPresenter({boardContainer, tasksModel});

// Header
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// Form
render(new FormAddTaskComponent(), formContainer);

// Board
tasksBoardPresenter.init();
