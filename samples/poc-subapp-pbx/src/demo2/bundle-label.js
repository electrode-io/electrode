const LABELS = ["_A_", "_B_", "_C_", "_D_", "_E_"];
export default {
  name: "label",
  reducer(state = LABELS[0], action) {
    switch (action.type) {
      case "NEXT":
        const x = LABELS.indexOf(state) + 1;
        return x >= LABELS.length ? LABELS[0] : LABELS[x];
      case "PREV":
        const x2 = LABELS.indexOf(state) - 1;
        return x2 < 0 ? LABELS[LABELS.length - 1] : LABELS[x2];
    }
    return state;
  },
  doNext() {
    return ({ dispatch }) => dispatch({ type: "NEXT" });
  },
  doPrev() {
    return ({ dispatch }) => dispatch({ type: "PREV" });
  },
  selectLabel(state) {
    return state.label;
  }
};
