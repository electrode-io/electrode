"use strict";
const Fs = require("opfs");
const prompts = require("prompts");

async function checkDir() {
  const existDirFiles = await Fs.readdir(process.cwd());
  if (existDirFiles.length > 0) {
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Your directory is not empty, write to it?"
    });

    return response.overwrite;
  }

  return true;
}

module.exports = checkDir;
