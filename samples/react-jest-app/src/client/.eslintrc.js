const { eslintRcReact } = require("@xarc/app-dev");

module.exports = {
  extends: eslintRcReact,
  env: {
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};
