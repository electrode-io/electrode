"use strict";

/**
 * There is a full range of clap tasks defined in the above archetype
 * but below is a concise list of most often used clap tasks at the
 * component level
 *
 * Full list of clap tasks:
 * https://github.com/electrode-io/electrode-archetype-react-component/blob/master/archetype-clap.js#L38-L134
 *
 */

const tasks = {
  <% if (quoteType === "'") { %>
  'archetype:lint-server': `eslint --color -c ./.eslintrc config/karma config/webpack`,
  "lint-react-src": `eslint --ext .js,.jsx -c ./.eslintrc src --color`,
  "lint-scripts": `eslint --ext .js -c ./.eslintrc scripts --color`,
  "lint-react-test": `eslint --ext .js,.jsx -c ./test/client/.eslintrc test/client --color`,
  <% } %>
  "prepublish": ["npm:prepublish"]
};

const xclap = require("xclap");

xclap.load("ext", tasks);

require("electrode-archetype-react-component")(xclap);
