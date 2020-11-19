import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";
const { detectXARCPath } = require("@xarc/app-dev/lib/utils");
const xarcOptions = loadXarcOptions();
const xarcPath = detectXARCPath(xarcOptions.XARC_CWD);
module.exports = () => ({
  output: {
    path: Path.resolve(xarcPath,"dll/js"),
    filename: "[name].bundle.[hash].js",
    library: "[name]_[hash]"
  }
});
