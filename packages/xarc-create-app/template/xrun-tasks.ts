import { loadDevTasks, xrun } from "@xarc/app-dev";

xrun.updateEnv(
  {
    /**
     * Configure local development with http://localhost:3000
     */
    HOST: "localhost",
    /**
     * In dev mode, a proxy server listens at `PORT` and forward requests to
     * to actual node.js app server and webpack dev server.
     */
    PORT: 3000,
    /**
     * In dev mode, `APP_SERVER_PORT` sets the proxy forward port for the
     * node.js app server.  If it's not defined or `0`, then a randomly available
     * port is picked every time.
     */
    // APP_SERVER_PORT: 3100,
    /**
     * In dev mode, `WEBPACK_DEV_PORT` sets the proxy forward port for the
     * webpack dev server.  If it's not defined or `0`, then a randomly available
     * port is picked every time.
     */
    // WEBPACK_DEV_PORT: 2992,
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
