import { React, ReactSubApp, createDynamicComponent } from "@xarc/react";
import { connect } from "@xarc/react-redux";
import custom from "../styles/bootstrap.css";

export const Todo = createDynamicComponent(
  {
    name: "todo",
    getModule: () => import("./todo"),
  }
);

const TodoList = ({ todos }) => {
  console.log('TodoList')
  console.log(todos)
  return (
  <ul className={custom["list-group"]}>
    {todos && todos.length
      ? todos.map((todo) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : <li className={custom["list-group-item"]}>Empty List!</li>}
  </ul>
)};

const mapStateToProps = (state) => {
  const { todos } = state;
  return { todos };
};

// export default connect(mapStateToProps)(TodoList);
export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, (dispatch) => ({ dispatch }))(TodoList),
};
