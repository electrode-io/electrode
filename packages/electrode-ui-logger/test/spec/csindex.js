"use strict";

describe("client-side logger", function () {
  let fetchUrl;
  let fetchPayload;
  let Log;
  let Config;

  function mockFetch(url, payload) {
    fetchUrl = url;
    fetchPayload = payload;
  }

  before(function() {
    global.window = {
      _wml: {
        config: {
          ui: {}
        }
      }
    };

    Config = require("electrode-ui-config/lib/csindex");
  });

  beforeEach(function () {
    delete require.cache[require.resolve("../../lib/csindex")];

    Log = require("../../lib/csindex");
    Log.setLogInterval(200);
    Log.setFetch(mockFetch);
    Log.setConfig(Config);
  });

  afterEach(function () {
    fetchUrl = undefined;
    fetchPayload = undefined;
    delete global.fetch;
  });

  after(function () {
    delete global.fetch;
  });

  it("should flush the log entries", function () {
    Log.info("test info");
    Log.warn("test warn");
    Log.fatal("test fatal");
    Log.error("test error");
    Log.debug("test debug");
    Log.trace("test trace");
    Log.log("log", "test log");
    Log._flush();

    expect(fetchUrl).to.equal("/api/logger");
    expect(fetchPayload).to.deep.equal(
      {
        "credentials": "include",
        "disableAnalytics": true,
        "method": "POST",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        "body": `[{"tags":["info"],"data":"test info"},{"tags":["warn"],"data":"test warn"},{"tags":["fatal"],"data":"test fatal"},{"tags":["error"],"data":"test error"},{"tags":["debug"],"data":"test debug"},{"tags":["trace"],"data":"test trace"},{"tags":["log"],"data":"test log"}]` // eslint-disable-line
      }
    );

  });

  it("should combine and log entries", function (done) {
    Log.info("test info");
    Log.warn("test warn");
    Log.fatal("test fatal");
    Log.error("test error");
    Log.debug("test debug");
    Log.trace("test trace");
    Log.log("log", "test log");

    setTimeout(() => {
      expect(fetchUrl).to.equal("/api/logger");
      expect(fetchPayload).to.deep.equal(
        {
          "credentials": "include",
          "disableAnalytics": true,
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          "body": `[{"tags":["info"],"data":"test info"},{"tags":["warn"],"data":"test warn"},{"tags":["fatal"],"data":"test fatal"},{"tags":["error"],"data":"test error"},{"tags":["debug"],"data":"test debug"},{"tags":["trace"],"data":"test trace"},{"tags":["log"],"data":"test log"}]` // eslint-disable-line
        }
      );

      done();
    }, 200);
  });

  it("should not send any thing to log api if nothing was logged", function (done) {
    Log.setFetch(function () {
      throw new Error("fetch should not have been called");
    });

    setTimeout(done, 200);
  });
});
