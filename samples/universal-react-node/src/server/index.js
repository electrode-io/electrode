"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const support = require("electrode-archetype-react-app/support");
// test import syntax properly handled by babel
import electrodeConfippet from "electrode-confippet";
const electrodeServer = require("electrode-server");
const staticPathsDecor = require("electrode-static-paths");

// test JSX syntax properly handled by babel
import React from "react";
const testTemplate = <div>hello, world</div>; // eslint-disable-line

support
  .load({
    cssModuleHook: true
  })
  .then(() => {
    return electrodeServer(electrodeConfippet.config, [staticPathsDecor()]);
  });
