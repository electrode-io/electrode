var path = require("path");
var archetype = require("@xarc/app-dev/config/archetype");
var archetypeEslint = path.join(archetype.getDevOptions()?.config?.eslint, ".eslintrc-react");

function dotify(p) {
  return path.isAbsolute(p) ? p : "." + path.sep + p;
}

module.exports = {
  extends: dotify(path.relative(__dirname, archetypeEslint)),
  rules: {
    "no-magic-numbers": "off",
    "react/prop-types": "off",
    "arrow-parens": "off",
    "no-trailing-spaces": "off",
    "react/no-unescaped-entities": "off",
    "comma-dangle": "off",
    "no-shadow": "off",
    "eol-last": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-unused-expressions": "off"
  }
};
