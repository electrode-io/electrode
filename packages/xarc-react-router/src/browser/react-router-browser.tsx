import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

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
      const history = options.history || createBrowserHistory();

      subapp._features.reactRouter = {
        id,
        subId,
        execute({ input }) {
          const Component = input.Component || subapp._module.subapp.Component;
          return {
            Component: (props: any) => {
              return (
                <Router history={history}>
                  <Component {...props} />
                </Router>
              );
            }
          };
        }
      };

      return subapp;
    }
  };
}
