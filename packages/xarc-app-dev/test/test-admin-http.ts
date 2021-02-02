/* eslint-disable no-magic-numbers */
/**
 * A simple test to run a admin HTTP standalone with a mock logging generator
 * for testing the log viewer in streaming mode
 *
 */
import { AdminHttp } from "../src/lib/dev-admin/admin-http";

const logs = [];

const ah = new AdminHttp({
  getLogs(_app) {
    return logs;
  }
});

let lineId = 1;

let now;
let tx = 0;
setInterval(() => {
  if (tx === 0) {
    now = Date.now();
  }
  const entry: any = {
    level: "info",
    ts: now,
    message: "log line " + lineId + " " + now + " " + tx
  };
  if (tx) {
    entry.tx = tx;
  }
  logs.push(entry);
  lineId++;
  tx++;
  if (tx > 4) {
    tx = 0;
  }
}, 100);

setInterval(() => {
  ah.sendLogsToStreamClients();
}, 250);

// setTimeout(() => {
//   clearInterval(i1);
// }, 5000);
