import { React } from "@xarc/react";
const custom = require("../styles/bootstrap.css");
import { Todo } from "./todo";

const TodoList = ({ status, todos, error }) => {
  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "error") {
    return <div>Error Message: {JSON.stringify(error)}</div>;
  }

  return (
    <ul className={custom["list-group"]}>
      {todos && todos.length ? (
        todos.map(todo => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      ) : (
        <li className={custom["list-group-item"]}>Empty List!</li>
      )}
    </ul>
  );
};

export default TodoList;
