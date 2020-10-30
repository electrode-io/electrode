import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

const { concurrent, serial, exec } = xrun;
xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "dist-*");
    return serial(
      concurrent(
        ...[
          "tsconfig.node.cjs.json",
          "tsconfig.node.esm.json",
          "tsconfig.browser.es5.cjs.json",
          "tsconfig.browser.es2x.esm.json"
        ].map(config => exec(`tsc --build ${config} --pretty`))
      ),
      exec("babel dist-browser~es5~cjs~/browser/ --no-comments --delete-dir-on-start -d dist/min")
    );
  }
});
