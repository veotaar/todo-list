import { v4 as uuidv4 } from "uuid";

export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = uuidv4();
    this.isCurrent = false;
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

  set isCurrent(c) {
    this._isCurrent = c;
  }

  get isCurrent() {
    return this._isCurrent;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(id) {
    const indexToDelete = this.tasks.findIndex((e) => e.id === id);
    this.tasks.splice(indexToDelete, 1);
  }

  getTask(id) {
    const index = this.tasks.findIndex((e) => e.id === id);
    return this.tasks.at(index);
  }

  moveTaskToTheEnd(id) {
    const index = this.tasks.findIndex((e) => e.id === id);
    if (this.tasks.at(index).done)
      this.tasks.push(this.tasks.splice(index, 1).pop());
  }
}
