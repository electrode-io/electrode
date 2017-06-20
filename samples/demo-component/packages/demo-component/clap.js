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

const xclap = require("xclap");
const tasks = {
  
  "prepublish": ["npm:prepublish"]
};

xclap.load("myprj", tasks);

require("electrode-archetype-react-component")(xclap);
