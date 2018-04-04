/**
 * Client tests
 */
import React from "react";
import { mount } from "enzyme";

import ElectrodeDemoIndex from "src/index";

describe("index", () => {
  let container;
  let component;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    component.unmount();
  });

  it("should render into the document", () => {
    component = mount(<ElectrodeDemoIndex />, container);
    expect(component).to.not.be.null;
  });

  it("should render component-documentation", () => {
    component = mount(<ElectrodeDemoIndex scope={{}} />, container);
    expect(component.html()).to.equal(
      "<div class=\"component-documentation\"></div>"
    );
  });

  it("should render component-documentation with components", () => {
    component = mount(
      <ElectrodeDemoIndex
        components={[
          {
            title: "electrode-demo-index",
            examples: {
              map: () => {}
            }
          }
        ]}
      />,
      container
    );
    expect(component.html()).to.equal(
      "<div class=\"component-documentation\"><div>" +
        "<h3 id=\"electrode-demo-index\">" +
        "electrode-demo-index</h3></div></div>"
    );
  });
});
