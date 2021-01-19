import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";
export { reduxReducers } from "./redux/reducer"

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
