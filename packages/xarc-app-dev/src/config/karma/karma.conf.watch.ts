/*
 * Karma Configuration: "watch" version.
 *
 * This configuration allows live updates of code changes.
 */

import Path from "path";
import dev from "./karma.conf.dev";
import { loadUserConfig } from "./util/load-user-config";

/**
 * Karma config for watching mode
 *
 * @param config
 * @returns karma config
 */
export = function(config) {
  dev(config);
  const settings = {
    crossOriginAttribute: false,
    files: [
      // Test bundle (must be created via `npm run dev|server-test`)
      "http://127.0.0.1:3001/assets/bundle.js" as any
      // Watch these files but do not add them to the bundle.
    ].concat(
      ["src/client/**", "test/**"].map(pattern => {
        return {
          pattern,
          included: false,
          served: false,
          watched: true
        } as any;
      })
    )
  };

  loadUserConfig(Path.basename(__filename), config, settings);
};
