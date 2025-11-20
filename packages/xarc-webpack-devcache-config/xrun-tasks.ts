import { loadTasks } from "@xarc/module-dev";
import * as xrun from "@xarc/run";
import { $ } from "zx";

loadTasks();

const { concurrent } = xrun;

xrun.load("user", {
  build: async () => {
    await $`rm -rf dist-node-esm dist-node-cjs`;
    return concurrent(
      async () => await $`tsc --build tsconfig.cjs.json --pretty`,
      async () => await $`tsc --build tsconfig.esm.json --pretty`
    );
  }
});
