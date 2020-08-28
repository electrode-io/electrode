/* eslint-disable @typescript-eslint/no-var-requires */
export { };
import { createReadStream } from 'fs';
import { createServer, IncomingMessage, request, RequestListener, ServerResponse } from 'http';
import * as Url from 'url';
import { resolve } from 'path';
import * as ck from 'chalker';

const Middleware = require("./middleware");
const archetype = require("../../config/archetype")();
const FakeRes = require("../fake-res");

const middleware = new Middleware({
  baseUrl: () => {
    return Url.format({
      hostname: process.env.HOST || "localhost",
      protocol: 'http', // doesn't matter since it's a downstream call anyway..
      port: process.env.PORT
    });
  }
});
middleware.setup();

createServer((req: IncomingMessage, res: ServerResponse) => {
  middleware.process(req, new FakeRes(), {
    skip: () => Promise.resolve(),
    replyHtml: html => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      }).end(`<!DOCTYPE html>${html}`);
    },
    replyError: (err) => {
      res.writeHead(500, err);
    },
    replyNotFound: () => res.writeHead(404, "dev server express Not Found"), //res.status(404).send("dev server express Not Found"),
    replyStaticData: (data) => {
      const type = require("mime").getType(req.url);
      res.writeHead(200, {
        'Content-Type': type
      });
      res.end(data);
    },
    replyFile: (file) => createReadStream(resolve(file)).pipe(res)
  });
}).addListener("error", (err: Error) => {
  console.error(ck`<red>Node.js webpack dev server failed</>${err}`);
}).addListener("open", () => {
  ck`<green>Node.js webpack dev server listening on port ${archetype.webpack.devPort}</>`
}).listen(archetype.webpack.devPort, archetype.webpack.devHostname, () => {
  ck`<green>Node.js webpack dev server listening on port ${archetype.webpack.devPort}</>`
});
