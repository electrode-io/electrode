import { BarPlugin } from "../plugins/bar-plugin";

export default {
  bar: {
    config: {
      entry: "bar.js",
      plugins: [new BarPlugin()],
    },
  },
};
