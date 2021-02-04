import { React } from "@xarc/react";
import { useMutation, useQuery } from "@xarc/react-query";
import { update, fetch, mockTodos } from "../mock-fetch";
const custom = require("../styles/bootstrap.css");

export const Todo = props => {
  const { todo } = props;

  const mutation: any = useMutation("test", {
    onMutate: id => {
      update(id);
      return mockTodos.todos;
    },
    onError: (error, variables, context) => {
      const { status, data } = useQuery("test1", fetch);
    },
    onSuccess: (data, variables, context) => {
      const { status } = useQuery("test2", fetch);
    },
    onSettled: (data, error, variables, context) => {
      const { status } = useQuery("test3", fetch);
    }
  });

  return (
    <li
      className={custom["list-group-item"]}
      onClick={() => {
        mutation.mutate(todo.id);
      }}
    >
      {todo.completed ? "    ✅Completed  --  " : "    🔥TODO  --  "}
      <span>{todo && todo.content}</span>
    </li>
  );
};
