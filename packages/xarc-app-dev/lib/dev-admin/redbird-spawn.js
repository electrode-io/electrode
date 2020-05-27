"use strict";

/* eslint-disable no-magic-numbers, no-process-exit, global-require, no-console, max-statements */

const sudoPrompt = require("sudo-prompt");
const request = require("request");
const http = require("http");
const Util = require("util");
const { controlPaths, settings, httpDevServer } = require("../../config/dev-proxy")();
const proxyJs = require.resolve("./redbird-proxy");
const { formUrl } = require("../utils");

const canListenPort = async (port, host) => {
  const server = http.createServer(() => {});

  try {
    await Util.promisify(server.listen.bind(server))(port, host);
  } catch (err) {
    if (err.code === "EACCES") {
      return false;
    }
  } finally {
    await Util.promisify(server.close.bind(server))();
  }

  return true;
};

const isProxyRunning = async () => {
  const { host, httpPort } = settings;

  const statusUrl = formUrl({
    host,
    port: httpPort,
    path: controlPaths.status
  });

  try {
    await Util.promisify(request)(statusUrl);
    return true;
  } catch {
    return false;
  }
};

const handleRestart = type => {
  const restart = () => {
    console.log(`${type}Electrode dev proxy restarting`);
    const restartUrl = formUrl({
      ...httpDevServer,
      path: controlPaths.restart
    });
    request(restartUrl, (err, res, body) => {
      if (!err) {
        console.log(body);
      } else {
        console.error("Restarting failed, body:", body, "Error", err, "\nrestart URL", restartUrl);
      }
    });
  };

  process.on("SIGHUP", restart);
  process.on("message", data => {
    if (data.name === "restart") {
      restart();
    }
  });
};

async function mainSpawn() {
  if (await isProxyRunning()) {
    console.log("Electrode dev proxy already running - exiting.");
    return;
  }

  const { host, port, elevated } = settings;

  let needElevated;

  if (settings.port < 1024) {
    // macOS mojave no longer need privileged access to listen on port < 1024
    // https://news.ycombinator.com/item?id=18302380
    // so run a simple listen on the port to check if it's needed
    needElevated = !(await canListenPort(port));
  }

  if (elevated || needElevated) {
    const exitUrl = formUrl({ host, port, path: controlPaths.exit });

    const restart = () => {
      sudoPrompt.exec(
        `node ${proxyJs}`,
        {
          name: "Electrode Development Reverse Proxy"
        },
        (error, stdout, stderr) => {
          console.log("stdout:", stdout);
          if (error) {
            console.error(error);
            console.error("stderr:", stderr);
          }
        }
      );
    };

    const handleElevatedProxy = () => {
      process.on("SIGINT", () => {
        request(exitUrl, () => {
          console.log("Elevated Electrode dev proxy terminating");
          process.nextTick(() => process.exit(0));
        });
      });
    };

    handleElevatedProxy();
    handleRestart("Elevated ");

    restart();
  } else {
    handleRestart("");
    require("./redbird-proxy");
  }
}

mainSpawn();
