const { eslintRcNodeTypeScript } = require("@xarc/module-dev");
module.exports = {
  extends: eslintRcNodeTypeScript,
  rules: {
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};
