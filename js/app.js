import { elements } from "./elements.js";
import { TodoStorage } from "./todo-storage.js";
import { createTodo } from "./create-todo.js";
import { COMPLETED, OPEN, View } from "./view.js";
import { TodoList } from "./todo-list.js";

class App {
    constructor() {
        this._storage = new TodoStorage();
        this._currentView = View.createDefaultView();
        this._todoListsList = elements.getTodoListsList();
        this._newTodoListForm = elements.getNewTodoListForm();
        this._newTodoListInput = elements.getNewTodoListInput();
        this._newTodoForm = elements.getNewTodoForm();
        this._newTodoInput = elements.getNewTodoInput();
        this._headerButtonsContainer = elements.getHeaderButtonsContainer();
        this._todoCountElement = elements.getTodoCountElement();
        this._todosContainer = elements.getTodosContainer();
        this._todosTitle = elements.getTodosTitle();
        this._clearCompletedButton = elements.getClearCompletedButton();
        this._todoTemplate = elements.getTodoTemplate();
        this._todoListsListTemplate = elements.getTodoListsListTemplate();
        this._addEventListeners();
    }

    render() {
        this._renderTodosTitle();
        this._renderHeaderButtons();
        this._renderTodoCount();
        this._renderTodos();
        this._renderTodoLists();
    }

    get _visibleTodos() {
        if (this._currentView.equals(COMPLETED)) {
            return this._storage.currentTodoList.findCompleted();
        } else if (this._currentView.equals(OPEN)) {
            return this._storage.currentTodoList.findOpen();
        } else {
            return this._storage.currentTodoList.findAll();
        }
    }

    _saveAndRender() {
        this._storage.save();
        this.render();
    }

    _clear(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    _renderTodoLists() {
        this._clear(this._todoListsList);
        for (const todoList of this._storage.todoLists) {
            this._renderTodoListsList(todoList);
        }
    }

    _renderTodoListsList(todoList) {
        const element = document.importNode(
            this._todoListsListTemplate.content,
            true
        );

        this._renderTodoListsListElement(todoList, element);
        this._renderTodoListsListDeleteButton(todoList, element);

        this._todoListsList.appendChild(element);
    }

    _renderTodoListsListElement(todoList, element) {
        const li = element.querySelector("li");
        if (todoList === this._storage.currentTodoList) {
            li.classList.add("TodoLists_list___active");
        }

        li.id = todoList.id;
        element.querySelector("span").innerText = todoList.name;

        li.addEventListener("click", (e) => {
            this._storage.currentTodoList = todoList;
            this._saveAndRender();
            this._todosTitle.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
            this._newTodoInput.focus({ preventScroll: true });
        });
    }

    _renderTodoListsListDeleteButton(todoList, element) {
        element.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            if (this._storage._todoLists.findAll().length <= 1) {
                return;
            }

            this._storage.todoLists.removeById(todoList.id);
            this._saveAndRender();
        });
    }

    _renderTodosTitle() {
        this._todosTitle.innerText = this._storage.currentTodoList.name;
    }

    _renderHeaderButtons() {
        Array.from(this._headerButtonsContainer.children).forEach((button) => {
            button.classList.remove("TodoList_headerButton___active");
            if (this._currentView.equals(button.dataset.view)) {
                button.classList.add("TodoList_headerButton___active");
            }
        });
    }

    _renderTodoCount() {
        this._todoCountElement.innerHTML = `${
            this._storage.currentTodoList.findOpen().length
        } open`;
    }

    _renderTodos() {
        this._clear(this._todosContainer);
        for (const todo of this._visibleTodos) {
            this._renderTodo(todo);
        }
    }

    _renderTodo(todo) {
        const todoEl = document.importNode(this._todoTemplate.content, true);
        const checkbox = todoEl.querySelector("input");
        checkbox.id = todo.id;
        checkbox.checked = todo.completed;
        const label = todoEl.querySelector("label");
        label.htmlFor = todo.id;
        const todoText = label.querySelectorAll("span")[1];
        todoText.innerText = todo.text;
        const button = todoEl.querySelector("button");
        button.addEventListener("click", (e) => {
            this._storage.currentTodoList.removeById(todo.id);
            this._saveAndRender();
        });
        this._todosContainer.appendChild(todoEl);
    }

    _addEventListeners() {
        this._newTodoListForm.addEventListener(
            "submit",
            this._handleNewTodoList
        );
        this._headerButtonsContainer.addEventListener(
            "click",
            this._handleViewChange
        );
        this._newTodoForm.addEventListener("submit", this._handleNewTodo);
        this._todosContainer.addEventListener(
            "change",
            this._handleTodoCompletedChange
        );
        this._clearCompletedButton.addEventListener(
            "click",
            this._handleClearCompleted
        );
    }

    _handleNewTodoList = (e) => {
        e.preventDefault();
        if (!this._newTodoListInput.value) {
            return;
        }

        this._storage.todoLists.add(
            new TodoList({ name: this._newTodoListInput.value })
        );
        this._newTodoListInput.value = "";
        this._saveAndRender();
    };

    _handleViewChange = (e) => {
        if (!e.target.dataset.view) {
            return;
        }

        this._currentView = new View(e.target.dataset.view);
        this.render();
    };

    _handleNewTodo = (e) => {
        e.preventDefault();
        if (!this._newTodoInput.value) {
            return;
        }

        this._storage.currentTodoList.add(createTodo(this._newTodoInput.value));
        this._newTodoInput.value = "";
        this._saveAndRender();
    };

    _handleTodoCompletedChange = (e) => {
        const todo = this._storage.currentTodoList.findById(e.target.id);
        todo.completed = e.target.checked;
        this._saveAndRender();
    };

    _handleClearCompleted = (e) => {
        this._storage.currentTodoList.removeCompleted();
        this._saveAndRender();
    };
}

const app = new App();
app.render();
