import React from "react";
import ReactDOM from "react-dom";
import { Home } from "client/components/home";
import { mount } from "enzyme";

describe("Home", () => {
  let component;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    component = mount(<Home />, container);
  });

  afterEach(() => {
    component.unmount();
  });

  it("has expected content with deep render", () => {
    expect(component).not.toEqual(false);
  });

  it("has 'Demonstrate Components' header", () => {
    const text = "Demonstration Components";
    expect(component.find("h2").text()).toEqual(text);
  });

  it("has 8 items on menu", () => {
    expect(component.find("li").length).toEqual(8);

    const items = [
      "CSRF protection using electrode-csrf-jwt",
      "Above the Fold Render with skip=true - increase your App's performance by using a skip prop",
      "Above the Fold Render with skip=false - increase your App's performance by using a skip prop",
      "SSR Caching Simple Type Example",
      "SSR Caching Template Type Example",
      "Push Notifications Example",
      "Todo List Example",
      "MongoDB Example"
    ];

    for (let x = 0; x < 8; x++) {
      expect(
        component
          .find("li")
          .at(x)
          .text()
      ).toEqual(items[x]);
    }
  });
});
