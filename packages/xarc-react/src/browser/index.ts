export * from "../common";
// import { ReactLib } from "./react-lib";

import { setupFramework } from "@xarc/subapp";

import { BrowserReactLib } from "./react-lib";

setupFramework((...args) => new BrowserReactLib(...args));
