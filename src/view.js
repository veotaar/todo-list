import { format } from "date-fns";
import { binSVG } from "./icons";
import { project1 } from "./ui";

const tasksDiv = document.getElementById("tasks");

export const viewTasks = function (project) {
  tasksDiv.innerHTML = "";
  project.tasks.forEach((task) => {
    tasksDiv.insertAdjacentHTML(
      "beforeend",
      `
      <li class="flex items-center gap-4" data-id="${task.id}">
        <input type="checkbox" class="h-6 w-6 cursor-pointer rounded-full border-gray-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 focus:ring-opacity-50 text-rose-500"/>
        <div class="flex gap-2 items-center border-b border-slate-700 w-full p-1 leading-tight">
          <div class="flex-1">
            <p class="font-bold tracking-wide">${task.title}</p>
            <p class="font-normal text-slate-400 tracking-wide">${
              task.description
            }</p>
          </div>
          <button><div class="p-2">${binSVG}</div></button>
          <p>${format(task.dueDate, "dd MMM yyyy")} </p>
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
