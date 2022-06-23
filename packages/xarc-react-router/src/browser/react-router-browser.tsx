import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
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

      subapp._features.reactRouter = {
        id,
        subId,
        execute({ input }) {
          const Component = input.Component || subapp._getExport()?.Component;
          return {
            Component: (props: any) => {
              /**
               * unstable_HistoryRouter as HistoryRouter is used here instead of <Router>
               * because react_router v6 removed history prop support for <Router>.
               * This API is currently prefixed as unstable_ because you may unintentionally
               * add two versions of the history library, the one you have added
               * to the package.json and whatever version React Router uses internally.
               * Once react-router has a mechanism to detect mis-matched versions,
               * this API will remove its unstable_ prefix.
               * https://reactrouter.com/docs/en/v6/routers/history-router
               * For now, use the unstable_HistoryRouter version here.
               */
              if (!options.hasOwnProperty("history") || options.history === true) {
                // if user didn't specify history or set it to true, then create a shared
                // history and use HistoryRouter
                history = staticHistory || (staticHistory = createBrowserHistory());
                TheRouter = HistoryRouter;
              } else if (options.history) {
                // use HistoryRouter with the history user provided
                history = options.history;
                TheRouter = HistoryRouter;
              } else {
                // user specify a falsy history, fallback to BrowserRouter
                TheRouter = BrowserRouter;
              }
              // conditional history props. BrowserRouter does not support history props in v6.
              const historyProps = history ? { history } : {};
              return (
                <TheRouter {...historyProps} >
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
