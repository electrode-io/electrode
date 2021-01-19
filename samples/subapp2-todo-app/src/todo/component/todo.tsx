import { React, ReactSubApp, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";
import { toggleTodo } from "../redux/action";

const Todo = ({ todo, dispatch }) => {
  console.log("todo");
  console.log(todo);
  return (
    <li
      onClick={() => {
        console.log(todo.id);
        dispatch(toggleTodo(todo.id));
      }}
    >
        {todo && todo.completed ? "Completed  -- " : "TODO -- "}{" "}
      <span>{todo && todo.content && todo.content}</span>
    </li>
  );
};

export const subapp: ReactSubApp = {
  Component: connect(null, (dispatch) => ({ dispatch }))(Todo),
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: false, // true => read the reduxReducers export from this file
      prepare: async (initialState) => {
        if (initialState) {
          return { initialState };
        } else {
          return { initialState: { todos: [] } };
        }
      },
    }),
  ],
};
