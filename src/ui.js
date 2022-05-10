import { moonSVG, sunSVG, sysSVG } from "./icons";

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

const openModal = function (e) {
  e.preventDefault();
  taskModal.classList.remove("invisible", "opacity-0");
  overlay.classList.remove("invisible", "opacity-0");
};

const closeModal = function (e) {
  taskModal.classList.add("invisible", "opacity-0");
  overlay.classList.add("invisible", "opacity-0");
  taskTitle.innerHTML = "";
  taskDescription.innerHTML = "";
};

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
