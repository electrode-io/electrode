import { config } from "./config";
import { loadRuntimeSupport } from "@xarc/app";
const electrodeServer = require("@xarc/fastify-server");

import { PageRenderer, createTemplateTags as cTT, PageOptions } from "@xarc/react";

import { header, main, bottom, footer, extras } from "../app";

const MEMOIZE_STORE = {};

function memoize(key: any, factory: () => any) {
  if (!MEMOIZE_STORE[key]) {
    MEMOIZE_STORE[key] = factory();
  }
  return MEMOIZE_STORE[key];
}

async function start() {
  await loadRuntimeSupport({
    awaitReady: false,
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await electrodeServer(config);

  const commonRenderOptions: Partial<PageOptions> = {
    prodAssetData: { cdnMap: "config/assets.json" },
    devAssetData: { pathMap: { base: "", ".css": "/js", ".js": "/js" } }
  };

  const constructHomeRouteRenderer = () => {
    return new PageRenderer({
      // enable streams
      // useStream: true,
      // URL path
      // path: "/tag-template",
      pageTitle: "subapp2-store-demo",
      subApps: [
        { name: header.name, ssr: true },
        { name: main.name, ssr: true },
        { name: bottom.name, ssr: true },
        { name: extras.name, ssr: true },
        { name: footer.name, ssr: true }
      ],
      templateInserts: {
        head: {
          begin: cTT`<link nonce
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />`
        },
        body: {
          begin: cTT`<div style='background-color:green'>`,
          end: cTT`</div>`
        }
      },
      ...commonRenderOptions
    });
  };

  const sendResponse = (reply, context) => {
    reply.type("text/html");

    if (context.user.cspHeader) {
      //reply.header(`content-security-policy`, context.user.cspHeader);
    }

    reply.send(context.result);
  };

  const handler = async (request, reply) => {
    try {
      const pageRenderer = memoize("route:/all", constructHomeRouteRenderer);
      const context = await pageRenderer.render({ request });
      sendResponse(reply, context);
    } catch (error) {
      reply.send(error.stack);
    }
  };

  ["/", "/home", "/products", "/deals", "/stores", "/contact", "/account", "/cart", "/recoil"].forEach(
    path => {
      server.route({
        method: "GET",
        path,
        handler
      });
    }
  );

  await server.start();
}

start();
