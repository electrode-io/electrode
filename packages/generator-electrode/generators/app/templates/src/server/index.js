"use strict";

const SSRCaching = require("electrode-react-ssr-caching");

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
<% if (isHapi) { %>const staticPathsDecor = require("electrode-static-paths");<% } %>
const support = require("kununu-electrode-archetype-react-app/support");

require.extensions[".css"] = () => {
  return;
};

const cacheConfig = {
  components: {
    SSRCachingTemplateType: {
      strategy: "template",
      enable: true
    },
    SSRCachingSimpleType: {
      strategy: "simple",
      enable: true
    }
  }
};

support.load()
  .then(() => {
    const config = electrodeConfippet.config;

    SSRCaching.enableCaching();
    SSRCaching.setCachingConfig(cacheConfig);

    require<% if (isHapi) { %>("electrode-server")(config, [staticPathsDecor()])<% } else if (isExpress){ %>("./express-server")(config)<% } else { %>("./koa-server")(config)<% } %>;  // eslint-disable-line
  });
