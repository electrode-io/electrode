const { eslintRcNodeTypeScript } = require("@xarc/module-dev");
module.exports = {
  extends: eslintRcNodeTypeScript,
  plugins: ["jsdoc"],
  rules: {
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "jsdoc/require-param-type": "off",
    "no-console": "off",
    "max-nested-callbacks": "off",
    "no-magic-numbers": "off",
    "no-unused-expressions": "off",
    "strict": "off"
  }
};
