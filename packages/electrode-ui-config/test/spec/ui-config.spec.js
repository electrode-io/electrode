"use strict";

process.env.NODE_CONFIG_DIR = "test/config/default";
const uiConfig = require("../../lib/ui-config");

const chai = require("chai");
const expect = chai.expect;

describe("uiConfig", function () {
  it("should create fullPath w/o trailing / for empty basePath", function () {
    // [ basePath, path ]
    // [ "", undefined ] => ""
    // [ "", "" ] => ""
    // [ "", "/" ] => "/"
    // [ "", "/abc1" ] => "/abc1"
    // [ "", "/abc2/" ] => "/abc2"
    // [ "", "abc3" ] => "abc3"
    // [ "", "abc4/" ] => "abc4"
    // [ "", "/abc5/bar" ] => "/abc5/bar"
    // [ "", "abc6/bar" ] => "abc6/bar"

    const config = uiConfig({ui: {basePath: ""}});
    expect(config.fullPath()).to.equal("");
    expect(config.fullPath("")).to.equal("");
    expect(config.fullPath("/")).to.equal("/");
    expect(config.fullPath("/abc1")).to.equal("/abc1");
    expect(config.fullPath("/abc2/")).to.equal("/abc2");
    expect(config.fullPath("abc3")).to.equal("abc3");
    expect(config.fullPath("abc4/")).to.equal("abc4");
    expect(config.fullPath("/abc5/bar")).to.equal("/abc5/bar");
    expect(config.fullPath("abc6/bar")).to.equal("abc6/bar");
  });

  it("should create fullPath w/o trailing / for basePath /", function () {
    // [ basePath, path ]
    // [ "/", undefined ] => ""
    // [ "/", "" ] => ""
    // [ "/", "/" ] => "/"
    // [ "/", "/abc1" ] => "/abc1"
    // [ "/", "/abc2/" ] => "/abc2"
    // [ "/", "abc3" ] => "/abc3"
    // [ "/", "abc4/" ] => "/abc4"
    // [ "/", "/abc5/bar" ] => "/abc5/bar"
    // [ "/", "abc6/bar" ] => "/abc6/bar"

    const config = uiConfig({ui: {basePath: "/"}});
    expect(config.fullPath()).to.equal("");
    expect(config.fullPath("")).to.equal("");
    expect(config.fullPath("/")).to.equal("/");
    expect(config.fullPath("/abc1")).to.equal("/abc1");
    expect(config.fullPath("/abc2/")).to.equal("/abc2");
    expect(config.fullPath("abc3")).to.equal("/abc3");
    expect(config.fullPath("abc4/")).to.equal("/abc4");
    expect(config.fullPath("/abc5/bar")).to.equal("/abc5/bar");
    expect(config.fullPath("abc6/bar")).to.equal("/abc6/bar");
  });

  it("should create fullPath w/o trailing / for basePath /test", function () {
    // [ basePath, path ]
    // [ "/test/", undefined ] => "/test"
    // [ "/test/", "" ] => "/test"
    // [ "/test/", "/" ] => "/test"
    // [ "/test/", "/abc1" ] => "/test/abc1"
    // [ "/test/", "/abc2/" ] => "/test/abc2"
    // [ "/test/", "abc3" ] => "/test/abc3"
    // [ "/test/", "abc4/" ] => "/test/abc4"
    // [ "/test/", "/abc5/bar" ] => "/test/abc5/bar"
    // [ "/test/", "abc6/bar" ] => "/test/abc6/bar"

    const config = uiConfig({ui: {basePath: "/test"}});
    expect(config.fullPath()).to.equal("/test");
    expect(config.fullPath("")).to.equal("/test");
    expect(config.fullPath("/")).to.equal("/test");
    expect(config.fullPath("/abc1")).to.equal("/test/abc1");
    expect(config.fullPath("/abc2/")).to.equal("/test/abc2");
    expect(config.fullPath("abc3")).to.equal("/test/abc3");
    expect(config.fullPath("abc4/")).to.equal("/test/abc4");
    expect(config.fullPath("/abc5/bar")).to.equal("/test/abc5/bar");
    expect(config.fullPath("abc6/bar")).to.equal("/test/abc6/bar");
  });

  it("should create fullPath w/o trailing / for basePath /test/", function () {
    // [ basePath, path ]
    // [ "/test/", undefined ] => "/test"
    // [ "/test/", "" ] => "/test"
    // [ "/test/", "/" ] => "/test"
    // [ "/test/", "/abc1" ] => "/test/abc1"
    // [ "/test/", "/abc2/" ] => "/test/abc2"
    // [ "/test/", "abc3" ] => "/test/abc3"
    // [ "/test/", "abc4/" ] => "/test/abc4"
    // [ "/test/", "/abc5/bar" ] => "/test/abc5/bar"
    // [ "/test/", "abc6/bar" ] => "/test/abc6/bar"

    const config = uiConfig({ui: {basePath: "/test/"}});
    expect(config.fullPath()).to.equal("/test");
    expect(config.fullPath("")).to.equal("/test");
    expect(config.fullPath("/")).to.equal("/test");
    expect(config.fullPath("/abc1")).to.equal("/test/abc1");
    expect(config.fullPath("/abc2/")).to.equal("/test/abc2");
    expect(config.fullPath("abc3")).to.equal("/test/abc3");
    expect(config.fullPath("abc4/")).to.equal("/test/abc4");
    expect(config.fullPath("/abc5/bar")).to.equal("/test/abc5/bar");
    expect(config.fullPath("abc6/bar")).to.equal("/test/abc6/bar");
  });

  it("should remove trailing / from fullApiPath to create fullApiPath", function () {
    const config = uiConfig({ui: {basePath: "/test/", apiPath: "/testApi"}});

    expect(config.fullApiPath()).to.equal("/test/testApi");
    expect(config.fullApiPath("")).to.equal("/test/testApi");
    expect(config.fullApiPath("/")).to.equal("/test/testApi");
    expect(config.fullApiPath("/abc")).to.equal("/test/testApi/abc");
    expect(config.fullApiPath("/abc/")).to.equal("/test/testApi/abc");
    expect(config.fullApiPath("abc")).to.equal("/test/testApi/abc");
    expect(config.fullApiPath("abc/")).to.equal("/test/testApi/abc");
    expect(config.fullApiPath("/abc/bar")).to.equal("/test/testApi/abc/bar");
    expect(config.fullApiPath("abc/bar")).to.equal("/test/testApi/abc/bar");

  });


  it("should handle missing apiPath", function () {
    const config = uiConfig({ui: {basePath: "/"}});

    expect(config.fullApiPath()).to.equal("/api");
    expect(config.fullApiPath("")).to.equal("/api");
    expect(config.fullApiPath("/")).to.equal("/api");
    expect(config.fullApiPath("/abc")).to.equal("/api/abc");
    expect(config.fullApiPath("/abc/")).to.equal("/api/abc");
    expect(config.fullApiPath("abc")).to.equal("/api/abc");
    expect(config.fullApiPath("abc/")).to.equal("/api/abc");
    expect(config.fullApiPath("/abc/bar")).to.equal("/api/abc/bar");
    expect(config.fullApiPath("abc/bar")).to.equal("/api/abc/bar");

  });

  it("should guard against empty config", function () {
    expect(uiConfig, undefined).to.not.throw();
  });
});
