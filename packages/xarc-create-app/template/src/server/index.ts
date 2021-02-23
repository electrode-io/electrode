import { loadRuntimeSupport } from "@xarc/app";
import { electrodeServer } from "@xarc/fastify-server";
import { config } from "./config";

/**
 * main entry point for application
 *
 * @returns fastify server instance
 */
export async function start() {
  await loadRuntimeSupport({
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await electrodeServer(config);

  // it's important that the routes setup is import *after* runtime support is loaded
  // else isomorphic assets during development may not work properly
  const { setupRoutes } = await import("./routes");
  setupRoutes(server);

  server.start();
  return server;
}

start();
