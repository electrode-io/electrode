import reducer from "../../client/reducers";

export default function initTop(options) {
  return {
    reducer,
    initialState: {
      checkBox: { checked: false },
      number: { value: 999 }
    }
  };
}
