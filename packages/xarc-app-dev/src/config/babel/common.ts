/* eslint-disable @typescript-eslint/no-var-requires */

const ck = require("chalker");
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
    // eslint-disable-next-line
    console.error(ck`
<red>ERROR</>: Electrode xarc fail to load <cyan>.etmp/xarc-options.json</> in
dev mode.  This means you are trying to use something not through
xarc's development tasks.

full path: ${filename}

Please run "clap setup-dev" once to initialize the file
<cyan>.etmp/xarc-options.json</> before doing your thing that loads
xarc's development code.
`);
    return {
      webpack: {},
      babel: {},
      options: {}
    };
  }
}
