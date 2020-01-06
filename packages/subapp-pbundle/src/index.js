import FrameworkLib from "./fe-framework-lib";

import { setupFramework } from "subapp-web";

setupFramework(FrameworkLib);

export * from "subapp-web";

export { default as preact } from "preact";

export { h, Component, render } from "preact";

export { default as AppContext } from "./app-context";

export { FrameworkLib };
