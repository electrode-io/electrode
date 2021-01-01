/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = () => {
  const { babel, namespace } = loadXarcOptions();

  const inspectpack = process.env.INSPECTPACK_DEBUG === "true";

  const getOutputFilename = () => {
    const nsTag = namespace ? `${namespace}.` : "";
    let filename = `${nsTag}[name].bundle.[contenthash].js`;

    if (babel.hasMultiTargets) {
      filename = `${babel.target}.${nsTag}[name].bundle.[contenthash].js`;
    }

    return filename;
  };

  const getOutputPath = () => {
    if (process.env.WEBPACK_DEV === "true") {
      return "/"; // simulate the behavior of webpack-dev-server, which sets output path to /
    } else {
      return Path.resolve(babel.target !== "default" ? `dist-${babel.target}` : "dist", "js");
    }
  };

  return {
    output: {
      path: getOutputPath(),
      pathinfo: inspectpack, // Enable path information for inspectpack
      publicPath: "/js/",
      chunkFilename: getOutputFilename(),
      filename: getOutputFilename()
    }
  };
};
