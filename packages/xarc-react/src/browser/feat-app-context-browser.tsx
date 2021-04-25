/**
 * Static Props support
 */
import { AppContext } from "../common/app-context";
import { createElement } from "react"; // eslint-disable-line
import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import {
  AppContextFeatureOptions,
  _appContextFeatureId,
  _appContextFeatureSubId
} from "../common/feat-app-context-types";

/**
 * Add support for react app context to a subapp
 *
 * @remark This is added by the {@link declareSubApp} API automatically.
 *
 * Example:
 *
 * ```tsx
 * import { ReactSubApp, appContextFeature, AppContext, React } from "@xarc/react";
 *
 * const Sample = () => {
 *   return (
 *     <AppContext.Consumer>
 *       {({ isSsr, ssr }) => {
 *         if (isSsr) {
 *           return <div>Server Side Rendering {ssr.request.url}</div>;
 *         }
 *       }}
 *     </AppContext.Consumer>
 *   );
 * };
 *
 * export subapp: ReactSubApp = {
 *   Component: Sample,
 *   wantFeatures: [
 *     appContextFeature()
 *   ]
 * }
 * ```
 *
 * @param options - app context feature options
 * @returns subapp feature factory for app context
 */
export function appContextFeature(options: AppContextFeatureOptions = {}): SubAppFeatureFactory {
  const id = _appContextFeatureId;
  const subId = _appContextFeatureSubId;
  return {
    id,
    subId,
    add(subapp: SubAppDef) {
      subapp._features.appContext = {
        id,
        subId,
        execute({ input }) {
          return {
            Component: () => {
              return (
                <AppContext.Provider value={{ isSsr: false, ssr: {}, ...options.value }}>
                  <input.Component />
                </AppContext.Provider>
              );
            }
          };
        }
      };
      return subapp;
    }
  };
}
