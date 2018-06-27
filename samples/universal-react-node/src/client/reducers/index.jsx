// @flow

import todos from "./todos";
import visibilityFilter from "./visibility-filter";

export default function rootReducer(state: Object = {}, action: Object) {
  return {
    skip: state.skip, // ATF rendering skip below the fold for SSR
    count: state.count, // SSR component caching demo
    data: state.data, // Home component demo
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action) // To-do list demo
  };
}
