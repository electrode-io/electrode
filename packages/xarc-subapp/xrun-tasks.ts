import { loadTasks } from "@xarc/module-dev";
const xrun = loadTasks();
import xsh from "xsh";

const { concurrent, serial } = xrun;
xrun.load("user", {
  build: () => {
    return serial([
      () => xsh.exec(true, "rm -rf dist-*"),
      concurrent([
        () => xsh.exec(true, "tsc --build tsconfig.node.cjs.json --pretty"),
        () => xsh.exec(true, "tsc --build tsconfig.node.esm.json --pretty"),
        () => xsh.exec(true, "tsc --build tsconfig.browser.es2x.esm.json --pretty")
      ])
    ]);
  }
});
