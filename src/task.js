import { v4 as uuidv4 } from "uuid";

export class Task {
  constructor(title, description, dueDate, priority, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = uuidv4();
    this.done = done;
  }

  get title() {
    return this._title;
  }

  set title(t) {
    this._title = t;
  }

  get description() {
    return this._description;
  }

  set description(d) {
    this._description = d;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(d) {
    this._dueDate = d;
  }

  get priority() {
    return this._priority;
  }

  set priority(p) {
    this._priority = p;
  }

  toggleDone() {
    this.done = !this.done;
  }
}
