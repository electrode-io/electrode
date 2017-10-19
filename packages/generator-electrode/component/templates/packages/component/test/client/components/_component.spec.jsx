/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import <%= componentName %> from "src/components/<%= projectName %>";

describe("components/<%= projectName %>", () => {

  describe("Mounting", () => {
    const data = [
      {
        summary: "summary 1",
        details: "details 1"
      },
      {
        summary: "summary 2",
        details: "details 2"
      },
      {
        summary: "summary 3",
        details: "details 3"
      }
    ];
    it("should render into the document", () => {
      const component = shallow(<<%= componentName %> data={data}/>);
      expect(component).to.not.be.null;
    });

  });

});
