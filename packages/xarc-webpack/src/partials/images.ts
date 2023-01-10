/* eslint-disable @typescript-eslint/no-var-requires */

import * as _ from "lodash";

import { xAppRequire } from "@xarc/app";

const isomorphicLoader = xAppRequire.resolve("isomorphic-loader");
const optionalRequire = require("optional-require")(require);
import { logger } from "@xarc/dev-base";

function getCdnLoader(optLoader) {
  if (optLoader) {
    const resolvedOptLoader = optionalRequire.resolve(optLoader);
    if (resolvedOptLoader) {
      return resolvedOptLoader;
    }
    logger.warn(`Optional CDN loader "${optLoader}" can't be resolved`);
  }

  const loader = _(["electrode-cdn-file-loader", "cdn-file-loader", "file-loader"]).find(
    optionalRequire.resolve
  );

  return (loader && require.resolve(loader)) || "file-loader";
}

module.exports = function (options) {
  return {
    module: {
      rules: [
        {
          _name: "image",
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          use: [
            {
              loader: getCdnLoader(options.cdnLoader),
              options: {
                limit: 10000
              }
            },
            isomorphicLoader
          ]
        }
      ]
    }
  };
};
