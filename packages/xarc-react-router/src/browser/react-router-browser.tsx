import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { Router, BrowserRouter } from "react-router-dom";
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
      let history: any;
      let TheRouter: any;

      if (!options.history) {
        TheRouter = BrowserRouter;
      } else {
        history = options.history === true ? createBrowserHistory() : options.history;
        TheRouter = Router;
      }

      subapp._features.reactRouter = {
        id,
        subId,
        execute({ input }) {
          const Component = input.Component || subapp._module.subapp.Component;
          return {
            Component: (props: any) => {
              return (
                <TheRouter history={history}>
                  <Component {...props} />
                </TheRouter>
              );
            }
          };
        }
      };

      return subapp;
    }
  };
}
