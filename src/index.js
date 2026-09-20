import "./styles.css";
import {
    projects,
    addProject,
    updateProjects,
    deleteProject,
    addTodoInProject,
    updateTodoInProject,
    deleteTodoFromProject,
    changeComplete
} from "./projectManager.js";

window.projects = projects;

addProject("MyProject");
addProject("Epik Game");
addProject("Trash Todos");

deleteProject(projects[2].id);

addTodoInProject(projects[0].id, "Do anki", "dude, do your fucking anki", "2", "2026-9-20");
addTodoInProject(projects[0].id, "Do the odin project", "do project you asshole", "2", "2026-9-20");

updateTodoInProject(projects[0].id, projects[0].todos[0].id, "3", "2026-9-21");

deleteTodoFromProject(projects[0].id, projects[0].todos[0].id);

changeComplete(projects[0].id, projects[0].todos[0].id);

console.log(projects);