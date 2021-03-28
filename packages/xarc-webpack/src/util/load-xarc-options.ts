/* eslint-disable @typescript-eslint/no-var-requires */

// copied from @xarc/app-dev/lib/utils for now because of circular dep
// TODO: make a @xarc/common package for base utils etc

const ck = require("chalker");
const Path = require("path");
const Fs = require("fs");

const regExpSig = "@xarc/__RegExp__@";

export const jsonParser = (key, value) => {
  if (typeof value === "string" && value.startsWith(regExpSig)) {
    const m = value.substr(regExpSig.length).match(/\/(.*)\/(.*)?/);
    return new RegExp(m[1], m[2] || "");
  } else {
    return value;
  }
};

let cachedXarcOptions;

export function loadXarcOptions(dir: string = process.env.XARC_CWD || process.cwd()) {
  if (cachedXarcOptions) {
    return cachedXarcOptions;
  }
  const filename = Path.join(dir, ".etmp/xarc-options.json");
  try {
    const data = Fs.readFileSync(filename, "utf-8");
    return (cachedXarcOptions = JSON.parse(data, jsonParser));
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

    console.error(err.stack); // eslint-disable-line

    return (cachedXarcOptions = {
      webpack: {},
      babel: {},
      options: {}
    });
  }
}
