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

  updateTaskStatus(taskId, newStatus) {
    const task = this.#tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this.#notify("task-updated", task);
    }
  }

   moveTask(taskId, newStatus, targetTaskId = null, position = null) {
    const idx = this.#tasks.findIndex(t => String(t.id) === String(taskId));
    if (idx === -1) return;

    const task = this.#tasks[idx];

    // remove from array
    this.#tasks.splice(idx, 1);

    // update status
    task.status = newStatus;

    // determine insert index
    let insertIndex = this.#tasks.length; // append by default

    if (targetTaskId !== null) {
      const targetIndex = this.#tasks.findIndex(t => String(t.id) === String(targetTaskId));
      if (targetIndex !== -1) {
        insertIndex = (position === 'after') ? targetIndex + 1 : targetIndex;
      }
    }

    // insert task
    this.#tasks.splice(insertIndex, 0, task);

    this.#notify('task-moved', { task, newStatus, insertIndex });
  }
}
