import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "lib");
    return xrun.exec("tsc");
  }
});
