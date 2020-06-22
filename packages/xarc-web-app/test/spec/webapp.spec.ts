"use strict";

import { WebApp } from "../../src";
import * as Path from "path";
//const Path = require("path");

describe("xarc-webapp", function () {
  // makeRouteHander(function() aWebApp());
  it("it loads from route options with default template html", function () {
    const webapp = new WebApp({
      templateFile: Path.resolve(__dirname, "test/data/index.jsx")
    });

    console.log(webapp.renderer);
  });
});
