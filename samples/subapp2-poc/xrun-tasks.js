const { loadDevTasks, xrun } = require("@xarc/app-dev");

xrun.updateEnv(
  {
    /*
     * Configure local development with http://localhost:3000
     */
    HOST: "localhost",
    PORT: 3000,
    /*
     * Set app's node server to listen at port 3100 so the proxy can listen at 3000
     * and forward request to the app.
     */
    APP_SERVER_PORT: 0, // choose a randomly available port
    WEBPACK_DEV_PORT: 0, // choose a randomly available port
    /*
     * Enable Electrode's built-in webpack dev server and reverse proxy for development
     */
    WEBPACK_DEV_MIDDLEWARE: true,
  },
  {
    // do not override any env flag already set in process.env
    override: false,
  }
);

loadDevTasks(xrun, {
  // options to customize features
  webpackOptions: {
    // enable CSS module for files other than `.mod.css`
    cssModuleSupport: "byModExt",
  },
});
