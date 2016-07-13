/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import <%= componentName %> from "src/components/<%= componentPath %>";

describe("components/<%= componentPath %>", () => {

  describe("Mounting", () => {

    it("should render into the document", () => {
      const component = shallow(<<%= componentName %> />);
      expect(component).to.not.be.null;
    });

  });

});
