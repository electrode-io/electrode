// @flow

const newTodo = (id, text, completed) => {
  return {
    id, text, completed
  };
};

export default (state: Array<Object> = [], action: Object) => {
  const todos = state;
  switch (action.type) {
  case "ADD_TODO":
    return [
      ...todos,
      newTodo((todos.length > 0) ? todos[todos.length - 1].id + 1 : action.id, action.text, false)
    ];
  case "TOGGLE_TODO": {
    const x = todos.findIndex((t) => t.id === action.id);
    if (x >= 0) {
      const toggled: Array<Object> = todos.slice();
      const o = toggled[x];
      toggled[x] = newTodo(o.id, o.text, !o.completed);
      return toggled;
    }

    break;
  }
  default:
    return state;
  }

  return state;
};
