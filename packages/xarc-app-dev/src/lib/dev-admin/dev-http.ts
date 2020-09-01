/* eslint-disable @typescript-eslint/no-var-requires */
import { createReadStream } from "fs";
import { createServer, IncomingMessage, RequestListener, ServerResponse } from "http";
import * as Url from "url";
import { resolve } from "path";
const Middleware = require("./middleware");

export interface DevHttpServerOptions {
  port: number;
  host: string;
  protocol?: string;
}

export type HttpRequestEvent = "connect" | "response" | "timeout" | "close" | "finish";
export type HttpServerEvent = "open" | "close" | "listening" | "error";

export interface DevHttpServer {
  webpackDevHttpPlugin: RequestListener;
  start: () => void;
  stop?: () => void;
  addRequestListener: (event: HttpRequestEvent, handler: any) => void;
  addServerEventListener: (event: HttpServerEvent, hander: any) => void;
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

  const requestEventHooks = {};

  const webpackDevHttpPlugin: RequestListener = function(
    req: IncomingMessage,
    res: ServerResponse
  ) {
    Object.keys(requestEventHooks).map(eventName => {
      req.addListener(eventName, event => requestEventHooks[eventName]({ ...event, ...req }));
    });
    middleware.process(req, res, {
      skip: () => Promise.resolve(),
      replyHtml: html => {
        res
          .writeHead(200, {
            "Content-Type": "text/html"
          })
          .end(`<!DOCTYPE html>${html}`);
      },
      replyError: err => {
        res.writeHead(500, err);
      },
      replyNotFound: () => res.writeHead(404, "dev server express Not Found"), //res.status(404).send("dev server express Not Found"),
      replyStaticData: data => {
        const type = require("mime").getType(req.url);
        res.writeHead(200, {
          "Content-Type": type
        });
        res.end(data);
      },
      replyFile: file => createReadStream(resolve(file)).pipe(res)
    });
  };
  const server = createServer(webpackDevHttpPlugin);

  return {
    start: () => server.listen(port, host),
    webpackDevHttpPlugin,
    addServerEventListener: (event: HttpServerEvent, cb) => {
      server.addListener(event.toString(), cb);
    },
    stop: () => {
      server.close(function() {
        /* eslint-disable no-console */
        console.log("Server closed!");
      });
    },
    addRequestListener: (event: HttpRequestEvent, cb: any) => (requestEventHooks[event] = cb)
  };
};
export const setup = setupHttpDevServer;
