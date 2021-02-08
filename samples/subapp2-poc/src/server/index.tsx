import { config } from "./config";
import { loadRuntimeSupport } from "@xarc/app";
import electrodeServer from "@xarc/fastify-server";

async function start() {
  await loadRuntimeSupport({
    awaitReady: false,
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await electrodeServer(config);

  const { setupRoutes } = await import("./routes");

  setupRoutes(server);

  await server.start();
}

start();
