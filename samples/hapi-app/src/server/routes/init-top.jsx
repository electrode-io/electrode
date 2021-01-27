import reducer from "../../client/reducers";

// eslint-disable-next-line
export default function initTop(a, b, c) {
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
