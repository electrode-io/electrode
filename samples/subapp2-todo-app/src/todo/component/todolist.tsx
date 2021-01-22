import { React, ReactSubApp } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import custom from "../styles/bootstrap.css";
import { getTodosByVisibilityFilter } from "../redux/selector";
import { Todo } from "./todo";

const TodoList = ({ todos, dispatch }) => {
  return (
    <ul className={custom["list-group"]}>
      {todos && todos.length ? (
        todos.map(todo => {
          return <Todo key={`todo-${todo.id}`} todo={todo} dispatch={dispatch} />;
        })
      ) : (
        <li className={custom["list-group-item"]}>Empty List!</li>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);

  return { todos: todos };
};

// export default connect(mapStateToProps)(TodoList);
export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, dispatch => ({ dispatch }))(TodoList)
};
