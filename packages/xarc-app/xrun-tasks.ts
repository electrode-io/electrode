import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

xrun.load("user", {
  build: context => {
    if (context.argOpts.clean) {
      console.log("@xarc/app build cleaning dist");
      xsh.$.rm("-rf", "dist");
    }
    return xrun.exec("tsc");
  }
});
