/**
 * Static Props support
 */
import { createElement } from "react"; // eslint-disable-line
import { SubAppDef, SubAppFeatureFactory } from "@xarc/subapp";
import {
  StaticPropsFeatureOptions,
  _staticPropsFeatureId,
  _staticPropsFeatureSubId
} from "../common/feat-static-props-types";

/**
 * Add support for static props to a subapp.
 *
 * This feature allows you to have an async function `getStaticProps` on your app
 * server to prepare the data as props for your subapp's React component.  Subapp
 * renderer will pass it into your subapp, and send the data to browser also.
 *
 * @remark TODO: handle hot module reload
 *
 * Example:
 *
 * **Subapp implementation module** `sample.tsx`:
 *
 * ```tsx
 * import { ReactSubApp, staticPropsFeature, AppContext, React } from "@xarc/react";
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
 *     staticPropsFeature({
 *       serverModule: require.resolve("./sample-static-props")
 *     })
 *   ]
 * }
 * ```
 *
 * **Server side static props provider module** `sample-static-props.ts`:
 *
 * ```ts
 * export const getStaticProps() = async () => {
 *   return {
 *     props: {
 *       "hello": world
 *     }
 *   }
 * }
 * ```
 *
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
        execute({ input, csrData }) {
          const props = csrData.getInitialState();
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
