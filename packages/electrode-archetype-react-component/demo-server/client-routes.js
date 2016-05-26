"use strict";

//
// Must use static require since this file gets bundled by webpack statically.
//

const createRoutes = require("./create-routes");
// Need to have client only route file since webpack can't resolve expressions like `process.cwd()`
// This "module" is aliased to process.cwd() + "/demo/demo" in `webpack.config.demo.dev`
const Demo = require("local-component-demo").default;

module.exports = createRoutes(Demo);
