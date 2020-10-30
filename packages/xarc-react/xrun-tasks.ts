import { loadTasks, xrun } from "@xarc/module-dev";
const xsh = require("xsh");

loadTasks();
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
