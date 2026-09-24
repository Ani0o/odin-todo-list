import "./styles.css";
import {
    projects,
    addProject,
    updateProjects,
    deleteProject,
    addTodoInProject
} from "./projectManager.js";
import { storeData, retrieveData } from "./storage.js";
import { displayProjects, displayTodos } from "./display.js";

window.projects = projects;

updateProjects(retrieveData());
if (projects.length === 0) {
    addProject("My Project");
    addTodoInProject(projects[0].id, "Create TODOs!", "Need to create more TODOs", "3", (new Date()).toLocaleDateString('fr-CA'));
    displayProjects(projects[0]);
    displayTodos(projects[0]);
}

let selectedProject = projects[0];
displayProjects(selectedProject);
displayTodos(selectedProject);

const newProjectButton = document.querySelector('.new-project-button');
const projectDialog = document.querySelector('.project-dialog');
const projectForm = document.querySelector('.project-dialog form');
const newProjectCancelButton = document.querySelector('.project-form-cancel-button');

newProjectButton.addEventListener('click', (e) => {
    projectDialog.showModal();
});

newProjectCancelButton.addEventListener('click', (e) => {
    projectForm.reset();
    projectDialog.close();
});

projectDialog.addEventListener('close', (e) => {
    if (projectDialog.returnValue === 'submit') {
        const formData = new FormData(projectForm);
        const data = Object.fromEntries(formData.entries());

        addProject(data.title);
        displayProjects(selectedProject);
        storeData();

        projectForm.reset();
    }
    projectDialog.returnValue = '';
});

const projectList = document.querySelector('.side-nav-project-list');

projectList.addEventListener('click', (e) => {
    const targetChild = e.target.closest('.project');
    if (targetChild) {
        if (selectedProject.id === e.target.getAttribute('data-id')) return;
        projects.forEach((project) => {
            if (project.id === e.target.getAttribute('data-id')) {
                selectedProject = project;
            }
        });
        displayProjects(selectedProject);
        displayTodos(selectedProject);
    }
});

const deleteProjectButton = document.querySelector('.delete-project-button');

deleteProjectButton.addEventListener('click', (e) => {
    deleteProject(selectedProject.id);

    if (projects.length === 0) {
        addProject("My Project");
        addTodoInProject(projects[0].id, "Create TODOs!", "Need to create more TODOs", "3", (new Date()).toLocaleDateString('fr-CA'));
        displayProjects(projects[0]);
        displayTodos(projects[0]);
    }

    selectedProject = projects[0];
    displayProjects(selectedProject);
    displayTodos(selectedProject);
    storeData();
});

const newTodoButton = document.querySelector('.new-todo-button');
const todoDialog = document.querySelector('.todo-dialog');
const todoForm = document.querySelector('.todo-dialog form');
const newTodoCancelButton = document.querySelector('.todo-form-cancel-button');

newTodoButton.addEventListener('click', (e) => {
    todoDialog.showModal();
});

newTodoCancelButton.addEventListener('click', (e) => {
    todoForm.reset();
    todoDialog.close();
});

todoDialog.addEventListener('close', (e) => {
    if (todoDialog.returnValue === 'submit') {
        const formData = new FormData(todoForm);
        const data = Object.fromEntries(formData.entries());

        addTodoInProject(selectedProject.id, data.title, data.description, data.priority, data.duedate);
        displayTodos(selectedProject);
        storeData();

        todoForm.reset();
    }
    todoDialog.returnValue = '';
});
