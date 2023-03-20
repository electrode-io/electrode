"use strict";

const { loadRuntimeSupport } = require("@xarc/app");
const electrodeServer = require("@xarc/fastify-server");
const electrodeConfippet = require("electrode-confippet");

async function start() {
    // Load run time support for application
    await loadRuntimeSupport();
    const config = electrodeConfippet.config;
    const server = await electrodeServer({ ...config, deferStart: true });

    server.start()
}

start();