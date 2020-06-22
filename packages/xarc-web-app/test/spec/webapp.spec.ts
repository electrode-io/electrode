"use strict";
import * as WebApp from "../../src/webapp";
import * as Path from "path";
//const Path = require("path");

describe("xarc-webapp", function () {
  // makeRouteHander(function() aWebApp());
  /* eslint-disable  @typescript-eslint/no-var-requires */
  it("it loads from route options with default template html", function () {
    const renderer = WebApp.makeRouteHandler({
      templateFile: "test/data/index-page.js"
    });
    console.log(renderer);
  });
});
