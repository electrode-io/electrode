/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable max-statements, complexity */

import { SubAppDef, SubAppFeatureFactory, SubAppFeature } from "@xarc/subapp";
import { atom, RecoilState, RecoilRoot } from "recoil";

export * as Recoil from "recoil";

/**
 * options for recoil feature
 */
export type RecoilFeatureOptions = {
  /**
   * The React module.
   *
   * This is needed for the recoil feature to wrap subapp's component inside
   * the recoil Provider component.
   */
  React: Partial<{ createElement: unknown }>;

  /**
   * prepare recoil initial state
   *
   * @param initialState - when SSR sent initialState used, it will be passed.  The client
   *    `prepare` can just return `{initialState}` as is.
   *
   * @returns Promise<{initialState: any}>
   */
  prepare(initialState: any): Promise<any>;
};

/**
 * recoil support for a subapp
 */
export type RecoilFeature = SubAppFeature & {
  options: RecoilFeatureOptions;
  wrap: (_: any) => any;
  prepare: any;
  _store: any;
};

/**
 * Add support for recoil to a subapp
 *
 * @param options - recoil feature options
 * @returns unknown
 */
export function recoilFeature(options: RecoilFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line
  const id = "state-provider";
  const subId = "react-recoil";
  const add = (subapp: SubAppDef) => {
    const recoil: Partial<RecoilFeature> = { id, subId };
    subapp._features.recoil = recoil as SubAppFeature;
    // wrap: callback to wrap component with recoil
    recoil.options = options;
    recoil.wrap = ({ Component, store }) => {
      return (
        <RecoilRoot>
          <Component store={store} />
        </RecoilRoot>
      );
    };

    recoil.prepare = options.prepare;
    recoil._store = new Map();
    recoil.execute = async function ({ input, csrData }) {
      let initialState: any;

      const props = csrData && (await csrData.getInitialState());
      initialState = (await options.prepare(props)).initialState;

      if (initialState) {
        for (const value of Object.values(initialState.state)) {
          if (value && value["key"] && !recoil._store.get(value["key"])) {
            const state = atom({ key: value["key"], default: value["value"] }) as RecoilState<any>;
            recoil._store.set(value["key"], state);
          }
        }
      }

      return {
        Component: () =>
          this.wrap({
            Component: input.Component || subapp._getExport()?.Component,
            store: recoil._store
          }),
        props: initialState
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
