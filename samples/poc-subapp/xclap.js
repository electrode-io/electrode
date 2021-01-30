const { loadDevTasks, xrun } = require("@xarc/app-dev");

exports.xrun = xrun;

xrun.updateEnv(
  {
    APP_SERVER_PORT: 3100
  },
  { override: false }
);

loadDevTasks(xrun, {});
