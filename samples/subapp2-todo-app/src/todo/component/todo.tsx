import { React } from "@xarc/react";
import { toggleTodo } from "../redux/action";
const custom = require("../styles/bootstrap.css");

export const Todo = props => {
  const { todo, dispatch } = props;

  return (
    <li className={custom["list-group-item"]}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />
      <span>
        {"    "}
        {todo && todo.content && todo.content}
      </span>
    </li>
  );
};
