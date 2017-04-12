const FooPlugin = require("../plugins/foo-plugin");

module.exports = {
  "foo": {
    config: {
      entry: "foo.js",
      testFoo: "foo",
      plugins: [
        new FooPlugin()
      ]
    }
  }
};
