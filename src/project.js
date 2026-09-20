class Project {
    constructor(id, title, todos) {
        this.id = id;
        this.title = title;
        this.todos = todos;
    }

    getTodo(id) {
        this.todos.forEach(todo => {
            if (todo.id === id) {
                return todo;
            }
        });
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    updateTodo(id, priority, date) {
        this.todos.forEach(todo => {
            if (todo.id === id) {
                todo.priority = priority;
                todo.date = date;
            }
        });
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