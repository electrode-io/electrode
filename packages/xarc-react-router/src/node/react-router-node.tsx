import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { StaticRouter } from "react-router-dom";
import { ReactRouterFeatureOptions, _id, _subId } from "../common";

/**
 * Implement the component wrapping support for using react router on a subapp
 */
export function reactRouterFeature(options: ReactRouterFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line

  const id = _id;
  const subId = _subId;
  return {
    id,
    subId,
    add(subapp: SubAppDef) {
      subapp._features.reactRouter = {
        id,
        subId,
        execute({ input, ssrData }) {
          const Component = input.Component || subapp._getExport()?.Component;
          const routerContext = {};
          ssrData.context.user.routerContext = routerContext;

          return {
            Component: () => {
              return (
                <StaticRouter location={ssrData.path} context={routerContext}>
                  <Component />
                </StaticRouter>
              );
            }
          };
        }
      };

      return subapp;
    }
  };
}
