const { eslintRcReact } = require("@xarc/app-dev");
module.exports = {
  extends: eslintRcReact,
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["jsx"] }]
  }
};
