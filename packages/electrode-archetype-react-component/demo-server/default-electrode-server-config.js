"use strict";
const routes = require("./server-routes");

const routerResolverEngine = require("@walmart/router-resolver-engine");

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
