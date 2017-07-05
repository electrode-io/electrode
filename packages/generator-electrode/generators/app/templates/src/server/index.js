"use strict";

/* eslint-disable global-require */

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const support = require("electrode-archetype-react-app/support");

//<% if (isHapi) { %>
const staticPathsDecor = require("electrode-static-paths");
const startServer = config => require("electrode-server")(config, [staticPathsDecor()]);
//<% } else if (isExpress) { %>
const startServer = config => require("./express-server")(config);
//<% } else { %>
const startServer = config => require("./koa-server")(config);
//<% } %>

support.load().then(() => {
  const config = electrodeConfippet.config;
  return startServer(config);
});
