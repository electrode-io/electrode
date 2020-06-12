const { JsxRenderer } = require("@xarc/jsx-renderer");
const { updateFullTemplate } = require("./utils");
const { getSrcDir, setupRouteRender, searchRoutesFromFile } = require("./setup-hapi-routes");
const Path = require("path");
const subAppUtil = require("subapp-util");
const { tokens } = require("@xarc/jsx-token-handlers");

async function start() {
  const server = await require("@xarc/fastify-server")({
    deferStart: true,
    connection: { port: 3002, host: "localhost" }
  });

  const opt = {
    srcDir: Path.join(__dirname, "../test/data/fastify-plugin-test"),
    loadRoutesFrom: "routes.js",
    //    templateFile: "_document.js",
    stats: Path.join(__dirname, "../test/data/fastify-plugin-test/stats.json")
  };
  const srcDir = getSrcDir(opt);
  const { routes, topOpts } = searchRoutesFromFile(srcDir, opt);

  const subApps = await subAppUtil.scanSubAppsFromDir(srcDir);
  console.log(subApps);
  const subAppsByPath = subAppUtil.getSubAppByPathMap(subApps);
  console.log(opt);
  console.log(subAppsByPath);
  for (const path in routes) {
    const route = routes[path];
    const routeOptions = Object.assign({}, topOpts, route);
    // const routeRenderer = setupRouteRender({ subAppsByPath, srcDir, routeOptions });
    updateFullTemplate(routeOptions.dir, routeOptions);

    const chunkSelector = resolveChunkSelector(routeOptions);
    routeOptions.__internals = { chunkSelector };
    function updateSubappPaths() {
      if (routeOptions.subApps) {
        routeOptions.__internals.subApps = [].concat(routeOptions.subApps).map(x => {
          let options = {};
          if (Array.isArray(x)) {
            options = x[1];
            x = x[0];
          }
          // absolute: use as path
          // else: assume dir under srcDir
          // TBD: handle it being a module
          return {
            subapp: subAppsByPath[Path.isAbsolute(x) ? x : Path.resolve(srcDir, x)],
            options
          };
        });
      }
    }
    updateSubappPaths();
    const finalTokenHandlers = []
      .concat([], routeOptions.tokenHandler, routeOptions.tokenHandlers)
      .filter(x => x);

    const templateFile =
      (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
      Path.join(__dirname, "../template/index");

    var jsxRend = new JsxRenderer({
      templateFullPath: templateFile,
      template: require(templateFile),
      tokenHandlers: finalTokenHandlers,
      insertTokenIds: routeOptions.insertTokenIds,
      routeOptions
    });
    jsxRend.initializeTemplate();

    fastify.route({
      ...route.settings,
      path: path,
      method: method.map(x => x.toUpperCase()),
      jsxRend
    });
  }
}

function resolveChunkSelector(options) {
  if (options.bundleChunkSelector) {
    return require(Path.resolve(options.bundleChunkSelector)); // eslint-disable-line
  }

  return () => ({
    css: "main",
    js: "main"
  });
}
start();
