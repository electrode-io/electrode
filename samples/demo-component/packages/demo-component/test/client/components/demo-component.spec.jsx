/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import DemoComponent from "src/components/demo-component";

describe("components/demo-component", () => {
  describe("Mounting", () => {
    it("should render into the document", () => {
      const component = shallow(<DemoComponent />);
      expect(component).to.not.be.null;
    });
  });
});
