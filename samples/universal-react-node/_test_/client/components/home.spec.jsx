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
    
    const item1 = "CSRF protection using electrode-csrf-jwt";
    const item2 = "Above the Fold Render with skip=true - increase your App's performance by using a skip prop";
    const item3 = "Above the Fold Render with skip=false - increase your App's performance by using a skip prop";
    const item4 = "SSR Caching Simple Type Example";
    const item5 = "SSR Caching Template Type Example";
    const item6 = "Push Notifications Example";
    const item7 = "Todo List Example";
    const item8 = "MongoDB Example";

    expect(component.find("li").at(0).text()).toEqual(item1);
    expect(component.find("li").at(1).text()).toEqual(item2);
    expect(component.find("li").at(2).text()).toEqual(item3);
    expect(component.find("li").at(3).text()).toEqual(item4);
    expect(component.find("li").at(4).text()).toEqual(item5);
    expect(component.find("li").at(5).text()).toEqual(item6);
    expect(component.find("li").at(6).text()).toEqual(item7);
    expect(component.find("li").at(7).text()).toEqual(item8);
  });
});
