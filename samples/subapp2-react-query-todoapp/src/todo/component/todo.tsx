import { React } from "@xarc/react";
import { useMutation, useQuery } from "@xarc/react-query";
import { update, fetch, mockTodos } from "../mock-fetch";
const custom = require("../styles/bootstrap.css");

export const Todo = props => {
  const { todo } = props;
  const mutation: any = useMutation(update);

  return (
    <li className={custom["list-group-item"]} onClick={() => {}}>
      <input type="checkbox" checked={todo.completed} onChange={() => mutation.mutate(todo.id)} />
      <span>
        {"    "}
        {todo && todo.content}
      </span>
    </li>
  );
};
