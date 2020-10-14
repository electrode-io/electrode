/* eslint-disable @typescript-eslint/no-var-requires */

import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function() {
  const xarcOptions = loadXarcOptions();
  const urlLoader = require.resolve("url-loader");
  const fileLoader = require.resolve("file-loader");
  const isomorphicLoader = require.resolve("isomorphic-loader");

  return {
    module: {
      rules: [
        {
          _name: "font-woff",
          test: /\.(woff|woff2)(\?\S*)?$/i,
          use: [
            {
              loader: urlLoader,
              options: {
                limit: xarcOptions.webpack.woffFontInlineLimit,
                mimetype: "application/font-woff"
              }
            },
            isomorphicLoader
          ]
        },
        {
          _name: "font-file",
          test: /\.(eot|ttf)(\?\S*)?$/i,
          use: [fileLoader, isomorphicLoader]
        }
      ]
    }
  };
};
