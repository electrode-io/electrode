// Set app's node server to listen at port 3100 so the proxy can listen at 3000
// and forward request to the app.

process.env.APP_SERVER_PORT = 3100;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

require("electrode-archetype-react-app")();
