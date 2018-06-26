// @flow

import React from "react";
import PropTypes from "prop-types";

type ToDo = {
  onClick: (value: SyntheticEvent<>) => void,
  completed: boolean,
  text: string
};

const Todo = ({ onClick, completed, text }: ToDo) => {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? "line-through" : "none"
      }}
    >
      {text}
    </li>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
