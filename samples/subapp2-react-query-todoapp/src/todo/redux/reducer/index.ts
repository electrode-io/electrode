import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "../action";
import { VISIBILITY_FILTERS } from "../../constant";

export const reduxReducers = {
  todoList: (state, action) => {
    switch (action.type) {
      case ADD_TODO: {
        const { id, content, completed } = action.payload;
        let todos = [];
        if (state.todos) {
          todos = [...state.todos, { id, content, completed }];
        } else {
          todos = [{ id, content, completed }];
        }

        return { todos: todos };
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
        return state || { todos: [] };
    }
  },
  visibilityFilter: (state, action) => {
    switch (action.type) {
      case SET_FILTER: {
        return action.payload.filter;
      }
      default: {
        return state || VISIBILITY_FILTERS.ALL;
      }
    }
  }
};
