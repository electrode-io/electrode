"use strict";

const { reduxBundlerLoadSubApp } = require("../../lib/redux-bundler");

describe("redux-bundler load subapp", function() {
  it("should initialize reduxCreateStore if it's not provided", () => {
    const subapp = reduxBundlerLoadSubApp({
      name: `test-${Date.now()}-1`
    });
    expect(subapp.__redux).to.equal(true);
    expect(subapp._genReduxCreateStore).to.equal("subapp");
    expect(subapp.reduxCreateStore).to.be.ok;
  });

  it("should keep user provided reduxCreateStore", () => {
    const subapp = reduxBundlerLoadSubApp({
      name: `test-${Date.now()}-2`,
      reduxCreateStore: () => {}
    });
    expect(subapp.__redux).to.equal(true);
    expect(subapp._genReduxCreateStore).to.equal(undefined);
  });
});
