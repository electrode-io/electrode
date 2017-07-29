"use strict";

describe("server-side logger", function () {
  let Log;
  let callCount = 0;
  const request = {
    log: () => callCount++
  };

  beforeEach(() => {
    delete require.cache[require.resolve("../../lib")];
    Log = require("../../lib");

    // Log.setServer(server);
  });

  it("should log entries", function () {
    Log.info("test info", {request: request});
    Log.warn("test warn", {request: request});
    Log.fatal("test fatal", {request: request});
    Log.error("test error", {request: request});
    Log.debug("test debug", {request: request});
    Log.trace("test trace", {request: request});
    Log.log(["log"], "test log", {request: request});
    expect(callCount).to.equal(7);
  });

  it("should throw error if request option not provided", function () {
    expect(() => Log.info("test"));
  });
});
