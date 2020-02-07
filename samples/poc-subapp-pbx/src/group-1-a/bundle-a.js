export default {
  name: "valueA",
  reducer(state = "bundle-a") {
    return state;
  },
  selectValueA(state) {
    return state.valueA;
  }
};
