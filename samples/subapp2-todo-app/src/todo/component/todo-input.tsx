import { React, ReactSubApp } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import { addTodo } from "../redux/action";
import classNames from "classnames";
import custom from "../styles/bootstrap.css";

const TodoInput = props => {
  const [input, setInput] = React.useState("");
  const { dispatch } = props;
  return (
    <div className={custom["input-group"]}>
      <input
        className={classNames(custom["form-control"])}
        onChange={e => setInput(e.target.value)}
        value={input}
      />
      <span className={custom["input-group-btn"]}>
        <button
          className={classNames(custom["btn"], custom["btn-default"])}
          onClick={() => {
            if (input) dispatch(addTodo(input), setInput(""));
          }}
        >
          Add Todo
        </button>
      </span>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: connect(null, dispatch => ({ dispatch }))(TodoInput)
};
