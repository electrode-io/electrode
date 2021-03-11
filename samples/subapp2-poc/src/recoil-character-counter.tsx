import { React, ReactSubApp, xarcV2, AppContext } from "@xarc/react";

import { recoilFeature, Recoil } from "@xarc/react-recoil";

const selectorsMap = new Map();
const charCountState = store => {
  if (selectorsMap.get("charCountState") === undefined) {
    const selector = Recoil.selector({
      key: "charCountState", // unique ID (with respect to other atoms/selectors)
      get: ({ get }) => {
        const text = get(store.get("textState"));
        return text.length;
      }
    });
    selectorsMap.set("charCountState", selector);
  }
  return function () {
    return selectorsMap.get("charCountState");
  };
};

function CharacterCount(props) {
  const count = Recoil.useRecoilValue(charCountState(props.store)());

  return <>Character Count: {count}</>;
}

function CharacterCounter(props) {
  return (
    <div>
      <TextInput {...props} />
      <CharacterCount {...props} />
    </div>
  );
}

function TextInput(props) {
  const { store } = props;
  const [text, setText] = Recoil.useRecoilState(store.get("textState"));

  const onChange = event => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const CharacterCounterApp = props => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr }) => {
        return props ? (
          <div
            style={{
              backgroundColor: "orange",
              padding: "5px",
              border: "solid",
              marginLeft: "15%",
              marginRight: "15%",
              marginBottom: 20
            }}
          >
            <h1>Recoil Character Counter App</h1>
            <CharacterCounter {...props} />
          </div>
        ) : null;
      }}
    </AppContext.Consumer>
  );
};

export { CharacterCounterApp as Component };

export const subapp: ReactSubApp = {
  Component: CharacterCounterApp,
  wantFeatures: [
    recoilFeature({
      React,
      prepare: async initialState => {
        xarcV2.debug("Recoil subapp recoil prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return {
            initialState: {
              state: { deal: { key: "textState", value: "My Special Recoil Deals......" } }
            }
          };
        }
      }
    })
  ]
};
