/**
 * Static Props support
 */

import { SubAppSSRData } from "@xarc/subapp";

export const _staticPropsFeatureId = "state-provider";
export const _staticPropsFeatureSubId = "static-props";

/**
 * Parameters type for the static props feature `getStaticProps` method.
 */
export type StaticPropsMethodParams = {
  ssrData: SubAppSSRData;
};

/**
 * Signature type for the `getStaticProps` method to pass to the static props feature.
 *
 */
export type getStaticPropsMethod = (params: StaticPropsMethodParams) => Promise<any>;

/**
 * type for the static props feature's server module.
 */
export type StaticPropsServerModule = {
  getStaticProps: getStaticPropsMethod;
};

/**
 * options for static props feature
 */
export type StaticPropsFeatureOptions = {
  /**
   * Path pointing to the module that exports the `getStaticProps` method on the server.
   *
   * Typically this should be from something like `require.resolve("./static-props")`
   *
   * Your module will be loaded and executed on the server only and will not be bundled for the
   * client, and it can use any node.js APIs.
   */
  serverModule: string;

  /**
   * If your module export the get static props method with a different name than `getStaticProps`,
   * then specify it here.
   */
  exportName?: string;
};
