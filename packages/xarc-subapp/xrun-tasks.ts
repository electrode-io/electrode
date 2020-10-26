import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "dist-*");
    return xrun.exec(
      "tsc --build tsconfig.node.cjs.json tsconfig.node.esm.json tsconfig.browser.es5.cjs.json tsconfig.browser.es2x.esm.json"
    );
  }
});
