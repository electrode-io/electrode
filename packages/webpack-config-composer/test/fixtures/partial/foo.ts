import { FooPlugin } from "../plugins/foo-plugin";

export default {
  foo: {
    config: {
      entry: "foo.js",
      testFoo: "foo",
      plugins: [new FooPlugin()],
    },
  },
};
