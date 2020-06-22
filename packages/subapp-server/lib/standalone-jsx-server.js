// "use strict";
// const { JsxRenderer } = require("@xarc/jsx-renderer");
// const { updateFullTemplate } = require("./utils");
// const { getSrcDir, searchRoutesFromFile } = require("./setup-hapi-routes");
// const Path = require("path");
// const subAppUtil = require("subapp-util");
// const WebApp = require("@xarc/webapp");
// async function start() {
//   const port = 3000;
//   const server = await require("@xarc/fastify-server")({
//     deferStart: true,
//     connection: { port: port, host: "localhost" }
//   });
//   //
//   const opt = {
//     srcDir: Path.join(__dirname, "../test/data/fastify-plugin-test"),
//     loadRoutesFrom: "routes.js",
//     //    templateFile: "_document.js",
//     stats: Path.join(__dirname, "../test/data/fastify-plugin-test/stats.json")
//   };
//   const srcDir = getSrcDir(opt);
//   const { routes, topOpts } = searchRoutesFromFile(srcDir, opt);

//   const subApps = await subAppUtil.scanSubAppsFromDir(srcDir);
//   ////console.log(subApps);
//   const subAppsByPath = subAppUtil.getSubAppByPathMap(subApps);
//   ////console.log(opt);
//   //console.log(subAppsByPath);
//   for (const path in routes) {
//     const route = routes[path];
//     const routeOptions = Object.assign({}, topOpts, route);
//     //const routeRenderer =
//     const routeRenderer = setupRouteRender({ subAppsByPath, srcDir, routeOptions });

//     fastify.route({
//       ...route.settings,
//       path: path,
//       method: method.map(x => x.toUpperCase()),
//       routeRenderer
//     });
//   }
//   server.listen(port);
// }
// start();
