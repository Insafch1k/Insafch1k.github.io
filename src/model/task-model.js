import { tasks } from "../mock/task.js";

export default class TaskModel {
  #tasks = [];
  #observers = new Set();

  constructor() {
    this.#tasks = [...tasks];
  }

  get tasks() {
    return this.#tasks;
  }

  addObserver(observer) {
    this.#observers.add(observer);
  }

  #notify(eventType, payload) {
    this.#observers.forEach((observer) => observer(eventType, payload));
  }

  addTask(newTask) {
    this.#tasks.push(newTask);
    this.#notify("task-added", newTask);
  }

  clearTrash() {
    this.#tasks = this.#tasks.filter((t) => t.status !== "trash");
    this.#notify("trash-cleared");
  }
}
