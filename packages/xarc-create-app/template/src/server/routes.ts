import { Demo2, Demo3, home } from "../app";
import { PageRenderer } from "@xarc/react";
import { ElectrodeFastifyInstance } from "@xarc/fastify-server";
/**
 * Fastify plugin to setup application routes
 *
 * @param server - fastify server, should not have started yet
 * @returns nothing
 */
export async function fastifyPlugin(server: ElectrodeFastifyInstance) {
  const homeRenderer: PageRenderer = new PageRenderer({
    pageTitle: "xarc React App demo",
    subApps: [
      { name: home.name, ssr: true },
      { name: Demo2.name, ssr: true },
      { name: Demo3.name, ssr: true },
    ],
    prodAssetData: {
      cdnMap: "config/assets.json",
    },
  });

  server.route({
    method: "GET",
    url: "/",
    async handler(request, reply) {
      try {
        const context = await homeRenderer.render({ request });
        reply.type("text/html");

        if (context.user.cspHeader) {
          reply.header(`content-security-policy`, context.user.cspHeader);
        }

        reply.send(context.result);
      } catch (error) {
        reply.send(error.stack);
      }
    },
  });
}
