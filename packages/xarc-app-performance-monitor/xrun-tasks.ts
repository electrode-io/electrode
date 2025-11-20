import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
const xsh = require("xsh");

const { serial, exec } = xrun;

xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "lib");
    xsh.$.rm("-rf", "lib-esm");
    return serial(
      exec("tsc"),
      exec("tsc --build tsconfig.esm.json")
    );
  }
});
