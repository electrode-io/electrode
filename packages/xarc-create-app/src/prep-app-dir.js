/* eslint-disable no-console, no-process-exit */
"use strict";

const Fs = require("opfs");
const Path = require("path");

async function prepareAppDir() {
  const pkg = JSON.parse(await Fs.readFile(Path.join(__dirname, "..", "package.json")));
  const pkgName = pkg.name;
  const appDirName = process.argv[2];
  if (!appDirName) {
    console.log(`
Usage: ${pkgName} <app-directory>

  - pass '.' to use current directory
`);
    process.exit(1);
  }

  if (appDirName === ".") {
    const dirName = Path.basename(process.cwd());
    console.log(`Using current directory '${dirName}' to create app`);
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
