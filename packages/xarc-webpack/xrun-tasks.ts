import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

xrun.load("user", {
  build: () => {
    const { serial, exec } = xrun;
    xsh.$.rm("-rf", "lib");
    return serial(exec("tsc"), exec("tsc --build tsconfig.browser.es5.cjs.json"));
  }
});
