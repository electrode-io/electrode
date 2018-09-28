/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

process.env.SERVER_ES6 = true;

/*
 * Tell Electrode app archetype that you want to use webpack dev as a middleware
 * This will run webpack dev server as part of your app server.
 */

process.env.WEBPACK_DEV_MIDDLEWARE = true;

/*
 * Tell Electrode app archetype that you want to shorten css names under production env
 */

process.env.ENABLE_SHORTEN_CSS_NAMES = true;

require("electrode-archetype-react-app")();

//
