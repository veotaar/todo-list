import { format } from "date-fns";
import { binSVG } from "./icons";

import { projectManager } from "./project-manager";

const tasksDiv = document.getElementById("tasks");
const projectsUL = document.getElementById("projects");
const projectName = document.getElementById("project-name");

const viewProjectName = () =>
  (projectName.innerText = projectManager.currentProject.name);

export const viewTasks = function (project = projectManager.currentProject) {
  tasksDiv.innerHTML = "";
  viewProjectName();
  project.tasks.forEach((task) => {
    // rose orange blue neutral
    let checkboxStyles;

    switch (task.priority) {
      case "1":
        checkboxStyles =
          "bg-rose-200 ring-rose-700 focus:ring-rose-200 text-rose-700";
        break;
      case "2":
        checkboxStyles =
          "bg-orange-200 ring-orange-600 focus:ring-orange-200 text-orange-600";
        break;
      case "3":
        checkboxStyles =
          "bg-blue-200 ring-blue-700 focus:ring-blue-200 text-blue-700";
        break;
      default:
        checkboxStyles =
          "bg-neutral-200 ring-neutral-700 focus:ring-neutral-200 text-neutral-700";
        break;
    }

    tasksDiv.insertAdjacentHTML(
      "beforeend",
      `
      <li class="flex items-center gap-4 border-b last:border-b-0 border-slate-700" data-id="${
        task.id
      }">


        <input type="checkbox" data-id="${task.id}" ${
        task.done ? "checked" : ""
      } class="h-6 w-6 cursor-pointer border-none rounded-full ring-4 focus:ring-2 focus:ring-opacity-50 ${checkboxStyles}"/>
        <div class="flex items-center w-full p-2 leading-tight">
          <div class="flex-1">
            <p class="font-bold tracking-wide ${
              task.done ? "line-through" : ""
            } ">${task.title}</p>
            <p class="font-normal text-slate-400 tracking-wide ${
              task.done ? "line-through" : ""
            }">${task.description}</p>
          </div>
          <button aria-label="delete task"><div class="p-2 text-slate-600 hover:text-slate-300">${binSVG}</div></button>
          <p class="text-sm text-slate-400">${format(
            task.dueDate,
            "MMM do"
          )} </p>
        </div>

      </li>
      `
    );
  });
};

tasksDiv.addEventListener("click", function (e) {
  if (!e.target.closest("button div")) return;

  projectManager.currentProject.deleteTask(e.target.closest("li").dataset.id);
  viewTasks();
});

tasksDiv.addEventListener("input", function (e) {
  projectManager.currentProject.getTask(e.target.dataset.id).toggleDone();
  projectManager.currentProject.moveTaskToTheEnd(e.target.dataset.id);
  viewTasks();
});

/////////////////////
// View Project

export const viewProjects = function (projectManager) {
  projectsUL.innerHTML = "";
  projectManager.projects.forEach((project) => {
    // do not show "Inbox" default project in projects list
    if (project.name === "Inbox") return;
    projectsUL.insertAdjacentHTML(
      "beforeend",
      `
    <li
      data-id="${project.id}"
      class="cursor-pointer hover:border-l px-4 py-1 my-1 ${
        project.isCurrent
          ? "border-l border-rose-600 font-bold text-rose-600"
          : ""
      }"
    >
      ${project.name}
    </li>
    `
    );
  });
};

projectsUL.addEventListener("click", function (e) {
  if (!e.target.dataset.id) return;
  projectManager.setCurrentProject(e.target.dataset.id);
  viewProjects(projectManager);
  viewTasks();

  // remove style from default pages (Inbox, Today, Upcoming)
  document
    .getElementById("inbox")
    .classList.remove(
      "border-l",
      "border-rose-600",
      "font-bold",
      "text-rose-600"
    );
});
