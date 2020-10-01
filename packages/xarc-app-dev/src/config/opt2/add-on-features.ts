/**
 * Optional features to support
 */
export type AddOnFeatures = {
  /** Enable flow.js support? **Default: `false`** */
  flow?: boolean;

  /**
   * Enable xarc's built-in eslint checks
   *  - This is enabled if you add `@xarc/opt-eslint` to your devDependencies
   */
  eslint?: boolean;

  /**
   * Enable support for running function tests with Karma
   * - **Default: `false`**
   * - This is enabled if you add `@xarc/opt-karma` to your devDependencies
   */
  karma?: boolean;

  /**
   * Enable support for running test with jest
   *  - This is enabled if you add `@xarc/opt-jest` to your devDependencies
   */
  jest?: boolean;

  /**
   * Enable support for running tests with mocha
   *  - This is enabled if you add `@xarc/opt-mocha` to your devDependencies
   */
  mocha?: boolean;

  /**
   * Select an implementation of the React UI framework  **Default: `react`**
   */
  reactLib?: "react" | "preact" | "inferno";

  /** Enable support for using TypeScript */
  typescript?: boolean;

  /**
   * Enable support for sass styling
   *  - This is enabled if you add `@xarc/opt-sass` to your devDependencies
   */
  sass?: boolean;
};
