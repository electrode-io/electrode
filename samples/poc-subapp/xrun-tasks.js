const { loadDevTasks, xrun } = require("@xarc/app-dev");

exports.xrun = xrun;

xrun.updateEnv(
  {
    WEBPACK_DEV_PORT: 0,
    APP_SERVER_PORT: 0
  },
  { override: false }
);

const deps = require("./package.json").dependencies;

loadDevTasks(xrun, {
  webpackOptions: {
    v1RemoteSubApps: {
      name: "v1-federation-demo-subapp",
      subAppsToExpose: ["Demo"],
      shared: {
        react: {
          eager: false,
          // requiredVersion: deps.react,
          // import: "react",
          // shareKey: "react",
          // shareScope: "default",
          singleton: true
        }
        // "react-dom": {
        //   eager: true,
        //   requiredVersion: deps["react-dom"],
        //   singleton: true
        // },
        // history: {
        //   eager: true,
        //   requiredVersion: deps["history"],
        //   singleton: true
        // },
        // "subapp-web": {
        //   eager: true,
        //   requiredVersion: deps["subapp-web"],
        //   singleton: true
        // },
        // "@babel/runtime": {
        //   eager: true,
        //   requiredVersion: deps["@babel/runtime"],
        //   singleton: true
        // }
      }
    }
  }
});
