import { moonSVG, sunSVG, sysSVG } from "./icons";
import { cls } from "./utils";
import { Task } from "./task";
import { Project } from "./project";
import { createProject } from "./utils";
import { projectManager } from "./project-manager";
import { viewTasks } from "./view";
import { viewProjects } from "./view";
import { format } from "date-fns";

const taskTitle = document.getElementById("task-title");
const projectTitle = document.getElementById("project-title");
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

let modalIsOpen = false;

const taskModal = document.getElementById("add-task-modal");
const projectModal = document.getElementById("add-project-modal");
const overlay = document.getElementById("overlay");
const btnAddTask = document.getElementById("add-task-button");
const btnAddProject = document.getElementById("add-project-button");
const btnCloseTask = document.getElementById("close-task-button");
const btnCloseProject = document.getElementById("close-project-button");
const dueDate = document.getElementById("due-date");
dueDate.value = format(new Date(), "yyyy-MM-dd"); // select today as default

const openTaskModal = function () {
  // e.preventDefault();
  // taskModal.classList.remove("invisible", "opacity-0");
  // overlay.classList.remove("invisible", "opacity-0");
  taskModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  dueDate.value = format(new Date(), "yyyy-MM-dd");
  taskTitle.focus();
  modalIsOpen = true;
};

const closeTaskModal = function () {
  // taskModal.classList.add("invisible", "opacity-0");
  // overlay.classList.add("invisible", "opacity-0");
  taskModal.classList.add("hidden");
  overlay.classList.add("hidden");
  taskTitle.innerHTML = "";
  taskDescription.innerHTML = "";
  dueDate.value = "";
  modalIsOpen = false;
};

const openProjectModal = function () {
  // projectModal.classList.remove("invisible", "opacity-0");
  // overlay.classList.remove("invisible", "opacity-0");
  projectModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  projectTitle.focus();
  modalIsOpen = true;
};

const closeProjectModal = function () {
  // projectModal.classList.add("invisible", "opacity-0");
  // overlay.classList.add("invisible", "opacity-0");
  projectModal.classList.add("hidden");
  overlay.classList.add("hidden");
  projectTitle.value = "";
  modalIsOpen = false;
};

// Open modal with "a", close modal with "Esc"
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    closeTaskModal();
    closeProjectModal();
  }
  if (!(e.key === "a" || e.key === "p") || modalIsOpen) return;

  switch (e.key) {
    case "a":
      openTaskModal();
      break;
    case "p":
      openProjectModal();
      break;
  }
});

// taskModal.addEventListener("transitionend", function (e) {
//   if (e.propertyName !== "visibility") return;
//   taskTitle.focus();
// });

btnAddTask.addEventListener("click", openTaskModal);
btnCloseTask.addEventListener("click", closeTaskModal);

btnAddProject.addEventListener("click", openProjectModal);
btnCloseProject.addEventListener("click", closeProjectModal);

overlay.addEventListener("click", function () {
  closeProjectModal();
  closeTaskModal();
});

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

// saving a task

const saveTaskButton = document.getElementById("save-task-button");
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

const highlightPriority = function (priority) {
  const classes = {
    1: "border-rose-700 dark:border-rose-700 bg-rose-700 text-rose-50",
    2: "border-orange-700 dark:border-orange-700 bg-orange-700 text-orange-50",
    3: "border-blue-700 dark:border-blue-700 bg-blue-700 text-blue-50",
    4: "border-neutral-700 dark:border-neutral-700 bg-neutral-700 text-neutral-50",
  };

  priorities.forEach((e) =>
    e.classList.remove(...cls(classes[e.dataset.priority]))
  );

  const selected = getSelectedPriority();
  selected.classList.add(...cls(classes[priority]));
};

const setPriority = function (e) {
  if (!e.target.dataset.priority) return;
  deselectPriorities();
  e.target.setAttribute("data-selected", "");
  highlightPriority(e.target.dataset.priority);
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

////////////////////////////////
// Saving a project

const saveProjectButton = document.getElementById("save-project-button");

saveProjectButton.addEventListener("click", function () {
  if (projectTitle.value === "") return;

  createProject(projectTitle.value);
  closeProjectModal();
  viewProjects(projectManager);
  viewTasks();
  document
    .getElementById("inbox")
    .classList.remove(
      "border-l",
      "border-rose-600",
      "font-bold",
      "text-rose-600"
    );
});

// save project when Enter is pressed
projectModal.addEventListener("keyup", function (e) {
  if (e.shiftKey) return;
  if (e.key !== "Enter") return;

  if (projectTitle.value === "") return;

  createProject(projectTitle.value);
  closeProjectModal();
  viewProjects(projectManager);
  viewTasks();
  document
    .getElementById("inbox")
    .classList.remove(
      "border-l",
      "border-rose-600",
      "font-bold",
      "text-rose-600"
    );
});

/////////////////////////////
////// Saving a task

saveTaskButton.addEventListener("click", function () {
  const temp = getTaskDetails();
  const task = new Task(
    temp.title,
    temp.description,
    temp.due,
    temp.priority,
    false
  );
  projectManager.currentProject.addTask(task);
  viewTasks();
  closeTaskModal();
});

// save task when Enter is pressed
taskModal.addEventListener("keydown", function (e) {
  if (e.shiftKey) return;
  if (e.key !== "Enter") return;

  const temp = getTaskDetails();
  const task = new Task(
    temp.title,
    temp.description,
    temp.due,
    temp.priority,
    false
  );
  projectManager.currentProject.addTask(task);
  viewTasks();
  closeTaskModal();
});
