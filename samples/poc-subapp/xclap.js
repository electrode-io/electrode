/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

// process.env.SERVER_ES6 = true;

process.env.WEBPACK_DEV_MIDDLEWARE = true;

process.env.APP_SERVER_PORT = 3100;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use PhantomJS to run your Karma Unit tests.  Default is "chrome" (Chrome Headless)
 */

// process.env.KARMA_BROWSER = "phantomjs";

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
