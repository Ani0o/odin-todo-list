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
import { storeData, retrieveData } from "./storage.js";

window.projects = projects;

updateProjects(retrieveData());

console.log(projects);

const newProject = document.querySelector('.new-project-button');
const projectDialog = document.querySelector('.project-dialog');
newProject.addEventListener('click', (e) => {
    projectDialog.showModal();
});
