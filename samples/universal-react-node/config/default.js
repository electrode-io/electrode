module.exports = {
  plugins: {
    "webpack-dev": {
      module: "electrode-archetype-react-app-dev/lib/webpack-dev-hapi",
      enable: process.env.WEBPACK_DEV_MIDDLEWARE === "true" && process.env.WEBPACK_DEV === "true",
      options: {
        // webpack dev middleware options
        dev: {
          // user reporter that's called by the archetype's reporter
          reporter: reporterOptions => {
            // For example, you can start app server with `clap devbrk` and attach
            // to it with chrome://inspect, and then enable this debugger statement
            // so chrome stop here every time webpack middleware finish compiling
            // debugger
          }
        }
      }
    },
    "electrode-csrf-jwt": {
      options: {
        secret: "shhhhhh",
        expiresIn: 60
      }
    },
    // add some Hapi logging
    good: {
      options: {
        ops: {
          interval: 60 * 1000
        },
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
    csrf: {
      module: "./{{env.APP_SRC_DIR}}server/plugins/csrf"
    },
    pwa: {
      module: "./{{env.APP_SRC_DIR}}server/plugins/pwa"
    },
    autossr: {
      module: "./{{env.APP_SRC_DIR}}server/plugins/autossr"
    },
    updateStorage: {
      module: "./{{env.APP_SRC_DIR}}server/plugins/update-storage"
    },
    records: {
      module: "./{{env.APP_SRC_DIR}}server/plugins/records"
    },
    webapp: {
      module: "electrode-react-webapp/lib/hapi",
      options: {
        pageTitle: "Electrode Boilerplate Universal React App",
        paths: {
          "/{args*}": {
            content: {
              module: "./{{env.APP_SRC_DIR}}server/views/index-view"
            }
          }
        }
      }
    }
  }
};
