import { projectManager } from "./project-manager";
import { createProject } from "./utils";
import { viewTasks, viewProjects } from "./view";

const inbox = document.getElementById("inbox");
inbox.classList.add(
  "border-l",
  "border-rose-600",
  "font-bold",
  "text-rose-600"
);

createProject("Inbox");
const inboxProjectID = projectManager.getProjectByName("Inbox").id;
viewTasks();

inbox.addEventListener("click", function () {
  inbox.classList.add(
    "border-l",
    "border-rose-600",
    "font-bold",
    "text-rose-600"
  );

  projectManager.setCurrentProject(inboxProjectID);
  viewProjects(projectManager);
  viewTasks();
});
