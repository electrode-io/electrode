const { eslintRcNodeTypeScript } = require("@xarc/module-dev");
module.exports = {
  extends: eslintRcNodeTypeScript,
  plugins: ["jsdoc"],
  rules: {
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "jsdoc/require-param-type": "off"
  }
};
