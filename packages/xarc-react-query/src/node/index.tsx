/* eslint-disable max-statements */

import { SubAppDef, SubAppFeatureFactory, SubAppFeature, envHooks, xarcV2 } from "@xarc/subapp";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate, dehydrate } from "react-query/hydration";

import { prefetchQueryMethod, ReactQueryFeature, ReactQueryFeatureOptions } from "../common";

import { featureId, featureSubId } from "../common/feature-info";
//
// re-export
//
export * from "../common";

/**
 * Add support for react-query to a subapp
 *
 * @param meta
 * @returns unknown
 */
export function reactQueryFeature(options: ReactQueryFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line

  const id = featureId;
  const subId = featureSubId;

  xarcV2.debug("registering react-query feature for subapp");

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
          <Hydrate state={dehydratedState}>
            <Component />
          </Hydrate>
        </QueryClientProvider>
      );
    };

    const queryClient = options.queryClient || new QueryClient();

    xarcV2.debug("adding react-query feature for subapp", subAppName);

    reactQuery.execute = async function ({ input, ssrData }) {
      let dehydratedState;
      let qc = queryClient;

      if (serverModule) {
        const res = await (serverModule[exportName] as prefetchQueryMethod)({
          queryClient,
          ssrData
        });
        dehydratedState = res.dehydratedState || {};
        qc = res.queryClient || queryClient;
      } else {
        dehydratedState = dehydrate(qc);
      }

      xarcV2.debug("react-query execute for subapp:", subAppName);

      return {
        Component: () => {
          xarcV2.debug("react-query component for subapp:", subAppName, "queryClient:", typeof qc);
          return this.wrap({
            Component:
              input.Component || envHooks.getContainer().get(subAppName)._getExport()?.Component,
            queryClient: qc,
            dehydratedState
          });
        },
        props: dehydratedState
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
