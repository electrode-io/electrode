"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const support = require("electrode-archetype-react-app/support");
let startServer;

/*<% if (isHapi) { %>*/
const staticPathsDecor = require("electrode-static-paths");
startServer = config => require("electrode-server")(config, [staticPathsDecor()]);
/*<% } else if (isExpress) { %> */
startServer = config => require("./express-server")(config);
/*<% } else { %> */
startServer = config => require("./koa-server")(config);
/*<% } %>*/

support.load().then(() => {
  const config = electrodeConfippet.config;
  return startServer(config);
});
