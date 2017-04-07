import React from "react";
import ReactDOM from "react-dom";
import Home from "client/components/home";
import { createStore } from "redux";
import rootReducer from "../../../src/client/reducers";
import initialState from "../init-state";

describe("Home", function () {
  let component;
  let container;

  this.timeout(10000); // eslint-disable-line

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("has expected content with deep render", () => {

    const store = createStore(rootReducer, initialState);

    component = ReactDOM.render(
      <Home store={store} />,
      container
    );

    expect(component).to.not.be.false;
  });
});
