/* eslint-disable no-console, max-statements */

import { createReadStream } from "fs";
import { Readable } from "stream";
import { getType } from "mime";
import { createServer, Server } from "http";
import Url from "url";
import { resolve as pathResolve } from "path";
import { FakeRes } from "../fake-res";
import { Middleware } from "./middleware";
import { makeDefer } from "xaa";

export interface DevHttpServerOptions {
  port: number;
  host: string;
  protocol?: string;
}

export type HttpRequestEvent = "connect" | "response" | "timeout" | "close" | "finish";
export type HttpServerEvent = "open" | "close" | "listening" | "error";

export interface DevHttpServer {
  start: () => void;
  stop: () => void;
  httpServer?: Server;
  addListener: (event: HttpServerEvent, hander: any) => void;
  getPort: () => number;
}

/**
 * @param root0
 * @param root0.port
 * @param root0.host
 * @param root0.protocol
 */
function getMiddleware({ port, host, protocol = "http" }: DevHttpServerOptions) {
  const middleware = new Middleware({
    baseUrl: () => {
      return Url.format({
        hostname: host || process.env.HOST || "localhost",
        protocol: protocol, // doesn't matter since it's a downstream call anyway..
        port: port || process.env.PORT
      });
    }
  });

  middleware.setup();

  return middleware;
}

export const setupHttpDevServer = function({
  port,
  host,
  protocol = "http"
}: DevHttpServerOptions): DevHttpServer {
  let createMiddlewarePromise;
  let middleware;
  let listenDefer = makeDefer();

  const server: Server = createServer(async (req, res) => {
    try {
      if (!middleware) {
        await listenDefer;
        middleware = await createMiddlewarePromise;
        listenDefer = createMiddlewarePromise = null;
      }
      const next1 = await middleware.process(req, res, {
        skip: () => middleware.canContinue,
        replyHtml: html =>
          res.writeHead(200, { "Content-Type": "text/html" }).end(`<!DOCTYPE html>${html}`),
        replyError: err => res.writeHead(500, err) && res.end(),
        replyNotFound: () => res.writeHead(404, "dev server express Not Found") && res.end(), //res.status(404).send("dev server express Not Found"),
        replyStaticData: data => {
          res.writeHead(200, { "Content-Type": getType(req.url) });
          Readable.from(data).pipe(res);
        },
        replyFile: file =>
          res.writeHead(200, { "Content-Type": getType(file) }) &&
          createReadStream(pathResolve(file)).pipe(res)
      });

      if (next1 !== middleware.canContinue) return;

      const devFakeRes = new FakeRes();
      await middleware.devMiddleware(req, devFakeRes, () => Promise.resolve());
      if (devFakeRes.responded) {
        devFakeRes.httpRespond(res);
        return;
      }

      middleware.hotMiddleware(req, res, err => {
        if (err) {
          console.error("webpack hot middleware error", err);
          res.writeHead(500, err.message);
        }
      });
    } catch (e) {
      console.error("webpack dev middleware error", e);
      res.statusCode = 500;
      res.end(e.message);
    }
  });

  return {
    start() {
      server.listen(port, host, () => {
        createMiddlewarePromise = new Promise(resolve => {
          resolve(getMiddleware({ port: this.getPort(), host, protocol }));
        });
        listenDefer.resolve();
      });
    },
    stop: () => {
      server.close(() => {
        /* eslint-disable no-console */
        console.log("Server closed!");
      });
    },
    addListener: (event: HttpServerEvent, cb) => {
      server.addListener(event.toString(), cb);
    },
    httpServer: server,
    getPort: () => {
      return server && (server.address() as any).port;
    }
  };
};
export const setup = setupHttpDevServer;
