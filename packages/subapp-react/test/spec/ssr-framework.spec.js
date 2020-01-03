"use strict";

const lib = require("../../lib");

describe("SSR React framework", function() {
  it("should setup React framework", () => {
    expect(lib.React).to.be.ok;
    expect(lib.AppContext).to.be.ok;
    expect(lib.FrameworkLib).to.be.ok;
    expect(lib.loadSubApp).to.be.a("function");
  });

  it("should not do SSR without component", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {},
      subAppServer: {},
      props: {}
    });
    const res = await framework.handleSSR();
    expect(res).contains("has no StartComponent");
  });
});
