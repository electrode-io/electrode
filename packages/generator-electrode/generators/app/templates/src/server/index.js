"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
<% if (isHapi) { %>const staticPathsDecor = require("electrode-static-paths");<% } %>
const support = require("electrode-archetype-react-app/support");

support.load()
  .then(() => {
    const config = electrodeConfippet.config;

    require<% if (isHapi) { %>("electrode-server")(config, [staticPathsDecor()])<% } else if (isExpress){ %>("./express-server")(config)<% } else { %>("./koa-server")(config)<% } %>;  // eslint-disable-line
  });
