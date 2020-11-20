/* eslint @typescript-eslint/no-var-requires: "off" */
import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";

const xarcOptions = loadXarcOptions();
const xarcCwd = xarcOptions.cwd;

module.exports = () => ({
  output: {
    path: Path.resolve(xarcCwd, "dll/js"),
    filename: "[name].bundle.[hash].js",
    library: "[name]_[hash]"
  }
});
