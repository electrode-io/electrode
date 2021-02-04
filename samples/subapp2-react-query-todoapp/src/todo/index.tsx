import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";
import { VISIBILITY_FILTERS } from "./constant";

export { reduxReducers } from "./redux/reducer";
import { reactQueryFeature, useQuery } from "@xarc/react-query";

export const TodoApp = createDynamicComponent({
  name: "todoapp",
  getModule: () => import("./component/todoapp")
});

const Todo = () => {
  return (
    <div>
      <TodoApp />
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Todo,

  wantFeatures: [reactQueryFeature({ React })]
};
