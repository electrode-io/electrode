import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { useQuery } from "@xarc/react-query";
import classNames from "classnames";
const custom = require("../styles/bootstrap.css");
import { fetch } from "../constant";
import TodoInput from "./todo-input";
import TodoList from "./todolist";

function TodoApp() {
  const { status, data, error } = useQuery("test", fetch);
  const [inputStr, setInputStr] = React.useState("");
  console.log("Todo app");
  console.log(data);

  return (
    <div>
      <h1 className={classNames(custom["page-header"], custom["text-center"])}>My To-do List</h1>
      <TodoInput input={inputStr} setInput={setInputStr} />
      <TodoList status={status} todos={data?.todos} error={error} />
      {/* <VisibilityFilters /> */}
    </div>
  );
}

export const subapp: ReactSubApp = {
  Component: TodoApp
};
