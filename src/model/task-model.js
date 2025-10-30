import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = { 
      id: generateID(), 
      title, 
      status: 'backlog',
      isNew: true 
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify('task-added', createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи:', err);
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((t) => t.id === taskId);
    if (!task) return;
    task.status = newStatus;
    try {
      await this.#tasksApiService.updateTask(task);
      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err);
    }
  }

  async clearTrash() {
    const trashTasks = this.#boardtasks.filter((t) => t.status === 'trash');
    for (const task of trashTasks) {
      await this.#tasksApiService.deleteTask(task.id);
    }
    this.#boardtasks = this.#boardtasks.filter((t) => t.status !== 'trash');
    this._notify(UserAction.DELETE_TASK);
  }
}
