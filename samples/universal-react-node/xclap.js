/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

process.env.SERVER_ES6 = true;

/*
 * Tell Electrode app archetype that you want to shorten css names under production env
 */

process.env.ENABLE_SHORTEN_CSS_NAMES = true;

const { loadDevTasks } = require("@xarc/app-dev");

exports.xrun = loadDevTasks();

//
