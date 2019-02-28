"use strict";

const subappRedux = require("../..");
const { getSubAppContainer } = require("subapp-util");

describe("subapp-redux", function() {
  it("should load redux subapp", () => {
    subappRedux.reduxLoadSubApp({ name: "foo" });
    expect(getSubAppContainer().foo).to.exist;
  });
});
