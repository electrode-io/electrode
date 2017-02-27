"use strict";

const exec = require("electrode-gulp-helper").exec;

/**
 * There is a full range of gulp tasks defined in the above archetype
 * but below is a concise list of most often used gulp tasks at the
 * component level
 *
 * Full list of gulp tasks:
 * https://github.com/electrode-io/electrode-archetype-react-component/blob/master/archetype-gulpfile.js#L38-L134
 *
 */

const tasks = {
  "demo": ["generate", "server-dev"],
  "demo-iso": ["dev-iso"],
  "generate": ["generate-metadata", "generate-documentation"],
  "generate-documentation": () => exec(`electrode-docgen --package ./package.json --src ./src --markdown components.md`),
  "generate-metadata": () => exec(`electrode-docgen --package ./package.json --src ./src --metadata components.json`),
<% if (quoteType === "'") { %>
  'archetype:lint-server': () => exec(`eslint --color -c ./.eslintrc config/karma config/webpack demo-server`),
  "lint-react-demo": () => exec(`eslint --ext .js,.jsx -c ./.eslintrc demo/*.jsx --color`),
  "lint-react-src": () => exec(`eslint --ext .js,.jsx -c ./.eslintrc src --color`),
  "lint-scripts": () => exec(`eslint --ext .js -c ./.eslintrc scripts --color`),
  "lint-react-test": () => exec(`eslint --ext .js,.jsx -c ./test/client/.eslintrc test/client --color`),
<% } %>
  "prepublish": ["npm:prepublish"],
  "preversion": ["check-cov"]
};

require("electrode-archetype-react-component")(tasks);
