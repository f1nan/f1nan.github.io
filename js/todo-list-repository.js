export class TodoListRepository {
    constructor(todoLists) {
        this._todoLists = todoLists || [];
    }

    first() {
        return this._todoLists[0];
    }

    findById(id) {
        return this._todoLists.find((todoList) => todoList.id === id);
    }

    findAll() {
        return [...this._todoLists];
    }

    add(todoList) {
        this._todoLists.push(todoList);
    }

    removeById(id) {
        this._todoLists = this._todoLists.filter(
            (todoList) => todoList.id !== id
        );
    }

    [Symbol.iterator]() {
        return this.findAll().values();
    }
}
