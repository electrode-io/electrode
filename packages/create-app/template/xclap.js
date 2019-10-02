/*
 * Enable Electrode's built-in webpack dev server and reverse proxy for development
 */

process.env.WEBPACK_DEV_MIDDLEWARE = true;

// Set app's node server to listen at port 3100 so the proxy can listen at 3000
// and forward request to the app.

process.env.APP_SERVER_PORT = 3100;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use a custom host name instead of localhost, and a diff port instead of 2992
 * for webpack dev server when running in dev mode with `clap dev`
 */

// process.env.WEBPACK_DEV_HOST = "dev.mymachine.net";
// process.env.WEBPACK_DEV_PORT = 8100;

/*
 * Enable HTTPS for webpack dev server when running in dev mode with `clap dev`
 */

// process.env.WEBPACK_DEV_HTTPS = true;

require("electrode-archetype-react-app")();
