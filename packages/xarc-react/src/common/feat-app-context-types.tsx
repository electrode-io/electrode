/**
 * app context support
 */

export const _appContextFeatureId = "app-context-provider";
export const _appContextFeatureSubId = "react-context";

/**
 * options for static props feature
 */
export type AppContextFeatureOptions = {
  /**
   * Attach any value to the app context
   */
  value?: Record<any, unknown>;
};
