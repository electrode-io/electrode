/**
 * Static Props support
 */
import { createElement } from "react"; // eslint-disable-line
import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import {
  StaticPropsFeatureOptions,
  _staticPropsFeatureId,
  _staticPropsFeatureSubId
} from "../common";

/**
 * Add support for static props to a subapp
 *
 * TODO: handle hot module reload
 *
 * @param options - static props feature options
 * @returns subapp feature factory for static props
 */
export function staticPropsFeature(_options: StaticPropsFeatureOptions): SubAppFeatureFactory {
  const id = _staticPropsFeatureId;
  const subId = _staticPropsFeatureSubId;
  return {
    id,
    subId,
    add(subapp: SubAppDef) {
      subapp._features.staticProps = {
        id,
        subId,
        execute({ input, startOptions }) {
          const props = startOptions.getInitialState();
          return {
            Component: () => {
              return <input.Component {...props} />;
            }
          };
        }
      };
      return subapp;
    }
  };
}
