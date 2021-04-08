/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

// process.env.SERVER_ES6 = true;

process.env.APP_SERVER_PORT = 3100;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use PhantomJS to run your Karma Unit tests.  Default is "chrome" (Chrome Headless)
 */

// process.env.KARMA_BROWSER = "phantomjs";

const { loadDevTasks, xrun } = require("@xarc/app-dev");

loadDevTasks(xrun, {
  webpackOptions: {
    v1RemoteSubApps: {
      name: "shell-app",
      shared: {
        react: {
          import: "react",
          shareKey: "react",
          shareScope: "default",
          singleton: true
        },
        "react-dom": {
          singleton: true
        },
        history: {
          singleton: true
        },
        "subapp-web": {
          singleton: true
        },
        "@babel/runtime": {
          singleton: true
        }
      }
    }
  }
});
