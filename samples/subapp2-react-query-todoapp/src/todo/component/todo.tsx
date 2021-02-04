import { React } from "@xarc/react";
import { useMutation, QueryClient, useQuery } from "@xarc/react-query";
import { update, fetch, mockTodos } from "../constant";
const custom = require("../styles/bootstrap.css");

export const Todo = props => {
  const { todo } = props;

  console.log("Todo");
  console.log(todo);

  const mutation: any = useMutation("test", {
    onMutate: id => {
      console.log("Todo on mute");

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
        console.log("TODO   mutate here");
        mutation.mutate(todo.id);
      }}
    >
      {todo.completed ? "    ✅Completed  --  " : "    🔥TODO  --  "}
      <span>{todo && todo.content}</span>
    </li>
  );
};
