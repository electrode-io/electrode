const xclap = require("xclap");
xclap.load({
  minify: xclap.exec("babel src -d dist --source-maps", {
    execOptions: { env: { MINIFY: "true" } }
  })
});
require("electrode-archetype-njs-module-dev")();
