import { loadDevTasks, xrun } from "@xarc/app-dev";

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
    APP_SERVER_PORT: 3100
  },
  {
    // do not override any env flag already set in process.env
    override: false
  }
);

loadDevTasks(xrun, {
  // options to customize features
});
