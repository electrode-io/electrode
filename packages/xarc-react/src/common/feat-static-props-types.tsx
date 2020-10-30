/**
 * Static Props support
 */

import { SubAppSSRData } from "@xarc/subapp";

export const _staticPropsFeatureId = "state-provider";
export const _staticPropsFeatureSubId = "static-props";

export type StaticPropsMethodParams = {
  ssrData: SubAppSSRData;
};

export type getStaticPropsMethod = (params: StaticPropsMethodParams) => Promise<any>;

/**
 *
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
   * Your module will be loaded and executed on the server only and will not be bundled for the client, and
   * it can use any node.js APIs.
   */
  serverModule: string;

  /**
   * Specify the name if the static props module exports the method as a different name than `getStaticProps`
   */
  exportName?: string;
};
