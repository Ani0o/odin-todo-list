import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

const projects = [];

function addProject(title) {
    projects.push(createProject(title));
}

function updateProjects(newProjects) {
    newProjects.forEach(project => {
        projects.push(project);
    });
}

function deleteProject(id) {
    projects.forEach((project, index) => {
        if (project.id === id) {
            projects.splice(index, 1);
        }
    });
}

function addTodoInProject(id, title, description, priority, date) {
    projects.forEach(project => {
        if (project.id === id) {
            project.addTodo(createTodo(title, description, priority, date));
        }
    });
}

function updateTodoInProject(projectId, todoId, priority, date) {
    projects.forEach(project => {
        if (project.id === projectId) {
            project.updateTodo(todoId, priority, date);
        }
    });
}

function deleteTodoFromProject(projectId, todoId) {
    projects.forEach(project => {
        if (project.id === projectId) {
            project.deleteTodo(todoId);
        }
    });
}

function changeComplete(projectId, todoId) {
    projects.forEach(project => {
        if (project.id === projectId) {
            project.getTodo(todoId).toggleComplete();
        }
    });
}

export {
    projects,
    addProject,
    updateProjects,
    deleteProject,
    addTodoInProject,
    updateTodoInProject,
    deleteTodoFromProject,
    changeComplete
}
