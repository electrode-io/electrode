import { loadRuntimeSupport } from "@xarc/app";
import fastifyServer from "@xarc/fastify-server";
import { config } from "./config";

/**
 * main entry point for application
 * @returns fastify server instance
 */
export async function start() {
  await loadRuntimeSupport({
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await fastifyServer(config);

  const { setupRoutes } = await import("./routes");
  setupRoutes(server);

  server.start();
  return server;
}

start();
