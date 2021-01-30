/* eslint-disable global-require, no-console */

import ck from "chalker";
import { createServer } from "http";
import { setupHttpDevServer } from "./dev-http";

/**
 * Create HTTP server for dev admin
 * @param xarcOptions - xarc options
 *
 * @returns http server
 */
function createDevAdminHttpServer(xarcOptions) {
  const devHttpServer = setupHttpDevServer({
    host: xarcOptions.webpack.devHostname,
    port: xarcOptions.webpack.devPort
  });
  devHttpServer.addListener("error", err => {
    console.error(ck`<red>webpack dev server error:</> ${err}`);
    devHttpServer.stop();
  });

  devHttpServer.addListener("listening", () => {
    console.log(ck`<green>webpack dev server listening on port ${xarcOptions.webpack.devPort}</>`);
    process.send({
      name: "webpack-report",
      valid: false
    });
  });
  devHttpServer.start();

  return devHttpServer;
}

export function startDevServer() {
  //
  // Requiring all the modules, such as webpack, could take a long time, especially
  // when node.js cache is not primed sometimes.
  // Doing require here helps with the perception of how long webpack dev server
  // took to start up.
  //
  const { loadXarcOptions } = require("../../lib/utils");

  const xarcOptions = loadXarcOptions();
  const started = createDevAdminHttpServer(xarcOptions);

  if (!started) {
    console.error(
      ck(`<red>
ERROR: can't find a HTTP server to run dev-server.
Please install at least one of these dependencies:
  @xarc/fastify-server@1+, electrode-server@3+, @hapi/hapi@18+, express@4+, or koa

</red>`)
    );
  }

  return started;
}
