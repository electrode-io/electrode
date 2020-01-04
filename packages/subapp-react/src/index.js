import FrameworkLib from "./fe-framework-lib";

import { setupFramework } from "subapp-web";

setupFramework(FrameworkLib);

export * from "subapp-web";

export { default as React } from "react";

export { default as AppContext } from "./app-context";

export { FrameworkLib };
