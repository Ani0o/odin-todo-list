class Todo {
    constructor(id, title, description, priority, date, complete) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.complete = complete;
    }

    toggleComplete() {
        if (this.complete === "true") {
            this.complete = "false";
        } else {
            this.complete = "true";
        }
    }
}

function createTodo(title, description, priority, date) {
    return new Todo(crypto.randomUUID(), title, description, priority, date, "false");
}

function updateTodo(todo, priority, date) {
    todo.priority = priority;
    todo.date = date;
    return todo;
}

export { Todo, createTodo, updateTodo };