"use strict";

const support = require("@xarc/app/support");
const electrodeServer = require("@xarc/fastify-server");
const { config } = require("./config");

async function start() {
  await support.load();
  await electrodeServer(config);
}

start();
