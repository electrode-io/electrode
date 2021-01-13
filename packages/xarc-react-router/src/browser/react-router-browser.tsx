import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { Router, BrowserRouter } from "react-router-dom";
import { ReactRouterFeatureOptions, _id, _subId } from "../common";
import { createBrowserHistory } from "history";
let reactRouterHistory;
/**
 * Implement the component wrapping support for using react router on a subapp
 */
export function reactRouterFeature(options: ReactRouterFeatureOptions): SubAppFeatureFactory {
  console.log(`options.history ${options.history}`)
  const { createElement } = options.React; // eslint-disable-line

  const id = _id;
  const subId = _subId;

  return {
    id,
    subId,
    add(subapp: SubAppDef) {
      let history: any;
      let TheRouter: any;

      if (options.history === false) {
        TheRouter = BrowserRouter;
      } else {
        if (reactRouterHistory === undefined) {
          reactRouterHistory = createBrowserHistory();
        }
        if (options.history === true) {
          history = reactRouterHistory;
        } else {
          history = options.history !== undefined ? options.history : reactRouterHistory;
        }
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
