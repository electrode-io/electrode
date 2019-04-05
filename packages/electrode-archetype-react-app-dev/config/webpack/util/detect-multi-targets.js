const archetype = require("electrode-archetype-react-app/config/archetype");

function hasMultiTargets() {
  return (
    Object.keys(archetype.babel.envTargets)
      .sort()
      .join(",") !== "default,node"
  );
}

module.exports = hasMultiTargets;
