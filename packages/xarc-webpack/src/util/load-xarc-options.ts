/* eslint-disable @typescript-eslint/no-var-requires */

const ck = require("chalker");
const Path = require("path");
const Fs = require("fs");

let loaded;

export function loadXarcOptions(dir: string = process.cwd()) {
  if (loaded) {
    return loaded;
  }
  dir = dir || process.cwd();
  const filename = Path.join(dir, ".etmp/xarc-options.json");
  try {
    const data = Fs.readFileSync(filename, "utf-8");
    return (loaded = JSON.parse(data));
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
    return (loaded = {
      webpack: {},
      babel: {},
      options: {}
    });
  }
}
