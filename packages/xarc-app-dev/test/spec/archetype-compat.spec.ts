import {
  XarcUserConfigs,
  CreateXarcOptions,
  defaultCreateXarcOptions
} from "../../src/config/xarc-user-configs";
import {
  syncAdditionalEnvVars,
  syncWebpackProcessEnvVars,
  mergeOptionalCheckIntoConfig
} from "../../src/config/archetype-compat";
import { describe, it, before, beforeEach } from "mocha";
import { expect } from "chai";
describe("syncWebpackProcessEnvVars", () => {
  it("syncs user config with env vars for webpack", () => {
    const gg = syncWebpackProcessEnvVars({
      webpack: {
        webpackDev: true,
        devPort: 3005
      }
    });
    console.log(gg);
  });
});
