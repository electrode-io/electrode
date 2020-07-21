"use strict";

const electrodeConfippet = require("electrode-confippet");
const support = require("@xarc/app/support");
const electrodeServer = require("@xarc/fastify-server");

module.exports = async () => {
  await support.load();
  await electrodeServer(electrodeConfippet.config);
};

if (require.main === module) {
  module.exports();
}
