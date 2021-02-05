import { PageRenderer } from "@xarc/react";
import { Todo } from "../app";

export function setupRoutes(server) {
  let homeRenderer: PageRenderer;

  server.route({
    method: "GET",
    path: "/",
    async handler(request, reply) {
      try {
        if (!homeRenderer) {
          homeRenderer = new PageRenderer({
            pageTitle: "Electrode X Redux ToDo demo",
            subApps: [
              // { name: home.name, ssr: true },
              // { name: Demo2.name, ssr: true }
              { name: Todo.name, ssr: false }
            ],
            prodAssetData: {
              cdnMap: "config/assets.json"
            }
          });
        }
        const context = await homeRenderer.render({ request });
        reply.type("text/html");

        if (context.user.cspHeader) {
          reply.header(`content-security-policy`, context.user.cspHeader);
        }

        reply.send(context.result);
      } catch (error) {
        reply.send(error.stack);
      }
    }
  });
}
