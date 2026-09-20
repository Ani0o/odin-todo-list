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