import makeOptionalRequire from "optional-require";

import Path from "path";
import _ from "lodash";
import assert from "assert";

const optionalRequire = makeOptionalRequire(require);

export function loadUserConfig(filename, config, settings) {
  const filePath = Path.resolve("archetype/config/karma", filename);
  const userConfig = optionalRequire(filePath);

  if (userConfig) {
    assert(_.isFunction(userConfig), `${filePath} must export a function`);
    userConfig(config, settings);
  } else {
    config.set(settings);
  }
}
