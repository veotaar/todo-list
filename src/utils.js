import { projectManager } from "./project-manager";
import { Project } from "./project";

export function cls(classString) {
  return classString.split(" ");
}

export function createProject(projectName) {
  const project = new Project(projectName);
  projectManager.addProject(project);
  projectManager.setCurrentProject(project.id);
}
