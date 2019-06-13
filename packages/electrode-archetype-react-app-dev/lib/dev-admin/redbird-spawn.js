"use strict";

/* eslint-disable no-magic-numbers, no-process-exit, global-require, no-console */

const sudoPrompt = require("sudo-prompt");
const request = require("request");

const getIntFromEnv = (name, defaultVal) => {
  const envKey = [].concat(name).find(x => process.env[x]);
  return parseInt(process.env[envKey] || (defaultVal && defaultVal.toString()), 10);
};

const proxyJs = require.resolve("./redbird-proxy");

const port = getIntFromEnv("PORT", 3000);

const restartUrl = `http://localhost:${port}/__proxy_admin/restart`;

const handleRestart = type => {
  process.on("SIGHUP", () => {
    console.log(`${type}Electrode dev proxy restarting`);
    request(restartUrl, (err, res, body) => {
      if (!err) {
        console.log(body);
      } else {
        console.error(body, err);
      }
    });
  });
};

if (port <= 1024) {
  const exitUrl = `http://localhost:${port}/__proxy_admin/exit`;

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
