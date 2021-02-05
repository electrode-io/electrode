import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";

import { reactQueryFeature } from "@xarc/react-query";

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
