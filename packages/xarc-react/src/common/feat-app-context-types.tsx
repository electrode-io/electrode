/**
 * app context support
 *
 */

export const _appContextFeatureId = "app-context-provider";
export const _appContextFeatureSubId = "react-context";

/**
 * options for app context feature
 *
 * @remark
 * See {@link appContextFeature}.
 */
export type AppContextFeatureOptions = {
  /**
   * Attach any value to the app context
   */
  value?: Record<any, unknown>;
};
