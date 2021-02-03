import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import classNames from "classnames";
const custom = require("../styles/bootstrap.css");
import VisibilityFilters from "./visibility-filters";

export const TodoInput = createDynamicComponent({
  name: "todoinput",
  getModule: () => import("./todo-input")
});

export const TodoList = createDynamicComponent({
  name: "todolist",
  getModule: () => import("./todolist")
});

function TodoApp() {
  return (
    <div>
      <h1 className={classNames(custom["page-header"], custom["text-center"])}>My To-do List</h1>
      <TodoInput />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export const subapp: ReactSubApp = {
  Component: TodoApp
};
