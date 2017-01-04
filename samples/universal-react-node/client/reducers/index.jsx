import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";
import defaultReducer from "./defaultReducer";

export default function rootReducer (state = {}, action) {
  return {
    defaultReducer: defaultReducer(state),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
