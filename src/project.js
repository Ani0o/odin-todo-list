class Project {
    constructor(id, title, todos) {
        this.id = id;
        this.title = title;
        this.todos = todos;
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(id) {
        this.todos.forEach((todo, index) => {
            if (todo.id === id) {
                this.todos.splice(index, 1);
            }
        });
    }
}

function createProject(title) {
    return new Project(crypto.randomUUID(), title, []);
}

export { Project, createProject };