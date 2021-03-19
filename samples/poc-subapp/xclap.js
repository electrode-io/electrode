const { loadDevTasks, xrun } = require("@xarc/app-dev");

exports.xrun = xrun;

xrun.updateEnv(
  {
    WEBPACK_DEV_PORT: 0,
    APP_SERVER_PORT: 0
  },
  { override: false }
);

loadDevTasks(xrun, {});
