export default {
  name: "count",
  reducer(state = 0, action) {
    switch (action.type) {
      case "INC":
        return state + 1;
      case "DEC":
        return state - 1;
    }
    return state;
  },
  doIncCount() {
    return ({ dispatch }) => dispatch({ type: "INC" });
  },
  doDecCount() {
    return ({ dispatch }) => dispatch({ type: "DEC" });
  },
  selectCount(state) {
    return state.count;
  }
};
