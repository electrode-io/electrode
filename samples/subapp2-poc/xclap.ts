import { loadXarcDevTasks, xclap } from "@xarc/app-dev";

xclap.updateEnv(
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
    APP_SERVER_PORT: 3100,
    /*
     * Enable Electrode's built-in webpack dev server and reverse proxy for development
     */
    WEBPACK_DEV_MIDDLEWARE: true
  },
  {
    // do not override any env flag already set in process.env
    override: false
  }
);

loadXarcDevTasks(xclap, {
  namespace: "poc1",
  webpackOptions: {
    cssModuleSupport: true
  }
});
