import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { Router, BrowserRouter } from "react-router-dom";
import { ReactRouterFeatureOptions, _id, _subId } from "../common";
import { createBrowserHistory } from "history";

let staticHistory;

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
      let history: any;
      let TheRouter: any;

      if (!options.hasOwnProperty("history") || options.history === true) {
        // if user didn't specify history or set it to true, then create a shared
        // history and use Router
        history = staticHistory || (staticHistory = createBrowserHistory());
        TheRouter = Router;
      } else if (options.history) {
        // use Router with the history user provided
        history = options.history;
        TheRouter = Router;
      } else {
        // user specify a falsy history, fallback to BrowserRouter
        TheRouter = BrowserRouter;
      }

      subapp._features.reactRouter = {
        id,
        subId,
        execute({ input }) {
          const Component = input.Component || subapp._getExport()?.Component;
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
