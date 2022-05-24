import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { StaticRouter } from "react-router-dom/server";
import { ReactRouterFeatureOptions, _id, _subId } from "../common";

/**
 * Implement the component wrapping support for using react router on a subapp
 *
 * @param {object} options - router feature options
 * @returns {object} - feature factory which can add router feature on a subapp
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
          return {
            Component: () => {
              return (
                <StaticRouter location={ssrData.path}>
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
