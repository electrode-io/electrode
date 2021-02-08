const { eslintRcNodeTypeScript } = require("@xarc/module-dev");

module.exports = {
  env: {
    mocha: true,
    browser: true,
    node: true
  },
  globals: {
    document: false
  },
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  },
  extends: eslintRcNodeTypeScript
};
