"use strict";
const createRoutes = require("./create-routes");
// Need to have server only route file since webpack can't resolve expressions like `process.cwd()`
const Demo = require(process.cwd() + "/demo/demo").default;

module.exports = createRoutes(Demo);
