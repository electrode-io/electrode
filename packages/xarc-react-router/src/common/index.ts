import { BrowserHistory } from "history";

export type ReactRouterFeatureOptions = {
  /**
   * The React module.
   *
   * This is needed for the react router feature to wrap subapp's component inside
   * the Router component.
   */
  React: any;
  /**
   * The browser history object - custom browser history object and control which Router to use.
   *
   * - If it's false, then `BrowserRouter` will be used and it will use its own history.
   * - Note: BrowserRouter use its own history object and its not shared among other subapps
   * - If it's `true`, then `Router` is used with history from `createBrowserHistory`
   *   from https://www.npmjs.com/package/history and the same history object will be shared among all subapps
   * - Otherwise it's assumed to be a history object and `Router` will be used with it. If its undefined then shared history object will be used for all subapps
   */
  history?: boolean | unknown; // eslint-disable-line @typescript-eslint/ban-types
};

export const _id = "router-provider";
export const _subId = "react-router";

//
// re-export react-router-dom as ReactRouterDom etc
//
export * as ReactRouterDom from "react-router-dom";
export * from "react-router-dom";

//
// re-export react-router as ReactRouter
//
export * as ReactRouter from "react-router";
