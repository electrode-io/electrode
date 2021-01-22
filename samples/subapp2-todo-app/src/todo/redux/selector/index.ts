import { VISIBILITY_FILTERS } from "../../constant";

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = store && store.todoList && store.todoList.todos ? store.todoList.todos : [];

  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
