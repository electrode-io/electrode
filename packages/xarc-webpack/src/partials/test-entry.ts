import * as Path from "path";

module.exports = function() {
  return {
    context: Path.resolve("test", "client"),
    entry: require.resolve("@xarc/app-dev/config/karma/entry")
  };
};
