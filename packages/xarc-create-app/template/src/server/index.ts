import { config } from "./config";
const support = require("@xarc/app/support");
const electrodeServer = require("@xarc/fastify-server");

async function start() {
  await support.load();
  await electrodeServer(config);
}

start();
