"use strict";

<% if (quoteType === "'") { %>
const exec = require("electrode-gulp-helper").exec;
<% } %>

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
  <% if (quoteType === "'") { %>
  'archetype:lint-server': () => exec(`eslint --color -c ./.eslintrc config/karma config/webpack`),
  "lint-react-src": () => exec(`eslint --ext .js,.jsx -c ./.eslintrc src --color`),
  "lint-scripts": () => exec(`eslint --ext .js -c ./.eslintrc scripts --color`),
  "lint-react-test": () => exec(`eslint --ext .js,.jsx -c ./test/client/.eslintrc test/client --color`),
  <% } %>
  "prepublish": ["npm:prepublish"]
};

require("electrode-archetype-react-component")(tasks);
