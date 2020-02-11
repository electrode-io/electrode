const baseProfile = require("../profile.base");
const testBaseProfile = require("../profile.base.test");
const Path = require("path");

function testConfigs() {
  const testProfile = {
    partials: {
      "_dev-mode": { order: 10000 },
      "_sourcemaps-inline": { order: 10100 },
      "_simple-progress": { order: 10300 }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      "_test-base": testBaseProfile,
      _test: testProfile
    },
    profileNames: ["_base", "_test-base", "_test"],
    configFilename: Path.basename(__filename)
  };

  return options;
}

module.exports = testConfigs();
