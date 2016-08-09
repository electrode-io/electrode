"use strict";
// NO JSX/ES6 because this is running from `/node_modules` and needs to be able to run on IE9 as is
//
// Must use static require since this file gets bundled by webpack statically.
//

var createRoutes = require("./create-routes");
// Need to have client only route file since webpack can't resolve expressions like `process.cwd()`
// This "module" is aliased to process.cwd() + "/demo/demo" in `webpack.config.demo.dev`
var Demo = require("local-component-demo").default;

// Also aliased for same reason as above
require("local-demo-styl");

module.exports = createRoutes(Demo);
