const BarPlugin = require("../plugins/bar-plugin");

module.exports = {
  "bar": {
    config: {
      entry: "bar.js",
      plugins: [
        new BarPlugin()
      ]
    }
  }
};
