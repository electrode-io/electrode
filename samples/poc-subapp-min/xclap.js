/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

// process.env.SERVER_ES6 = true;

process.env.APP_SERVER_PORT = 3100;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use PhantomJS to run your Karma Unit tests.  Default is "chrome" (Chrome Headless)
 */

// process.env.KARMA_BROWSER = "phantomjs";

require("@xarc/app")();

require("xclap").load({"kk": ()=>require("child_process").exec("lsof -iTCP -sTCP:LISTEN -P -n |grep '2992\|3000\|3100'|awk '{print $2}' |xargs kill -9")});
