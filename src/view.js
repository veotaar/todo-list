import { format } from "date-fns";
import { binSVG } from "./icons";
import { project1 } from "./ui";

const tasksDiv = document.getElementById("tasks");

export const viewTasks = function (project) {
  tasksDiv.innerHTML = "";
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
      <li class="flex items-center gap-4" data-id="${task.id}">
        <input type="checkbox" data-id="${task.id}" ${
        task.done ? "checked" : ""
      } class="h-6 w-6 cursor-pointer border-none rounded-full ring-4 focus:ring-2 focus:ring-opacity-50 ${checkboxStyles}"/>
        <div class="flex gap-2 items-center border-b border-slate-700 w-full p-1 leading-tight">
          <div class="flex-1">
            <p class="font-bold tracking-wide">${task.title}</p>
            <p class="font-normal text-slate-400 tracking-wide">${
              task.description
            }</p>
          </div>
          <button><div class="p-2">${binSVG}</div></button>
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

  project1.deleteTask(e.target.closest("li").dataset.id);
  viewTasks(project1);
});

tasksDiv.addEventListener("input", function (e) {
  project1.getTask(e.target.dataset.id).toggleDone();
});
