/* eslint-disable @typescript-eslint/no-var-requires */
export {};
import { createReadStream } from "fs";
import { createServer, IncomingMessage, request, RequestListener, ServerResponse } from "http";
import * as Url from "url";
import { resolve } from "path";
import { create } from "domain";
const Middleware = require("./middleware");

export interface IDevHttpServerOptions {
  port: number;
  host: string;
  protocol: "http";
}

export type HttpRequestEvent = "connect" | "response" | "timeout" | "close" | "finish";
export type HttpServerEvent = "open" | "close" | "listening" | "error";

export interface DevHttpServer {
  webpackDevHttpPlugin: RequestListener;
  start: () => void;
  addRequestListener: (event: HttpRequestEvent, handler: any) => void;
  addServerEventListener: (event: HttpServerEvent, hander: any) => void;
}

export const setup = function({ port, host }): DevHttpServer {
  const middleware = new Middleware({
    baseUrl: () => {
      return Url.format({
        hostname: host || process.env.HOST || "localhost",
        protocol: "http", // doesn't matter since it's a downstream call anyway..
        port: port || process.env.PORT
      });
    }
  });
  middleware.setup();

  let requestEventHooks = {};

  let webpackDevHttpPlugin: RequestListener = function(req: IncomingMessage, res: ServerResponse) {
    Object.keys(requestEventHooks).map(event => {
      req.addListener(event, event => requestEventHooks[event]({ ...event, ...req }));
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
    addRequestListener: (event: HttpRequestEvent, cb: any) => (this.requestEventHooks[event] = cb)
  };
};
export default setup;
