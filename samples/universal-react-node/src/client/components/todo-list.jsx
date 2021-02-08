// @flow

import React from "react";
import PropTypes from "prop-types";
import Todo from "./todo";

type ToDoList = {
  todos: Array<Object>, //  eslint-disable-line
  onTodoClick: (value: SyntheticEvent<>) => void  //  eslint-disable-line
};

const TodoList = ({ todos, onTodoClick }: ToDoList) => {
  return (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
