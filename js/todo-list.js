export class TodoList {
    constructor({ id, name, todos } = {}) {
        this._id = id || `todo-list-${Date.now()}`;
        this._name = name || "My To-Dos";
        this._todos = todos || [];
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    add(todo) {
        this._todos.push(todo);
    }

    removeById(id) {
        this._todos = this._todos.filter((todo) => todo.id !== id);
    }

    removeCompleted() {
        this._todos = this.findOpen();
    }

    removeAll() {
        this._todos = [];
    }

    findById(id) {
        return this._todos.find((todo) => todo.id === id);
    }

    findCompleted() {
        return this._todos.filter((todo) => todo.completed);
    }

    findOpen() {
        return this._todos.filter((todo) => !todo.completed);
    }

    findAll() {
        return [...this._todos];
    }
}
