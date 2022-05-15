import { moonSVG, sunSVG, sysSVG } from "./icons";
import { cls } from "./utils";
import { Task } from "./task";
import { Project } from "./project";
import { viewTasks } from "./view";
import { format } from "date-fns";

const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

// Get the placeholder attribute
const placeholder = taskTitle.getAttribute("placeholder");

// Set the placeholder as initial content if it's empty
taskTitle.innerHTML === "" && (taskTitle.innerHTML = placeholder);
taskDescription.innerHTML === "" && (taskTitle.innerHTML = placeholder);

taskTitle.addEventListener("focus", function (e) {
  const value = e.target.innerHTML;
  // value === placeholder && (e.target.innerHTML = "");
  value === placeholder && (e.target.textContent = "");
});

taskDescription.addEventListener("focus", function (e) {
  const value = e.target.innerHTML;
  // value === placeholder && (e.target.innerHTML = "");
  value === placeholder && (e.target.textContent = "");
});

const taskModal = document.getElementById("add-task-modal");
const overlay = document.getElementById("overlay");
const btnAddTask = document.getElementById("add-task-button");
const btnCloseTask = document.getElementById("close-task-button");
const dueDate = document.getElementById("due-date");
dueDate.value = format(new Date(), "yyyy-MM-dd"); // select today as default

const openModal = function () {
  // e.preventDefault();
  taskModal.classList.remove("invisible", "opacity-0");
  overlay.classList.remove("invisible", "opacity-0");
  dueDate.value = format(new Date(), "yyyy-MM-dd");
};

const closeModal = function () {
  taskModal.classList.add("invisible", "opacity-0");
  overlay.classList.add("invisible", "opacity-0");
  taskTitle.innerHTML = "";
  taskDescription.innerHTML = "";
  dueDate.value = "";
};

// Open modal with "a", close modal with "Esc"
document.addEventListener("keydown", function (e) {
  if (!(e.key === "a" || e.key === "Escape")) return;

  switch (e.key) {
    case "a":
      openModal();
      break;
    case "Escape":
      closeModal();
      break;
  }
});

taskModal.addEventListener("transitionend", function (e) {
  if (e.propertyName !== "visibility") return;
  taskTitle.focus();
});

btnAddTask.addEventListener("click", openModal);
btnCloseTask.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// theme switching

const themeToggle = document.getElementById("theme-toggle");
const themeSelectionMenu = document.getElementById("theme-selection-menu");

themeSelectionMenu.addEventListener("click", changeTheme);

function changeTheme(e) {
  if (!e.target.dataset.theme) return;

  themeToggle.innerHTML = "";

  themeSelectionMenu
    .querySelectorAll("[data-active]")
    .forEach((el) => (el.dataset.active = false));
  e.target.dataset.active = true;

  highlightSelectedTheme();

  switch (e.target.dataset.theme) {
    case "dark":
      localStorage.theme = "dark";
      themeToggle.innerHTML = moonSVG;
      break;
    case "light":
      localStorage.theme = "light";
      themeToggle.innerHTML = sunSVG;
      break;
    default:
      localStorage.removeItem("theme");
      themeToggle.innerHTML = sysSVG;
      break;
  }

  setTheme();
}

function setTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function highlightSelectedTheme() {
  themeSelectionMenu
    .querySelector(`[data-active="true"]`)
    .classList.add(
      "bg-gray-300",
      "dark:bg-gray-700",
      "text-cyan-600",
      "dark:text-cyan-400"
    );

  themeSelectionMenu
    .querySelectorAll(`[data-active="false"]`)
    .forEach((el) =>
      el.classList.remove(
        "bg-gray-300",
        "dark:bg-gray-700",
        "text-cyan-600",
        "dark:text-cyan-400"
      )
    );

  hideThemeSelectionMenu();
}

setTheme();

if (!("theme" in localStorage)) {
  themeToggle.innerHTML = sysSVG;
  document.querySelector(`[data-theme="system"]`).dataset.active = true;
  highlightSelectedTheme();
}
if (localStorage.theme === "dark") {
  themeToggle.innerHTML = moonSVG;
  document.querySelector(`[data-theme="dark"]`).dataset.active = true;
  highlightSelectedTheme();
}
if (localStorage.theme === "light") {
  themeToggle.innerHTML = sunSVG;
  document.querySelector(`[data-theme="light"]`).dataset.active = true;
  highlightSelectedTheme();
}

//////
// theme button

const themeButton = document.getElementById("theme-button");

function showThemeSelectionMenu() {
  themeSelectionMenu.classList.toggle("invisible");
}
function hideThemeSelectionMenu() {
  themeSelectionMenu.classList.add("invisible");
}

themeButton.addEventListener("click", showThemeSelectionMenu);
document.addEventListener("click", function (e) {
  if (
    e.target.closest("#theme-selection-menu") ||
    e.target.closest("#theme-button")
  )
    return;
  hideThemeSelectionMenu();
});

// save task button

const saveButton = document.getElementById("save-task-button");
const prioritySelector = document.getElementById("priority-selector");
const priorities = document.querySelectorAll("[data-priority]");

const deselectPriorities = function () {
  priorities.forEach((e) => e.removeAttribute("data-selected"));
};

const getSelectedPriority = function () {
  return Array.from(priorities)
    .filter((e) => e.hasAttribute("data-selected"))
    .pop();
};

const highlightPriority = function () {
  const classesToAdd = "bg-slate-300 text-slate-800";
  priorities.forEach((e) => e.classList.remove(...cls(classesToAdd)));

  const selected = getSelectedPriority();
  selected.classList.add(...cls(classesToAdd));
};

const setPriority = function (e) {
  if (!e.target.dataset.priority) return;
  deselectPriorities();
  e.target.setAttribute("data-selected", "");
  highlightPriority();
};

prioritySelector.addEventListener("click", setPriority);

const getTaskDetails = function () {
  return {
    title: taskTitle.textContent,
    description: taskDescription.textContent,
    due: new Date(dueDate.value),
    priority: getSelectedPriority()?.dataset.priority || "",
  };
};

////// TESTING

export const project1 = new Project("project1");

const task1 = new Task(
  "Make a cake",
  "with carrots and walnuts",
  new Date(),
  "1",
  false
);
const task2 = new Task(
  "Finish todo project",
  "finish it",
  new Date(),
  "1",
  false
);
const task3 = new Task("Drink water", "yes please", new Date(), "2", false);
const task4 = new Task("Go for a walk", "5 kilometers", new Date(), "3", false);
const task5 = new Task(
  "Practice duolingo",
  "learn Dutch",
  new Date(),
  "4",
  false
);

project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);
project1.addTask(task4);
project1.addTask(task5);
viewTasks(project1);

saveButton.addEventListener("click", function () {
  const temp = getTaskDetails();
  const task = new Task(
    temp.title,
    temp.description,
    temp.due,
    temp.priority,
    false
  );
  project1.addTask(task);
  viewTasks(project1);
  closeModal();
});
