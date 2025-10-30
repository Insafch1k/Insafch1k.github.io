import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import { render, RenderPosition } from './framework/render.js';
import TaskModel from './model/task-model.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://6903abe9d0f10a340b254baf.mockapi.io'; 
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

const tasksApiService = new TasksApiService(END_POINT);
const tasksModel = new TaskModel({ tasksApiService });
const tasksBoardPresenter = new TasksBoardPresenter({ boardContainer, tasksModel });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
const formComponent = new FormAddTaskComponent();
render(formComponent, formContainer);

(async () => {
  await tasksModel.init();
  tasksBoardPresenter.init();
})();

const input = formContainer.querySelector('input');
const button = formContainer.querySelector('button');

async function handleAddTask() {
  const title = input.value.trim();
  if (!title) return;

  await tasksModel.addTask(title);

  input.value = '';

  input.focus();
}

button.addEventListener('click', async (evt) => {
  evt.preventDefault();
  await handleAddTask();
});

input.addEventListener('keydown', async (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    await handleAddTask();
  }
});

