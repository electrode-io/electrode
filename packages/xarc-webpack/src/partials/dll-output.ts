/* eslint @typescript-eslint/no-var-requires: "off" */
import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";
const { detectXARCPath } = require("@xarc/app-dev/lib/utils");
const xarcOptions = loadXarcOptions();
const xarcCwd = detectXARCPath(xarcOptions);

module.exports = () => ({
  output: {
    path: Path.resolve(xarcCwd, "dll/js"),
    filename: "[name].bundle.[hash].js",
    library: "[name]_[hash]"
  }
});
