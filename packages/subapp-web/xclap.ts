// load the electrode utilities
require("subapp-pkg-util");
import loadTasks from "@xarc/module-dev";
import { concurrent, exec, load, serial } from "xclap";

loadTasks();

const compile = () => serial(
    concurrent(exec("tsc -p tsconfig.browser.json"), exec("tsc -p tsconfig.node.json"), exec("tsc -p tsconfig.lib.json")),
    ["minify -s=dist/dev"]
);

load({ compile });
