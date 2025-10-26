import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TaskModel from "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { generateID } from "./utils.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const boardContainer = document.querySelector(".taskboard");

const tasksModel = new TaskModel();
const tasksBoardPresenter = new TasksBoardPresenter({ boardContainer, tasksModel });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formComponent = new FormAddTaskComponent();
render(formComponent, formContainer);

tasksBoardPresenter.init();

const input = formContainer.querySelector("input");
const button = formContainer.querySelector("button");

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  const title = input.value.trim();

  if (!title) return;

  const newTask = {
    id: generateID(),
    title,
    status: "backlog",
  };

  tasksModel.addTask(newTask);
  input.value = "";
});
