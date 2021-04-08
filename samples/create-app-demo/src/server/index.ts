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
      prodOnly: true,
    },
  });

  return await electrodeServer(config);
}

start();
