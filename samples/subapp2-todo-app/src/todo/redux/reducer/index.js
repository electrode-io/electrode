import { ADD_TODO, TOGGLE_TODO } from "../action";

export const reduxReducers = {
  todoList: (state, action) => {
    switch (action.type) {
      case ADD_TODO: {
        const { id, content, completed } = action.payload;
        let todos = [];
        if (state.todos) {
          todos = [...state.todos, {id, content, completed}];
        } else {
          todos = [{id, content, completed}];
        }

        return {todos: todos};
      }
      case TOGGLE_TODO: {
        const { id } = action.payload;

        const todos = state.todos.map(curElement => {
          if (curElement.id === id) {
            return {
              ...curElement,
              completed: !curElement.completed
            };
          }

          return curElement;
        });

        return { todos: todos };
      }
      
      default:
        return state || { todos: []};
    }
  }
};
