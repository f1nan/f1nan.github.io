export function createTodo(text) {
    return { id: `todo-${Date.now()}`, text, completed: false };
}
