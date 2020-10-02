import * as requireAt from "require-at";
const Path = require("path");
const Fs = require("fs");

//
// Resolve full path of a plugin that's the dependency of host npm package
//
export function getPluginFrom(host, pluginName) {
  let err;
  for (const pkg of [].concat(host)) {
    try {
      return requireAt(require.resolve(`${pkg}/package.json`)).resolve(pluginName);
    } catch (e) {
      if (!err) {
        err = e;
      }
    }
  }
  throw err;
}

export function loadXarcOptions(dir: string) {
  dir = dir || process.cwd();
  const filename = Path.join(dir, ".etmp/xarc-options.json");
  try {
    const data = Fs.readFileSync(filename, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}
