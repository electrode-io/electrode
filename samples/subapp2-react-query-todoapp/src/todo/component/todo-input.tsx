import { React, ReactSubApp } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import { addTodo } from "../redux/action";
import classNames from "classnames";
const custom = require("../styles/bootstrap.css");
import { create, mockTodos } from "../constant";
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
          console.log("coming Here on change");
          e.preventDefault();
          props.setInput((e.target as any).value);
        }}
        value={input}
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
