import {tasks} from '../mock/task.js';

export default class TaskModel {
  constructor() {
    this.tasks = [...tasks]; // копируем, чтобы не менять оригинал
  }

  getTasks() {
    return this.tasks;
  }
}
