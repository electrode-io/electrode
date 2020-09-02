/* eslint-disable @typescript-eslint/no-var-requires */
import { createReadStream } from "fs";
import { Readable } from "stream";
import { getType } from "mime";
import { createServer, Server } from "http";
import * as Url from "url";
import { resolve as pathResolve } from "path";

const Middleware = require("./middleware");
const FakeRes = require("../fake-res");
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
}

export const setupHttpDevServer = function({
  port,
  host,
  protocol = "http"
}: DevHttpServerOptions): DevHttpServer {
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

  const server: Server = createServer(async (req, res) => {
    let shouldContinue = await middleware
      .process(req, res, {
        skip: () => Promise.resolve(true),
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
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.error("webpack dev middleware error", err);
      });

    if (res.headersSent || !shouldContinue) {
      return;
    }

    const devFakeRes = new FakeRes();
    shouldContinue = middleware.devMiddleware(req, devFakeRes, () =>
      Promise.resolve(middleware.canContinue)
    );

    if (devFakeRes.responded) {
      devFakeRes.httpRespond(res);
    } else if (shouldContinue) {
      middleware.hotMiddleware(req, res, () => {
        if (!res.headersSent) res.writeHead(404);
        res.end();
      });
    } else {
      //
    }
  });

  return {
    start: () => server.listen(port, host),
    stop: () => {
      server.close(function() {
        /* eslint-disable no-console */
        console.log("Server closed!");
      });
    },
    addListener: (event: HttpServerEvent, cb) => {
      server.addListener(event.toString(), cb);
    },
    httpServer: server
  };
};
export const setup = setupHttpDevServer;
