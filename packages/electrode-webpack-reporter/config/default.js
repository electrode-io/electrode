"use strict";

const RoutePaths = require("../lib/route-paths");
const route = `${RoutePaths.BASE}/{args*}`;

module.exports = {
  "plugins": {
    "electrode-react-webapp/lib/hapi": {
      "options": {
        "serverSideRendering": false,
        "paths": {
          [route]: {
            "content": {
              "module": "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    }
  }
};
