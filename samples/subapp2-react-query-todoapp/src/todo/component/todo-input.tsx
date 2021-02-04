import { React } from "@xarc/react";
import classNames from "classnames";
const custom = require("../styles/bootstrap.css");
import { create, mockTodos } from "../mock-fetch";
import { useMutation, QueryClient } from "@xarc/react-query";

const TodoInput = props => {
  const { input } = props;
  const mutation: any = useMutation("test", {
    onMutate: variables => {
      create(variables as any);
      return mockTodos.todos;
    },
    onError: (error, variables, context) => {
      (QueryClient as any).refetchQueries("test");
    },
    onSuccess: (data, variables, context) => {
      (QueryClient as any).refetchQueries("test");
    },
    onSettled: (data, error, variables, context) => {
      (QueryClient as any).refetchQueries("test");
    }
  });

  return (
    <div className={custom["input-group"]}>
      <input
        className={classNames(custom["form-control"])}
        onChange={e => {
          e.preventDefault();
          props.setInput((e.target as any).value);
        }}
        value={input}
        onKeyDown={e => {
          if (e.keyCode === 13 && input) {
            mutation.mutate({ content: input });
            props.setInput("");
          }
        }}
      />
      <span className={custom["input-group-btn"]}>
        <button
          className={classNames(custom["btn"], custom["btn-default"])}
          onClick={() => {
            if (input) {
              mutation.mutate({ content: input });
              props.setInput("");
            }
          }}
        >
          Add Todo
        </button>
      </span>
    </div>
  );
};

export default TodoInput;
