/* eslint-disable max-statements */

import { SubAppFeature, SubAppSSRData } from "@xarc/subapp";
import { QueryClient } from "react-query";

//
// re-export
//
export * from "react-query";
export { dehydrate, Hydrate } from "react-query/hydration";

export type prefetchQueryMethod = ({
  queryClient,
  ssrData
}: {
  queryClient: QueryClient;
  ssrData: SubAppSSRData;
}) => Promise<{ queryClient: QueryClient; dehydratedState: unknown }>;

/**
 * Server module for exporting the `prefetchQuery` method
 */
export type PrefetchQueryServerModule = {
  prefetchQuery: prefetchQueryMethod;
};

/**
 * react-query feature options
 */
export type ReactQueryFeatureOptions = {
  /**
   * The React module.
   *
   * This is needed for the react query feature to wrap subapp's component inside
   * the react query client provider component.
   */
  React: Partial<{ createElement: unknown }>;

  /**
   * Custom react-query client.
   *
   * If not provided, then create from `new QueryClient`
   */
  queryClient?: QueryClient;

  /**
   * Path pointing to the module that exports the `prefetchQuery` method on the server.
   *
   * Typically this should be from something like `require.resolve("./react-query-prefetch")`
   *
   * Your module will be loaded and executed on the server only and will not be bundled for the
   * client, and it can use any node.js APIs.
   *
   * A typical `prefetchQuery` may look like this:
   *
   * ```js
   * export const prefetchQuery = async ({ queryClient, ssrData }) => {
   *   await queryClient.prefetchQuery("test", testFetch);
   *   const dehydratedState = dehydrate(queryClient);
   *   queryClient.resetQueries();
   *   return { queryClient, dehydratedState };
   * };
   * ```
   *
   * .
   */
  serverModule?: string;

  /**
   * If your module export the prefetch query method with a different name than `prefetchQuery`,
   * then specify it here.
   */
  exportName?: string;
};

export type ReactQueryFeature = SubAppFeature & {
  options: ReactQueryFeatureOptions;
  wrap: (_: any) => any;
};
