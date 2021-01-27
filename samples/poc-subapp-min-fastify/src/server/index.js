"use strict";

const electrodeConfippet = require("electrode-confippet");
const { loadRuntimeSupport } = require("@xarc/app");
const fastifyServer = require("@xarc/fastify-server");

module.exports = async () => {
  await loadRuntimeSupport();
  const config = electrodeConfippet.config;
  return await fastifyServer(config);
};

if (require.main === module) {
  module.exports();
}
