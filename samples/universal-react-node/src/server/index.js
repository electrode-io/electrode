"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const SSRCaching = require("electrode-react-ssr-caching");
const support = require("electrode-archetype-react-app/support");
const electrodeConfippet = require("electrode-confippet");
const electrodeServer = require("electrode-server");
const staticPathsDecor = require("electrode-static-paths");

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

require.extensions[".css"] = () => {
  return;
};

support.load({
  cssModuleHook: true
}).then(() => {
  SSRCaching.enableCaching();
  SSRCaching.setCachingConfig(cacheConfig);
  return electrodeServer(electrodeConfippet.config, [staticPathsDecor()]);
});
