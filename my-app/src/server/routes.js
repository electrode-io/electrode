import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Demo2, Demo3, home } from "../app";
import { PageRenderer, createDynamicComponent } from "@xarc/react";
import { ElectrodeFastifyInstance } from "@xarc/fastify-server";
import { DataProvider } from "../home/data";

const { Stream } = require("stream");
/**
 * Fastify plugin to setup application routes
 *
 * @param server - fastify server, should not have started yet
 * @returns nothing
 */
export async function fastifyPlugin(server) {
  const homeRenderer = new PageRenderer({
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

  function createServerData() {
    let done = false;
    let promise = null;
    return {
      read() {
        if (done) {
          return;
        }
        if (promise) {
          throw promise;
        }
        promise = new Promise((resolve) => {
          setTimeout(() => {
            done = true;
            promise = null;
            resolve();
          }, 2500);
        });
        throw promise;
      },
    };
  }

  server.route({
    method: "GET",
    url: "/",
    async handler(request, reply) {
      const Comp = createDynamicComponent(home, { ssr: true });
      const data = createServerData();

      let didError = false;
      const res = reply.raw;
      res.socket.on("error", (error) => {
        console.error("Fatal", error);
      });

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("resolved!");
        }, 2000);
      });

      const context = await homeRenderer.render({ request });
      console.log(Demo3);

      const stream = renderToPipeableStream(
        <DataProvider data={data}>
          <Comp />
        </DataProvider>,
        {
          onShellReady() {
            res.statusCode = didError ? 500 : 200;
            res.setHeader("Content-type", "text/html");
            stream.pipe(res);
          },
          onError(x) {
            didError = true;
            console.error(x);
          },
        }
      );
    },
  });
}
