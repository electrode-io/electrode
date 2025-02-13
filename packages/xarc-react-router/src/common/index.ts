export type ReactRouterFeatureOptions = {
  /**
   * The React module.
   *
   * This is needed for the react router feature to wrap subapp's component inside
   * the Router component.
   */
  React: Partial<{ createElement: unknown }>;
  /**
   * A custom browser history object and control which Router to use.
   *
   * - If it's `true`, or not specified, then `Router` is used with history from `createBrowserHistory`
   *   from https://www.npmjs.com/package/history and the same history object will be shared
   *   among all subapps
   * - If it's a valid object, then it's assumed to be a history object and used with `Router`
   * - Finally fallback to use `BrowserRouter`, which internally uses its own history object that's not
   *   shared with other subapps.
   */
  history?: boolean | unknown; // eslint-disable-line @typescript-eslint/ban-types
};

export const _id = "router-provider";
export const _subId = "react-router";
export * from "react-router";
