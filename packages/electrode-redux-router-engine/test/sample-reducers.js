// sample from https://redux.js.org/api-reference/combinereducers

const { combineReducers, createStore } = require("redux");

function todos(state, action) {
  console.log("todos action", action);
  state = state || [];
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

function counter(state, action) {
  console.log("counter action", action);
  state = state || 0;
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const reducer = combineReducers({
  todos,
  counter
});

const store = createStore(reducer, {
  todos: ["a", "b"],
  counter: 50
});

console.log(store.getState());

console.log("---- dispatching ADD_TODO");
store.dispatch({
  type: "ADD_TODO",
  text: "Use Redux"
});

console.log("---- dispatching INCREMENT");
store.dispatch({
  type: "INCREMENT"
});

console.log(store.getState());
