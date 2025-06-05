import xsh from "xsh";
import { loadTasks, xrun } from "@xarc/module-dev";

loadTasks();

const { concurrent } = xrun;

xrun.load("user", {
  build: () => {
    xsh.exec(true, "rm -rf dist*");
    return concurrent([
      () => xsh.exec(true, "tsc --build tsconfig.node.cjs.json --pretty"),
      () => xsh.exec(true, "tsc --build tsconfig.node.esm.json --pretty"),
      () => xsh.exec(true, "tsc --build tsconfig.browser.es2x.esm.json --pretty")
    ]);
  }
});
