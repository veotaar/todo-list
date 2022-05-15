class ProjectManager {
  constructor() {
    this.projects = [];
    this.currentProject = "";
  }

  addProject(project) {
    this.projects.push(project);
  }

  deleteProject(id) {
    const indexToDelete = this.projects.findIndex((e) => e.id === id);
    this.projects.splice(indexToDelete, 1);
  }

  getProject(id) {
    const index = this.projects.findIndex((e) => e.id === id);
    return this.projects.at(index);
  }

  setCurrentProject(id) {
    this.currentProject = this.getProject(id);
  }
}

export const projectManager = new ProjectManager();
