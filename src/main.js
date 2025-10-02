import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import BoardComponent from './view/board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const mainContainer = document.querySelector('.board-app__main');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

// 1. Header
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// 2. Форма добавления задачи
render(new FormAddTaskComponent(), formContainer);

// 3. Доска
const boardComponent = new BoardComponent();
render(boardComponent, boardContainer);

// 4. Списки задач
const lists = [
  {title: 'Бэклог', modifier: 'backlog', tasks: ['Выучить JS', 'Выучить React', 'Сделать домашку']},
  {title: 'В процессе', modifier: 'inprogress', tasks: ['Выпить смузи', 'Попить воды']},
  {title: 'Готово', modifier: 'done', tasks: ['Позвонить маме', 'Погладить кота']},
  {title: 'Корзина', modifier: 'trash', tasks: ['Сходить погулять', 'Прочитать Войну и Мир']}
];

lists.forEach(list => {
  const taskListComponent = new TaskListComponent(list.title, list.modifier);
  render(taskListComponent, boardComponent.getElement());

  list.tasks.forEach(task => {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, taskListComponent.getElement());
  });

  if (list.modifier === 'trash') {
    const clearButton = document.createElement('button');
    clearButton.textContent = '✖ Очистить';
    clearButton.classList.add('clear-button');
    taskListComponent.getElement().append(clearButton);
  }
});
