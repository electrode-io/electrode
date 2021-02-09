import { React, ReactSubApp } from "@xarc/react";
import { useQuery } from "@xarc/react-query";
import classNames from "classnames";
const custom = require("../styles/bootstrap.css");
import { VISIBILITY_FILTERS } from "../constant";
import { fetch } from "../mock-fetch";
import TodoInput from "./todo-input";
import TodoList from "./todolist";
import VisibilityFilters from "./visibility-filters";

function TodoApp() {
  const { status, data, error } = useQuery("test", fetch, {
    // Refetch the data every second
    refetchInterval: 1000
  });

  let todos = [];

  if (data) {
    todos = data.todos.filter(e => {
      if (data.filter === VISIBILITY_FILTERS.ALL) {
        return true;
      } else if (data.filter === VISIBILITY_FILTERS.COMPLETED) {
        if (e.completed) {
          return true;
        }

        return false;
      } else {
        if (!e.completed) {
          return true;
        }

        return false;
      }
    });
  }

  return (
    <div style={{ margin: "24px" }}>
      <h1 className={classNames(custom["page-header"], custom["text-center"])}>My To-do List</h1>
      <TodoInput />
      <TodoList status={status} todos={todos} error={error} />
      <VisibilityFilters />
    </div>
  );
}

export const subapp: ReactSubApp = {
  Component: TodoApp
};
