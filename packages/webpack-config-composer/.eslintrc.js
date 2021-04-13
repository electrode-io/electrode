
const { eslintRcNodeTypeScript } = require("@xarc/module-dev");
module.exports = {
  extends: eslintRcNodeTypeScript,
  // plugins: ["jsdoc"],
  rules: {
    // disable the rule for all files
    "jsdoc/require-jsdoc": "off",
    "@typescript-eslint/[...arguments]": "off",
    "no-magic-numbers": "off",
    "global-require": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-param-reassign": "off",
  },
};