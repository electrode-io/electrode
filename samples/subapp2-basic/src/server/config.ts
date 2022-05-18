import { ConnectionConfig, PluginsConfig, ElectrodeServerConfig } from "@xarc/fastify-server";

//
// specify connection info for fastify server
//
const connection: ConnectionConfig = {
  host: process.env.HOST || "localhost",
  // The env APP_SERVER_PORT allows Electrode X to control app's listening port during dev
  // to serve both static assets and app under a unified proxy port
  port: parseInt(process.env.APP_SERVER_PORT || process.env.PORT || "3000"),
};

//
// specify plugins to register with electrode fastify server
//
const plugins: PluginsConfig = {
  /**
   * Register the dev support plugin
   */
  "@xarc/app-dev": {
    priority: -1,
    enable: Boolean(process.env.WEBPACK_DEV),
  },

  // set require path so can use "./routes"
  requireFromPath: __dirname,
  /**
   * Register the plugin to setup routes
   */
  routes: {
    module: "./routes",
  },
};

/**
 * A simple configuration to setup fastify to serve routes for the
 * Electrode X webapp.
 *
 * To support config composition base on environment, checkout these:
 *
 * 1. https://www.npmjs.com/package/electrode-confippet
 * 2. https://www.npmjs.com/package/config
 *
 */
export const config: ElectrodeServerConfig = {
  connection,
  plugins,
};
