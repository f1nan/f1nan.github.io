function getElement(name) {
    const element = document.querySelector(`[data-${name}]`);
    if (!element) {
        throw new Error(`${name} not found`);
    }

    return element;
}

const getNewTodoForm = () => getElement("new-todo-form");
const getNewTodoInput = () => getElement("new-todo-input");
const getHeaderButtonsContainer = () => getElement("header-buttons");
const getTodoCountElement = () => getElement("todo-count");
const getTodosContainer = () => getElement("todos");
const getTodosTitle = () => getElement("todos-title");
const getClearCompletedButton = () => getElement("clear-completed-button");
const getClearallButton = () => getElement("clear-all-button");
const getTodoTemplate = () => getElement("todo-template");
const getTodoListsListTemplate = () => getElement("todo-lists-list");
const getTodoListsList = () => getElement("todo-lists");
const getNewTodoListForm = () => getElement("new-todo-list-form");
const getNewTodoListInput = () => getElement("new-todo-list-input");

export const elements = {
    getNewTodoForm,
    getNewTodoInput,
    getHeaderButtonsContainer,
    getTodoCountElement,
    getTodosContainer,
    getTodosTitle,
    getClearCompletedButton,
    getClearallButton,
    getTodoTemplate,
    getTodoListsListTemplate,
    getTodoListsList,
    getNewTodoListForm,
    getNewTodoListInput,
};
