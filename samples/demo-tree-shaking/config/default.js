"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  plugins: {
    good: {
      module: "good",
      options: {
        reporters: {
          myConsoleReporter: [
            {
              module: "good-console"
            },
            "stdout"
          ]
        }
      }
    },
    "webpack-dev": {
      module: "@xarc/app-dev/lib/webpack-dev-hapi",
      enable: process.env.WEBPACK_DEV === "true",
      options: {
        // webpack dev middleware options
        dev: {
          // user reporter that's called by the archetype's reporter
          reporter: (reporterOptions) => {
            // For example, you can start app server with `clap devbrk` and attach
            // to it with chrome://inspect, and then enable this debugger statement
            // so chrome stop here every time webpack middleware finish compiling
            // debugger
          }
        }
      }
    },
    inert: {
      enable: true
    },
    electrodeStaticPaths: {
      enable: true,
      options: {
        pathPrefix: "dist"
      }
    }, //
    "server/plugins/pwa": {
      module: "./{{env.APP_SRC_DIR}}/server/plugins/pwa"
    }, //
    "electrode-auto-ssr": {}, //
    webapp: {
      module: "electrode-react-webapp/lib/hapi",
      options: {
        pageTitle: "demo-tree-shaking",
        insertTokenIds: false,
        paths: {
          "/{args*}": {
            content: {
              module: "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    }, //
    "electrode-cookies/hapi-plugin": {}
    //
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
