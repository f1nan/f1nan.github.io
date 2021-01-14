import { TodoListRepository } from "./todo-list-repository.js";
import { TodoList } from "./todo-list.js";

const LOCAL_STORAGE_TODO_LISTS_KEY = "todo-lists";
const LOCAL_STORAGE_CURRENT_TODO_LIST_ID_KEY = "current-todo-list-id";

function getTodoLists() {
    const todoListsData =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_LISTS_KEY)) || [];
    return todoListsData.map(
        (data) =>
            new TodoList({
                id: data._id,
                name: data._name,
                todos: data._todos,
            })
    );
}

function setTodoLists(todoLists) {
    localStorage.setItem(
        LOCAL_STORAGE_TODO_LISTS_KEY,
        JSON.stringify(todoLists)
    );
}

function getCurrentTodoListId() {
    return localStorage.getItem(LOCAL_STORAGE_CURRENT_TODO_LIST_ID_KEY);
}

function setCurrentTodoListId(currentTodoListId) {
    localStorage.setItem(
        LOCAL_STORAGE_CURRENT_TODO_LIST_ID_KEY,
        currentTodoListId
    );
}

export class TodoStorage {
    constructor() {
        this._todoLists = new TodoListRepository(getTodoLists());
        this._currentTodoListId = getCurrentTodoListId();
    }

    get todoLists() {
        return this._todoLists;
    }

    get currentTodoList() {
        let todoList = this.todoLists.findById(this._currentTodoListId);

        if (!todoList) {
            todoList = this.todoLists.first();
        }

        if (!todoList) {
            todoList = new TodoList();
            this.todoLists.add(todoList);
            this.currentTodoList = todoList;
            this.save();
        }

        return todoList;
    }

    set currentTodoList(todoList) {
        this._currentTodoListId = todoList.id;
    }

    save() {
        setTodoLists(this.todoLists.findAll());
        setCurrentTodoListId(this.currentTodoList.id);
    }
}
