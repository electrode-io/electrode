
const { eslintRcReact } = require("@xarc/app-dev");
module.exports = {
  extends: eslintRcReact,
  "react/no-unknown-property": ["error", { ignore: ["jsx"] }]
};