/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import * as _ from "lodash";
const logger = require("@xarc/app-dev/lib/logger");

function detectCSSModule(archetype) {
  const cssModuleSupport = _.get(archetype, "webpack.cssModuleSupport", undefined);
  const defaultRegExp = /\.(mod|module)\.(css|styl|sass|scss)/i;

  /*
   * cssModuleSupport default to undefined
   * Default RexExp used - /\.(mod|module)\.(css|styl|sass|scss)/i
   *
   * cssModuleSupport:false => no CSS module support at all
   * cssModuleSupport:true|undefined => enable CSS module support for any file that match the default RegExp
   * cssModuleSupport:RegExp => enable CSS module support for any file that match the user provided RegExp
   */

  if (cssModuleSupport === null) {
    throw new Error(
      `null is not a supported value for cssModuleSupport flag. Supported types are boolean or RexExp.`
    );
  }
  if (cssModuleSupport === undefined) {
    return { enableCssModule: true, cssModuleRegExp: defaultRegExp };
  } else if (cssModuleSupport.constructor.name === "Boolean") {
    return { enableCssModule: cssModuleSupport, cssModuleRegExp: defaultRegExp };
  } else if (cssModuleSupport.constructor.name === "String") {
    let moduleExp;
    try {
      const lastSlash = cssModuleSupport.lastIndexOf("/");
      moduleExp = new RegExp(
        cssModuleSupport.slice(1, lastSlash),
        cssModuleSupport.slice(lastSlash + 1)
      );
    } catch (err) {
      logger.error(
        `Could not parse user provided value "${cssModuleSupport}" for cssModuleSupport flag. Enabling CSS Module support for ${defaultRegExp}.`
      );

      moduleExp = defaultRegExp;
    } finally {
      return { enableCssModule: true, cssModuleRegExp: moduleExp };
    }
  } else if (cssModuleSupport.constructor.name === "RegExp") {
    return { enableCssModule: true, cssModuleRegExp: cssModuleSupport };
  } else {
    throw new Error(
      `Type ${typeof cssModuleSupport} is not supported for cssModuleSupport flag. Supported types are boolean or RexExp.`
    );
  }
}

module.exports = detectCSSModule;
