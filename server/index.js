"use strict";

var SSRCaching = require("electrode-react-ssr-caching");

process.on('SIGINT', function () {
  process.exit(0);
});

const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("babel-register")({
  ignore: /node_modules\/(?!react\/)/
});

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

SSRCaching.enableCaching();
SSRCaching.setCachingConfig(cacheConfig);

require("electrode-server")(config, [staticPathsDecor()]);
