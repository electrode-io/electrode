import { config } from "./config";
import * as support from "@xarc/app/support";
const electrodeServer = require("@xarc/fastify-server");

//
// for manually rendering
//
import { Provider } from "@xarc/react-redux";
import { combineReducers, createStore } from "@xarc/react-redux";

import {
  React,
  subAppReady,
  createDynamicComponent,
  PageRenderer,
  createTemplateTags as cTT,
  PageOptions
} from "@xarc/react";

import { home, staticHome } from "../app";
import { renderToString } from "react-dom/server";

const MEMOIZE_STORE = {};

function memoize(key: any, factory: () => any) {
  if (!MEMOIZE_STORE[key]) {
    MEMOIZE_STORE[key] = factory();
  }
  return MEMOIZE_STORE[key];
}

const Home = createDynamicComponent(home, { ssr: true });

async function start() {
  await support.load({
    awaitReady: false,
    isomorphicCdnOptions: {
      prodOnly: true
    }
  });

  const server = await electrodeServer(config);

  let Demo1;
  let reducer;

  /**
   * Demo manually setup redux store etc and calling renderToString to render.
   *
   * This is just a simple manual setup to render the subapps with redux on the
   * server.  All the setup require to make a fully functioning app on the browser
   * are missing.
   *
   * For that, see the full demo route using PageRenderer below.
   */
  server.route({
    method: "GET",
    path: "/plain",
    async handler(req, reply) {
      if (!Demo1) {
        const { demo1, reduxReducers } = require("../home"); // eslint-disable-line

        reducer = combineReducers(reduxReducers);
        Demo1 = createDynamicComponent(demo1, { ssr: true });
        await subAppReady();
      }

      const store = createStore(reducer, { number: { value: 99 } });
      const s = renderToString(
        <Provider store={store}>
          <Home />
          <Demo1 />
        </Provider>
      );

      reply.type("text/html").send(`<doctype html><html>
<head>
<meta charset="UTF-8">
</head>
<body>
${s}
</body></html>
`);
    }
  });

  /*
   * Below are routes to demo using Electrode X's PageRenderer to render pages with
   * ES6 tag string templates for the HTML, with full subapp features including:
   *
   * - redux
   * - static props
   * - react router
   * - mixing multiple subapps on a page
   * - SSR and Hot Module Reloading
   */

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
      pageTitle: "subapp2-poc demo",
      subApps: [{ name: home.name, ssr: true }],
      templateInserts: {
        head: {
          begin: cTT`<h1>begin of head</h1>`
        },
        body: {
          begin: cTT`<h1>begin of body</h1>`,
          beforeStart: cTT`<h1>here we go</h1>`,
          end: cTT`<h1>end of body</h1>`
        }
      },
      ...commonRenderOptions
    });
  };

  const sendResponse = (reply, context) => {
    reply.type("text/html");

    if (context.user.cspHeader) {
      reply.header(`content-security-policy`, context.user.cspHeader);
    }

    reply.send(context.result);
  };

  server.route({
    method: "GET",
    path: "/",
    async handler(request, reply) {
      try {
        const pageRenderer = memoize("route:/", constructHomeRouteRenderer);
        const context = await pageRenderer.render({ request });
        sendResponse(reply, context);
      } catch (error) {
        reply.send(error.stack);
      }
    }
  });

  server.route({
    method: "GET",
    path: "/static",
    async handler(request, reply) {
      try {
        const pageRenderer = memoize("route:/static", () => {
          return new PageRenderer({
            pageTitle: "static props demo",
            subApps: [{ name: staticHome.name, ssr: true }],
            ...commonRenderOptions
          });
        });
        const context = await pageRenderer.render({
          request
          // enable streams
          // useStream: true,
          // URL path
          // path: "/tag-template",
          // URL query
          // query: {},
          // URL params
          // params: {},
        });

        sendResponse(reply, context);
      } catch (error) {
        reply.send(error.stack);
      }
    }
  });

  server.route({
    method: "GET",
    path: "/mix",
    async handler(request, reply) {
      try {
        const pageRenderer = memoize("route:/mix", () => {
          return new PageRenderer({
            pageTitle: "mix subapp and state providers demo",
            subApps: [
              { name: staticHome.name, ssr: true },
              { name: home.name, ssr: true }
            ],
            ...commonRenderOptions
          });
        });
        const context = await pageRenderer.render({ request });
        sendResponse(reply, context);
      } catch (error) {
        reply.send(error.stack);
      }
    }
  });

  await server.start();
}

start();
