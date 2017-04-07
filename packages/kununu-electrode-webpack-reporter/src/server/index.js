"use strict";
global.navigator = { userAgent: false };

process.on("SIGINT", () => {
  process.exit(0);
});

const staticPathsDecor = require("electrode-static-paths");
const supports = require("kununu-electrode-archetype-react-app/supports");
const statsUtils = require("../../lib/stats-utils");
const electrodeServer = require("electrode-server")
const confippet = require("electrode-confippet");

supports.load()
  .then(() => electrodeServer(confippet.config, [staticPathsDecor()]))
  .then((server) => {
    server.route({
      method: "GET",
      path: "/reporter_data",
      handler: (req, reply) => {
        const stats = require("./stats_err.json"); // eslint-disable-line
        const byPkg = statsUtils.getModulesByPkg(stats);
        const data = {
          info: statsUtils.getInfo(stats),
          assets: statsUtils.getAssets(stats),
          modulesByPkg: byPkg.modulesByPkg,
          totalSizeByPkg: byPkg.totalSize,
          warnings: statsUtils.getWarningsHtml(stats),
          errors: statsUtils.getErrorsHtml(stats),
          legacy: statsUtils.jsonToHtml(stats, true),
          modules: stats.chunks[0].modules
        };
        reply(data);
      }
    });

    server.route({
      method: "GET",
      path: "/reporter_data/legacy",
      handler: (req, reply) => {
        const stats = require("../../test/stats_err.json");  // eslint-disable-line
        reply({
          legacy: statsUtils.jsonToHtml(stats)
        });
      }
    });
  });
