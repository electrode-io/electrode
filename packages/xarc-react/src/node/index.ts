export * from "../common/index";
import { setupFramework } from "@xarc/subapp";

import { SSRReactLib } from "./react-lib";

setupFramework((...args) => new SSRReactLib(...args));

export { SSRReactLib };
