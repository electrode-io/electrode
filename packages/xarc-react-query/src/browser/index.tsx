/* eslint-disable max-statements */

import { SubAppDef, SubAppFeatureFactory, SubAppFeature, envHooks } from "@xarc/subapp";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { featureId, featureSubId } from "../common/feature-info";

import { ReactQueryFeature, ReactQueryFeatureOptions } from "../common";

//
// re-export
//
export * from "../common";

/**
 * Add support for react query to a subapp
 *
 * @param meta
 * @returns unknown
 */
export function reactQueryFeature(options: ReactQueryFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line

  const id = featureId;
  const subId = featureSubId;

  const add = (def: SubAppDef) => {
    const subAppName = def.name;
    const subapp = envHooks.getContainer().get(subAppName);
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

    reactQuery.execute = async function ({ input, csrData }) {
      const dehydratedState = csrData.getInitialState();

      const WrapComp = this.wrap({
        Component:
          input.Component || envHooks.getContainer().get(subAppName)._getExport()?.Component,
        queryClient,
        dehydratedState
      });
      return {
        Component: () => WrapComp
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
