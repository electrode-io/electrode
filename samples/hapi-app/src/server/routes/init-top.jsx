import reducer from "../../client/reducers";

export default function initTop(a, b, c) {
  debugger;
  return {
    reducer,
    initialState: {
      checkBox: { checked: false },
      number: { value: 999 },
      username: { value: "" },
      textarea: { value: "" },
      selectedOption: { value: "0-13" },
      showFakeComp: { value: true }
    }
  };
}
