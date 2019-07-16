const xclap = require("xclap");
xclap.load({
  minify: xclap.exec("babel src -d dist --source-maps=inline", {
    execOptions: { env: { MINIFY: "true" } }
  })
});
require("electrode-archetype-njs-module-dev")();
