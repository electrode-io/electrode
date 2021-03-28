/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import * as _ from "lodash";
import { logger } from "@xarc/dev-base";

function detectCSSModule(archetype) {
  const cssModuleSupport = _.get(archetype, "webpack.cssModuleSupport", true);
  const presetRegExp = {
    cssOnly: /\.css$/i,
    all: /\.(css|styl|sass|scss)$/i,
    byModExt: /\.(mod|module)\.(css|styl|sass|scss)$/i
  };

  if (cssModuleSupport === null) {
    throw new Error(`null is not a supported value for cssModuleSupport flag.`);
  }

  let cssModuleRegExp: RegExp | null = null;

  if (cssModuleSupport === false) {
    // turn off
  } else if (cssModuleSupport === true) {
    cssModuleRegExp = presetRegExp.cssOnly;
  } else if (cssModuleSupport.constructor.name === "String") {
    cssModuleRegExp = presetRegExp[cssModuleSupport];
    if (!cssModuleRegExp) {
      try {
        // in case we load the options from serialized xarc-options.json, where
        // regexp are serialized to be a string
        const lastSlash = cssModuleSupport.lastIndexOf("/");
        cssModuleRegExp = new RegExp(
          cssModuleSupport.substring(1, lastSlash),
          cssModuleSupport.substring(lastSlash + 1)
        );
      } catch (err) {
        logger.error(
          `Could not parse cssModuleSupport RegExp string "${cssModuleSupport}". Enabling CSS Module support for all ".css" files.`
        );

        cssModuleRegExp = presetRegExp.cssOnly;
      }
    }
  } else if (cssModuleSupport.constructor.name === "RegExp") {
    cssModuleRegExp = cssModuleSupport;
  } else {
    throw new Error(
      `Type ${typeof cssModuleSupport} is not supported for cssModuleSupport flag. Supported types are boolean or RexExp.`
    );
  }

  return { enableCssModule: Boolean(cssModuleRegExp), cssModuleRegExp };
}

module.exports = detectCSSModule;
