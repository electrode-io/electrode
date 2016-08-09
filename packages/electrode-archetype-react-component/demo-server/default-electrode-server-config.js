"use strict";
const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");

const routes = require("./server-routes");

const routerResolverEngine = archDevRequire("@walmart/router-resolver-engine");

const engine = routerResolverEngine(routes);

module.exports = {
  connections: {
    default: {
      port: 4000
    }
  },
  "plugins": {
    "@walmart/electrode-react-webapp": {
      options: {
        pageTitle: "Demo",
        paths: {
          "/{args*}": {
            view: "index",
            content: (req) => {
              return engine(req);
            }
          }
        }
      }
    }
  }
};
