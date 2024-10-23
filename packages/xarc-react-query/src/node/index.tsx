/* eslint-disable max-statements */

import {
  SubAppDef,
  SubAppFeatureFactory,
  SubAppFeature,
  envHooks,
  xarcV2,
} from "@xarc/subapp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import {
  prefetchQueryMethod,
  ReactQueryFeature,
  ReactQueryFeatureOptions,
} from "../common";

import { featureId, featureSubId } from "../common/feature-info";
//
// re-export
//
export * from "../common";

/**
 * Add support for @tanstack/react-query to a subapp
 *
 * @param meta
 * @returns unknown
 */
export function reactQueryFeature(
  options: ReactQueryFeatureOptions
): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line

  const id = featureId;
  const subId = featureSubId;

  xarcV2.debug("registering @tanstack/react-query feature for subapp");

  const add = (def: SubAppDef) => {
    const subAppName = def.name;
    const subapp = envHooks.getContainer().get(subAppName);
    const serverModule = options.serverModule && require(options.serverModule); // eslint-disable-line
    const exportName = options.exportName || "prefetchQuery";

    const reactQuery: Partial<ReactQueryFeature> = { id, subId };

    subapp._features.reactQuery = reactQuery as SubAppFeature;

    reactQuery.options = options;
    reactQuery.wrap = ({ Component, queryClient, dehydratedState }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <Component />
          </HydrationBoundary>
        </QueryClientProvider>
      );
    };

    const queryClient = options.queryClient || new QueryClient();

    xarcV2.debug("adding @tanstack/react-query feature for subapp", subAppName);

    reactQuery.execute = async function ({ input, ssrData }) {
      let dehydratedState;
      let qc = queryClient;

      if (serverModule) {
        const res = await (serverModule[exportName] as prefetchQueryMethod)({
          queryClient,
          ssrData,
        });
        dehydratedState = res.dehydratedState || {};
        qc = res.queryClient || queryClient;
      } else {
        dehydratedState = dehydrate(qc);
      }

      xarcV2.debug("@tanstack/react-query execute for subapp:", subAppName);

      return {
        Component: () => {
          xarcV2.debug(
            "@tanstack/react-query component for subapp:",
            subAppName,
            "queryClient:",
            typeof qc
          );
          return this.wrap({
            Component:
              input.Component ||
              envHooks.getContainer().get(subAppName)._getExport()?.Component,
            queryClient: qc,
            dehydratedState,
          });
        },
        props: dehydratedState,
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
