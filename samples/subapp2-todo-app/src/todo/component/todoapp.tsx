import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";

export const TodoInput = createDynamicComponent(
  {
    name: "todoinput",
    getModule: () => import("./todo-input")
  }
);

export const TodoList = createDynamicComponent(
  {
    name: "todolist",
    getModule: () => import("./todolist")
  }
);

function TodoApp() {
  return (
    <div>
      <h1>My To-do List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export const subapp: ReactSubApp = {
  Component: TodoApp
};
