import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';
import { Status } from '../const.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
      return this.#boardtasks;
    }

    getTasksByStatus(status) {
      return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
      const newTask = {
        title,
        status: 'backlog',
        id: generateID(),
      };
      this.#boardtasks.push(newTask);
      this._notifyObservers();
      return newTask;
    }

    addObserver(observer) {
      this.#observers.push(observer);
    }

    removeObserver(observer) {
      this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
      this.#observers.forEach((observer) => observer());
    }

    clearBasket() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== Status.BASKET);
        this._notifyObservers();
    }

    updateTaskStatusAndOrder(taskId, newStatus, beforeTaskId) {
        const task = this.#boardtasks.find(t => t.id === taskId);
        if (!task) return;
      
        task.status = newStatus;
        const statusTasks = this.#boardtasks.filter(t => t.status === newStatus);
        const taskIndex = statusTasks.findIndex(t => t.id === taskId);
        if (taskIndex > -1) statusTasks.splice(taskIndex, 1);
      
        let insertIndex = statusTasks.length; 
        if (beforeTaskId) {
          const beforeIndex = statusTasks.findIndex(t => t.id === beforeTaskId);
          if (beforeIndex > -1) insertIndex = beforeIndex;
        }
        statusTasks.splice(insertIndex, 0, task);
      
        const otherTasks = this.#boardtasks.filter(t => t.status !== newStatus);
        this.#boardtasks = [...otherTasks, ...statusTasks];
      
        this._notifyObservers();
      }
  }