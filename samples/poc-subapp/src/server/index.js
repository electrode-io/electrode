// "use strict";

// /* eslint-disable global-require */

// process.on("SIGINT", () => {
//   process.exit(0);
// });

// const electrodeConfippet = require("electrode-confippet");
// const { loadRuntimeSupport } = require("@xarc/app");

// //
// const electrodeServer = require("@xarc/fastify-server");

// //
// // sample to show electrode server startup events
// // https://github.com/electrode-io/electrode-server#listener-function
// //
// function setupElectrodeServerEvents(emitter) {
//   emitter.on("config-composed", (data, next) => next());
//   emitter.on("server-created", (data, next) => next());
//   emitter.on("connection-set", (data, next) => next());
//   emitter.on("plugins-sorted", (data, next) => next());
//   emitter.on("plugins-registered", (data, next) => next());
//   emitter.on("server-started", (data, next) => next());
//   emitter.on("complete", (data, next) => next());
// }

// const startServer = config => {
//   if (!config.listener) {
//     config.listener = setupElectrodeServerEvents;
//   }
//   return electrodeServer(config);
// };

// //

// module.exports = async () => {
//   await loadRuntimeSupport();
//   const config = electrodeConfippet.config;
//   const server = await startServer(config);
//   return server;
// };

// if (require.main === module) {
//   module.exports();
// }
"use strict";

const { loadRuntimeSupport } = require("@xarc/app");
const electrodeServer = require("@xarc/fastify-server");
const config = require("electrode-confippet").config;

async function start() {
  const supportOpts = {};

  // Load run time support for application
  await loadRuntimeSupport(supportOpts);

  const server = await electrodeServer(config);

  return server;
}

start();
