"use strict";

const sudoPrompt = require("sudo-prompt");

const Path = require("path");

const proxyJs = Path.join(__dirname, "redbird-proxy");
sudoPrompt.exec(
  `node ${proxyJs}`,
  {
    name: "Electrode Development Reverse Proxy"
  },
  function(error, stdout, stderr) {
    if (error) throw error;
    console.log("stdout: " + stdout);
  }
);
