"use strict";
const createRoutes = require("./create-routes");
// Need to have client only route file since webpack can't resolve expressions like `process.cwd()`
// This "module" is aliased to process.cwd() + "/demo/demo" in `webpack.config.demo.dev`
const Demo = require("local-component-demo").default;

// Also aliased for same reason as above
require("local-demo-styl");

module.exports = createRoutes(Demo);
