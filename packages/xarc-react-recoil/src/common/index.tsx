/* eslint-disable no-console */
import { SubAppDef, SubAppFeatureFactory, SubAppFeature, envHooks } from "@xarc/subapp";

import { RecoilRoot } from "recoil";

export * from "recoil";

/**
 * options for recoil feature
 */
export type RecoilFeatureOptions = {
  /**
   * The React module.
   *
   * This is needed for the recoil feature to wrap subapp's component inside
   * the Recoil Provider component.
   */
  React: Partial<{ createElement: unknown }>;

  prepare(initialState: any): Promise<any>;
};

/**
 * recoil support for a subapp
 */
export type RecoilFeature = SubAppFeature & {
  options: RecoilFeatureOptions;
  wrap: (_: any) => any;
  RecoilRoot: typeof RecoilRoot;
  prepare: any;
  atomsMap: any;
};

/**
 * Add support for Recoil to a subapp
 *
 * @param options - recoil feature options
 * @returns unknown
 */

/**
 * @param options - recoil feature options
 * @returns unknown
 */
export function recoilFeature(options: RecoilFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line
  const id = "state-provider";
  const subId = "react-recoil";
  const add = (def: SubAppDef) => {
    const subAppName = def.name;
    const subapp = envHooks.getContainer().get(subAppName);
    const recoil: Partial<RecoilFeature> = { id, subId };
    subapp._features.recoil = recoil as SubAppFeature;
    recoil.options = options;
    recoil.RecoilRoot = RecoilRoot;
    recoil.wrap = ({ Component, store }) => {
      return (
        <RecoilRoot>
          <Component store={store} />
        </RecoilRoot>
      );
    };
    recoil.execute = async function ({ input, csrData }) {
      const props = csrData && (await csrData.getInitialState());
      const initialState = await options.prepare(props);

      if (recoil.atomsMap === undefined) {
        const atomsMap = {};
        if (initialState && initialState.atoms) {
          initialState.atoms.forEach((state: any) => {
            atomsMap[state.key] = state;
          });
          recoil.atomsMap = atomsMap;
        }
      }

      return {
        Component: () =>
          this.wrap({
            Component: input.Component ?? subapp._getExport()?.Component,
            store: recoil.atomsMap
          }),
        props: initialState
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
