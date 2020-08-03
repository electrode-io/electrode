/* eslint-disable max-statements */

import * as http from "http";
import * as Path from "path";
import * as Fs from "fs";
import * as Url from "url";
import { getLogEventAsHtml } from "./log-parser";
import * as QS from "querystring";
import * as _ from "lodash";

export type AdminHttpOptions = {
  port?: number;
  getLogs?: Function;
};

/**
 * Track each log entry with timestamp from Date.now() as ID.
 *
 * If two entry has the same timestamp, then it's expected they are consecutively
 * generated, and add a second part tx that's an incrementing number starting at 1.
 *
 * When client request logs, it's expected to send a query param `entryId` that's
 * the stringified version in the format of "<tx>,<ts>"
 */
type LogEntryId = {
  ts: number;
  tx?: number;
};

type EventClient = {
  lastEntryId: LogEntryId;
  res: http.ServerResponse;
};

function parseEntryId(str: string): LogEntryId {
  if (str.indexOf(",") > 0) {
    const parts = str.split(",");
    return {
      ts: parseInt(parts[0]),
      tx: parseInt(parts[1])
    };
  }

  return { ts: parseInt(str) };
}

function compareEntryId(a: LogEntryId, b: LogEntryId) {
  if (a.ts === b.ts) {
    return (a.tx || 0) - (b.tx || 0);
  }
  return a.ts - b.ts;
}

function stringifyEntryId(entryId) {
  return entryId.tx ? `${entryId.ts},${entryId.tx}` : `${entryId.ts}`;
}

export class AdminHttp {
  _server: http.Server;
  _getLogs: Function;
  _logHtml: string;
  _adminHtml: string;
  _port: number;
  _instanceId: number;
  _eventClientId: number;
  _eventClients: Record<number, EventClient>;
  _sendStreamTimer: NodeJS.Timeout;

  constructor(options: AdminHttpOptions) {
    this._server = http.createServer(this.requestListener.bind(this));
    this._getLogs = options.getLogs;
    this._port = options.port || 9001;
    this._server.listen(this._port);
    this._instanceId = Date.now();
    this._eventClientId = 0;
    this._eventClients = {};
  }

  _readAsset(filename: string, memoize: string, processor?: Function): string {
    if (!this[memoize]) {
      let content = Fs.readFileSync(filename).toString();
      if (processor) {
        content = processor(content);
      }
      this[memoize] = content;
    }

    return this[memoize];
  }

  _serveHtml(res: http.ServerResponse, content: string) {
    res.writeHead(200, {
      "content-type": "text/html; charset=UTF-8"
    });
    res.end(content);
  }

  _prepareLogs(lastEntryId: LogEntryId, name = "app") {
    const logs = this._getLogs(name);

    const htmlLogs = logs
      .filter(event => {
        return compareEntryId(event as LogEntryId, lastEntryId) > 0;
      })
      .map(event => {
        const message = getLogEventAsHtml(event);
        const record: any = {
          level: event.level,
          ts: event.ts,
          message
        };
        if (event.jsonData) {
          record.json = true;
        }
        if (event.tx) {
          record.tx = event.tx;
        }
        return record;
      });

    return htmlLogs;
  }

  _serveLogs(url: Url.UrlWithStringQuery, res: http.ServerResponse) {
    const query: any = QS.parse(url.query);
    const id = parseInt(query.id, 10);

    let entryIdStr = "0";

    if (id === this._instanceId) {
      entryIdStr = query.entryId || "0";
    }

    const data = {
      logs: this._prepareLogs(parseEntryId(entryIdStr)),
      instanceId: this._instanceId
    };

    res.writeHead(200, {
      "content-type": "application/json"
    });
    res.end(JSON.stringify(data));
  }

  _streamLogsHandler(url: Url.UrlWithStringQuery, res: http.ServerResponse) {
    const query: any = QS.parse(url.query);
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "access-control-allow-origin": "*"
    });

    res.socket.setKeepAlive(true);

    let entryId = "0";
    if (query.id === this._instanceId) {
      entryId = query.entryId || "0";
    }

    const eventClientId = this._eventClientId++;
    this._eventClients[eventClientId] = { res, lastEntryId: parseEntryId(entryId) };

    res.connection.on("close", () => {
      delete this._eventClients[eventClientId];
    });

    this.sendLogsToStreamClients();
  }

  sendLogsToStreamClients() {
    if (this._sendStreamTimer) {
      clearTimeout(this._sendStreamTimer);
    }

    this._sendStreamTimer = setTimeout(() => this._sendLogsToStreamClients(), 100);
  }

  _sendLogsToStreamClients() {
    this._sendStreamTimer = null;
    const logs = this._getLogs("app").filter(x => x);
    const lastLog = _.last(logs) || { ts: 0, tx: 0 };
    const clients = Object.entries(this._eventClients)
      .map(e => e[1])
      .filter(client => {
        return client.lastEntryId && lastLog
          ? compareEntryId(client.lastEntryId, lastLog as LogEntryId) < 0
          : true;
      })
      .sort((a, b) => {
        return compareEntryId(a.lastEntryId, b.lastEntryId);
      });

    if (clients.length === 0) {
      return;
    }

    const minTsTx = clients[0].lastEntryId;
    const htmlLogs = this._prepareLogs(minTsTx);

    clients.forEach(client => {
      const startIx = htmlLogs.findIndex(l => {
        //l.ts > client.start;
        return compareEntryId(l as LogEntryId, client.lastEntryId) > 0;
      });
      const data = {
        logs: htmlLogs.slice(startIx),
        instanceId: this._instanceId
      };

      client.res.write(`event: log-stream\n`);
      client.res.write(`data: ${JSON.stringify(data)}`);
      client.res.write(`\n\n`);

      client.lastEntryId = { ts: lastLog.ts, tx: lastLog.tx };
    });
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
        return this._serveHtml(
          res,
          this._readAsset(
            Path.join(__dirname, "log.html"),
            "_logHtml",
            (content: string): string => {
              return content.replace(
                "/*{{LOG_VIEW_JS}}*/",
                Fs.readFileSync(Path.join(__dirname, "log-view.js")).toString()
              );
            }
          )
        );
      case "/stream-logs":
      case "/__electrode_dev/stream-logs":
        return this._streamLogsHandler(url, res);
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
    Object.entries(this._eventClients).forEach(([, client]) => {
      client.res.end("shutdown", () => client.res.destroy());
    });
    if (server) {
      server.close();
    }
  }
}
