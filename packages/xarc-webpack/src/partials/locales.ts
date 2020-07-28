/* eslint-disable @typescript-eslint/no-var-requires */

const ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

// Note that in modern versions of `moment`, there is actually no
// `locale/en.js`, `en` is simply the default and included in `moment` itself.
// (There are territory modifiers like `en-gb.js` and `en-ca.js` however.)
// So don't expect to actually see `en.js` in the module list. `en` is listed
// here anyway so (1) the list of locales makes more sense and (2) just in case
// a past or future version of `moment` is used which does have `en.js`.
const LOCALES = ["en"];
const LOCALES_REGEX = new RegExp(`^\./(${LOCALES.join("|")})$`);

module.exports = function() {
  return {
    plugins: [new ContextReplacementPlugin(/moment[\\\/]locale$/, LOCALES_REGEX)]
  };
};
