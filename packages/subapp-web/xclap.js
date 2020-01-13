const xclap = require("xclap");
const { env, exec, concurrent } = xclap;

xclap.load({
  compile: concurrent("compile-browser", "compile-dist", "compile-node"),
  "compile-browser": exec("babel src -d browser --delete-dir-on-start --source-maps", {
    env: { BABEL_ENV: "src-browser" }
  }),
  "compile-dist": exec("babel src -d dist --delete-dir-on-start --source-maps", {
    env: { MINIFY: "true", BABEL_ENV: "src-dist" }
  }),
  "compile-node": exec("babel src -d node-dist --delete-dir-on-start --source-maps", {
    env: { BABEL_ENV: "src-node" }
  })
});

require("electrode-archetype-njs-module-dev")();
