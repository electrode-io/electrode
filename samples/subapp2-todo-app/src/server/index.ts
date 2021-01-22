import { PageRenderer } from "@xarc/react";
import { load } from "@xarc/app/support";
const electrodeServer = require("@xarc/fastify-server");

import { config } from "./config";
// import { Demo2, home,  } from "../app";
import { Todo } from "../app";

async function start() {
  await load({
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });
  const server = await electrodeServer(config);

  let homeRenderer: PageRenderer;

  server.route({
    method: "GET",
    path: "/",
    async handler(request, reply) {
      try {
        if (!homeRenderer) {
          homeRenderer = new PageRenderer({
            pageTitle: "xarc React App demo",
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

  server.start();
  return server;
}

start();
