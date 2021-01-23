import { React } from "@xarc/react";
import { toggleTodo } from "../redux/action";
const custom = require("../styles/bootstrap.css");

export const Todo = props => {
  const { todo, dispatch } = props;

  return (
    <li
      className={custom["list-group-item"]}
      onClick={() => {
        dispatch(toggleTodo(todo.id));
      }}
    >
      {todo.completed === true ? "    ✅Completed  --  " : "    🔥TODO  --  "}
      <span>{todo && todo.content && todo.content}</span>
    </li>
  );
};
