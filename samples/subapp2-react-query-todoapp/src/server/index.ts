import { loadRuntimeSupport } from "@xarc/app";
import electrodeServer from "@xarc/fastify-server";
import { config } from "./config";

async function start() {
  await loadRuntimeSupport({
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await electrodeServer(config);

  const { setupRoutes } = await import("./routes");
  setupRoutes(server);

  server.start();
  return server;
}

start();
