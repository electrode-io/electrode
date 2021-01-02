/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require, no-console */

const ck = require("chalker");
const optionalRequire = require("optional-require")(require);

function tryVanillaNode(xarcOptions) {
  const { createServer } = require("http");

  if (!createServer) {
    return false;
  }

  const { setupHttpDevServer } = require("./dev-http");

  const devHttpServer = setupHttpDevServer({
    host: xarcOptions.webpack.devHostname,
    port: xarcOptions.webpack.devPort
  });
  devHttpServer.addListener("error", err => {
    console.error(ck`<red>HTTP webpack dev server having an error</>${err}`);
  });

  devHttpServer.addListener("listening", () =>
    console.log(
      ck`<green>Node.js webpack dev server listening on port ${xarcOptions.webpack.devPort}</>`
    )
  );
  devHttpServer.start();

  return true;
}

function tryFastify(xarcOptions) {
  const fastifyServer = optionalRequire("@xarc/fastify-server");
  if (!fastifyServer) {
    return false;
  }

  fastifyServer({
    electrode: {
      logLevel: "warn",
      pinoOptions: false
    },
    connection: {
      host: xarcOptions.webpack.devHostname,
      port: xarcOptions.webpack.devPort
    },
    plugins: {
      webpackDevFastify: {
        module: "./dev-fastify",
        requireFromPath: __dirname
      }
    }
  });

  return true;
}

function tryElectrodeServer(xarcOptions) {
  const electrodeServer = optionalRequire("electrode-server");

  if (!electrodeServer) {
    return false;
  }

  electrodeServer({
    electrode: {
      logLevel: "warn"
    },
    connections: {
      default: { host: xarcOptions.webpack.devHostname, port: xarcOptions.webpack.devPort }
    },
    plugins: {
      webpackDevHapi: {
        module: "./dev-hapi.js",
        requireFromPath: __dirname
      }
    }
  });

  return true;
}

function tryKoa(xarcOptions) {
  const Koa = optionalRequire("koa");
  if (!Koa) {
    return false;
  }

  const app = new Koa();
  const setup = require("./dev-koa");
  setup(app);
  app.listen(xarcOptions.webpack.devPort, err => {
    if (err) {
      console.error(ck`<red>koa webpack dev server failed</>${err}`);
    } else {
      console.log(
        ck`<green>koa webpack dev server listening on port ${xarcOptions.webpack.devPort}</>`
      );
    }
  });

  return true;
}

function tryHapi(xarcOptions) {
  const Hapi = optionalRequire("@hapi/hapi");
  if (!Hapi) {
    return false;
  }

  const app = Hapi.server({
    port: xarcOptions.webpack.devPort,
    host: xarcOptions.webpack.devHostname
  });
  app
    .register(require("./dev-hapi"))
    .then(() => app.start())
    .then(() => {
      console.log(
        ck`<green>Hapi webpack dev server listening on port ${xarcOptions.webpack.devPort}</>`
      );
    })
    .catch(err => {
      console.error(ck`<red>Hapi webpack dev server failed</>${err}`);
    });

  return true;
}

function tryExpress(xarcOptions) {
  const express = optionalRequire("express");
  if (!express) {
    return false;
  }
  const app = express();
  const setup = require("./dev-express");
  setup(app);
  app.listen(xarcOptions.webpack.devPort, err => {
    if (err) {
      console.error(ck`<red>express webpack dev server failed</>${err}`);
    } else {
      console.log(
        ck`<green>express webpack dev server listening on port ${xarcOptions.webpack.devPort}</>`
      );
    }
  });

  return true;
}

export function startDevServer() {
  //
  // requiring all the modules, such as webpack, could take a long time, especially
  // when node.js cache is not primed sometimes.
  // doing require here helps with some perceptive on how long webpack dev server
  // starts up.  TODO: use worker thread to run WDS in dev-admin's process
  //
  const { loadXarcOptions } = require("../../lib/utils");

  const xarcOptions = loadXarcOptions();
  const started = [
    tryVanillaNode,
    tryFastify,
    tryElectrodeServer,
    tryHapi,
    tryKoa,
    tryExpress
  ].find(tryFunc => tryFunc(xarcOptions));

  if (!started) {
    console.error(
      ck(`<red>
ERROR: can't find a HTTP server to run dev-server.
Please install at least one of these dependencies:
  @xarc/fastify-server@1+, electrode-server@3+, @hapi/hapi@18+, express@4+, or koa

</red>`)
    );
  } else {
    process.send({
      name: "webpack-report",
      valid: false
    });
  }
}
