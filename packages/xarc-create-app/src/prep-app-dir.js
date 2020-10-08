/* eslint-disable no-console, no-process-exit */

"use strict";

const Fs = require("opfs");
const Path = require("path");

async function prepareAppDir() {
  const appDirName = process.argv[2];
  if (!appDirName) {
    console.log(`
Usage: @xarc/create-app <app-directory>

  - pass '.' to use current directory
`);
    process.exit(1);
  }

  if (appDirName === ".") {
    const dirName = Path.basename(process.cwd());
    console.log(`Using current directory '${dirName}' to create @xarc/app`);
    return dirName;
  }

  try {
    await Fs.mkdir(appDirName);
  } catch (err) {
    if (err.code !== "EEXIST") {
      console.log(`Failed to create app directory '${appDirName}'`);
      process.exit(1);
    }
  }

  process.chdir(appDirName);

  return appDirName;
}

module.exports = prepareAppDir;
