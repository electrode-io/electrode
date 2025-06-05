import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
import xsh from "xsh";

const { concurrent, exec } = xrun;
xrun.load("user", {
  build: () => {
    xsh.$.rm("-rf", "dist*");
    return concurrent(
      ...[
        "tsconfig.node.cjs.json",
        "tsconfig.node.esm.json"
      ].map(config => exec(`tsc --build ${config} --pretty`))
    );
  }
});
