import { ADD_TODO, TOGGLE_TODO } from "../action";

export const initialState = {
  todos: [],
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content, completed } = action.payload;
      return {
        todos: [
          ...state.todos,
          {
            id,
            content,
            completed,
          },
        ],
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      const todos = state.todos.map((curElement) => {
        if (curElement.id === id) {
          return {
            ...curElement,
            completed: !curElement.completed,
          };
        }

        return curElement;
      });

      return { todos: todos };
    }
    default:
      return state;
  }
}
