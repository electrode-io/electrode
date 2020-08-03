/* eslint-disable max-statements */

import * as http from "http";
import * as Path from "path";
import * as Fs from "fs";
import * as Url from "url";
import * as AnsiConvert from "ansi-to-html";
import { AdminServer } from "./admin-server";
import { getLogEventAsHtml } from "./log-parser";
import * as QS from "querystring";

export type AdminHttpOptions = {
  port?: number;
  admin: any;
};

export class AdminHttp {
  _server: http.Server;
  _admin: AdminServer;
  _logHtml: string;
  _adminHtml: string;
  _port: number;
  _instanceId: number;

  constructor(options: AdminHttpOptions) {
    this._server = http.createServer(this.requestListener.bind(this));
    this._admin = options.admin;
    this._port = options.port || 9001;
    this._server.listen(this._port);
    this._instanceId = Date.now();
  }

  _readAsset(filename: string, memoize: string): string {
    if (!this[memoize]) {
      this[memoize] = Fs.readFileSync(filename).toString();
    }

    return this[memoize];
  }

  _serveHtml(res: http.ServerResponse, content: string) {
    res.setHeader("content-type", "text/html; charset=UTF-8");
    res.writeHead(200);
    res.end(content);
  }

  _serveLogs(url: Url.UrlWithStringQuery, res: http.ServerResponse) {
    const logs = this._admin.getLogs("app");
    const query: any = QS.parse(url.query);
    const id = parseInt(query.id, 10);

    let start = 0;

    if (id === this._instanceId) {
      start = parseInt(query.start, 10) || 0;
    }

    const htmlLogs = [];
    for (let ix = start; ix < logs.length; ix++) {
      const event: any = logs[ix];
      const message = getLogEventAsHtml(event);
      const record: any = {
        level: event.level,
        message
      };
      if (event.jsonData) {
        record.json = true;
      }
      htmlLogs.push(record);
    }

    const data = {
      start,
      logs: htmlLogs,
      total: logs.length,
      instanceId: this._instanceId
    };

    res.setHeader("content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data));
  }

  requestListener(req: http.IncomingMessage, res: http.ServerResponse) {
    const url = Url.parse(req.url);
    switch (url.pathname) {
      case "/":
      case "/__electrode_dev":
        return this._serveHtml(
          res,
          this._readAsset(Path.join(__dirname, "admin.html"), "_adminHtml")
        );
      case "/log-events":
      case "/__electrode_dev/log-events":
        return this._serveLogs(url, res);
      case "/log":
      case "/__electrode_dev/log":
        return this._serveHtml(res, this._readAsset(Path.join(__dirname, "log.html"), "_logHtml"));
      default:
        res.writeHead(404);
        return res.end("dev admin http 404 " + req.url);
    }
  }

  /**
   * Shutdown the http server
   */
  shutdown() {
    const server = this._server;
    this._server = null;
    if (server) {
      server.close();
    }
  }
}
