"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

const webappPlugin = () => {
  //<% if (serverType==="HapiJS") { %>
  return "electrode-react-webapp/lib/hapi";
  //<% } else if (serverType==="ExpressJS") { %>
  return "electrode-react-webapp/lib/express";
  //<% } else { %>
  return "electrode-react-webapp/lib/koa";
  //<% } %>
};

module.exports = {
  plugins: {
    "webpack-dev": {
      module: "electrode-archetype-react-app-dev/lib/webpack-dev-hapi",
      enable: process.env.WEBPACK_DEV_MIDDLEWARE === "true"
    },
    inert: {
      enable: true
    },
    electrodeStaticPaths: {
      enable: true,
      options: {
        pathPrefix: "dist"
      }
    }, //<% if (pwa) { %>
    "server/plugins/pwa": {
      module: "./{{env.APP_SRC_DIR}}/server/plugins/pwa"
    }, //<% } if (isAutoSsr) { %>
    "electrode-auto-ssr": {}, //<% } %>
    webapp: {
      module: webappPlugin(),
      options: {
        pageTitle: "<%= projectName %>",
        paths: {
          "<%= routeValue %>": {
            content: {
              module: "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    }
  },
  connections: {
    default: {
      host: process.env.HOST,
      address: process.env.HOST_IP || "0.0.0.0",
      port: portFromEnv(),
      routes: {
        cors: false
      },
      state: {
        ignoreErrors: true
      }
    }
  }
};
