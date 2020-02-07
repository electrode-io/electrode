export default {
  name: "valueB",
  reducer(state = "bundle-b") {
    return state;
  },
  selectValueB(state) {
    return state.valueB;
  }
};
