import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";
import { VISIBILITY_FILTERS } from "./constant";

export { reduxReducers } from "./redux/reducer";

export const TodoApp = createDynamicComponent({
  name: "todoapp",
  getModule: () => import("./component/todoapp")
});

const Todo = () => (
  <div>
    <TodoApp />
  </div>
);

export const subapp: ReactSubApp = {
  Component: Todo,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async initialState => {
        if (initialState) {
          return { initialState };
        } else {
          return {
            initialState: {
              todoList: { todos: [] },
              visibilityFilter: VISIBILITY_FILTERS.ALL
            }
          };
        }
      }
    })
  ]
};
