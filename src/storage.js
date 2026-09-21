import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { projects } from "./projectManager.js";

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function storeData() {
    if (storageAvailable("localStorage")) {
        localStorage.setItem("projectsData", JSON.stringify(projects));
    }
}

function retrieveData() {
    if (storageAvailable("localStorage")) {
        const rawData = JSON.parse(localStorage.getItem("projectsData"));

        if (rawData === null) return [];

        const restoredProjects = rawData.map(project => {
            project.todos = project.todos.map(todo => new Todo(todo.id, todo.title, todo.description, todo.priority, todo.date, todo.complete));
            return new Project(project.id, project.title, project.todos);
        });

        return restoredProjects;
    } else {
        return [];
    }
}

export { storeData, retrieveData };
