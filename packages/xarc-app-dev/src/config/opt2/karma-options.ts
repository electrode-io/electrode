// configs from ../env-karma.ts

/**
 * configurable options for karma
 * - Only applicable if `@xarc/opt-karma` feature is added and enabled.
 */
export type KarmaConfigs = {
  /**
   * Set the browser to use for karma.
   *
   * - **Default: "chrome"**
   * - if not set, then check env KARMA_BROWSER
   */
  browser?: "chrome" | "phantomjs";
};
