import isomorphicLoader from "isomorphic-loader";

export * from "./support";

/**
 * This is the `require` from @xarc/app's directory.
 */
export const xAppRequire = require;

export { isomorphicLoader };

export { makeAppMode } from "./app-mode";

export { PROD_DIR, ETMP_DIR } from "./constants";
