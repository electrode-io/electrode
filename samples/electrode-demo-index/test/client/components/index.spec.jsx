/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import ElectrodeDemoIndex from "src/index";

describe("index", () => {
  it("should render into the document", () => {
    const component = shallow(React.createElement(ElectrodeDemoIndex));
    expect(component).to.not.be.null;
  });

  it("should throw a warning when calling _setDemoContext", () => {
    class Demo extends ElectrodeDemoIndex {
      componentDidMount() {
        this._setDemoContext({libraryScope: {}, components: []})
      }
    }

    const component = shallow(React.createElement(Demo));
  });
});
