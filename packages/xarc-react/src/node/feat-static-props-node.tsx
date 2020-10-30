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
export function staticPropsFeature(options: StaticPropsFeatureOptions): SubAppFeatureFactory {
  const id = _staticPropsFeatureId;
  const subId = _staticPropsFeatureSubId;
  return {
    id,
    subId,
    add(subapp: SubAppDef) {
      const serverModule = require(options.serverModule); // eslint-disable-line
      const exportName = options.exportName || "getStaticProps";

      subapp._features.staticProps = {
        id,
        subId,
        async execute({ input, ssrData }) {
          let res = serverModule[exportName]({ ssrData });
          if (res.then) {
            res = await res;
          }

          return {
            Component: () => <input.Component {...res.props} />,
            props: res.props
          };
        }
      };

      return subapp;
    }
  };
}
