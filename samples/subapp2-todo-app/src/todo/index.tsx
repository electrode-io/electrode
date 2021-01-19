import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";
import { ADD_TODO, TOGGLE_TODO } from "./redux/action";

const initState = {
  todos: [],
};

export const TodoApp = createDynamicComponent(
  {
    name: "todoapp",
    getModule: () => import("./component/todoapp"),
  },
);

const Todo = () => (
  <div>
    <TodoApp />
  </div>
);

export function reduxReducers(state = initState, action) {

  

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
      console.log('reducer')
      console.log(id)
      console.log(state)
      console.log(state.todos)
      const todos = state.todos.map((curElement) => {
        if (curElement.id === id) {
          return {
            ...curElement,
            completed: !curElement.completed,
          };
        }

        return curElement;
      });

      console.log(todos)
      return { todos: todos };
    }
    default:
      return state;
  }
}

export const subapp: ReactSubApp = {
  Component: Todo,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async initialState => {
        console.log("Home (home.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return {
            initialState: {
              todos: []
            }
          };
        }
      }
    }),
  ],
};
