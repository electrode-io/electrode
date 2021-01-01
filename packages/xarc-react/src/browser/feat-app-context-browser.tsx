/**
 * Static Props support
 */
import { AppContext } from "../common/app-context";
import { createElement } from "react"; // eslint-disable-line
import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import { AppContextFeatureOptions, _appContextFeatureId, _appContextFeatureSubId } from "../common";

/**
 * Add support for react app context to a subapp
 *
 * This is added by the declareSubApp API automatically.
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
