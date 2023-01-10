import React from "react";
import ReactDOM from "react-dom";
import { Home } from "client/components/home";

describe("Home", () => {
  let component;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("has expected content with deep render", () => {
    component = ReactDOM.render(<Home />, container);

    expect(component).to.not.be.false;
  });
});
