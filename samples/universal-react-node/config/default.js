module.exports = {
  plugins: {
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
