import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

const { concurrent, exec } = xrun;
xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "dist*");
    return concurrent(
      ...[
        "tsconfig.node.cjs.json",
        "tsconfig.node.esm.json",
        "tsconfig.browser.es5.cjs.json",
        "tsconfig.browser.es2x.esm.json"
      ].map(config => exec(`tsc --build ${config} --pretty`))
    );
  }
});
