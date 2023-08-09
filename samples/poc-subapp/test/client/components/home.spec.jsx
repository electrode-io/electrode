import React from "react";
import { createRoot } from "react-dom/client";
import Home from "client/components/home";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "client/reducers";

describe("Home", () => {
  let component;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    const root = createRoot(container);
  });

  afterEach(() => {
    root.unmount(container);
  });

  it("has expected content with deep render", () => {
    const initialState = {
      checkBox: { checked: false },
      number: { value: 999 }
    };

    const store = createStore(rootReducer, initialState);

    root.render(<Provider store={store}><Home /></Provider>);
    expect(component).to.not.be.false;
  });
});
