import { v4 as uuidv4 } from "uuid";

export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = uuidv4();
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(t) {
    this._tasks = t;
  }

  set name(n) {
    this._name = n;
  }

  get name() {
    return this._name;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(id) {
    const indexToDelete = this.tasks.findIndex((e) => e.id === id);
    this.tasks.splice(indexToDelete, 1);
  }
}
