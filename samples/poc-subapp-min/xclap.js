/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

process.env.SERVER_ES6 = true;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use PhantomJS to run your Karma Unit tests.  Default is "chrome" (Chrome Headless)
 */

// process.env.KARMA_BROWSER = "phantomjs";

require("electrode-archetype-react-app")();

//
// When single quote option is selected, this will use eslint to fix
// generated files from double to single quote after npm install.
// This is more reliable in case you stop npm install after the generator
// generated the app.
// You may remove this if you want.
//
const xclap = require("xclap");
const Fs = require("fs");
const Path = require("path");
xclap.load("user", {
  "fix-generator-eslint": {
    task: () => {
      const pkg = require("./package.json");
      if (pkg.scripts.install === "clap fix-generator-eslint") {
        pkg.scripts.install = "echo OK";
        Fs.writeFileSync(Path.resolve("package.json"), JSON.stringify(pkg, null, 2));
        return "~$eslint --fix config src test --ext .js,.jsx";
      }
    }
  }
});
