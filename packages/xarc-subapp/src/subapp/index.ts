/* eslint-disable max-statements */

import { SubAppDef, SubAppOptions, SubAppFeatureFactory, SubApp } from "./types";
import { envHooks } from "./envhooks";
export * from "./types";
export * from "./envhooks";
export * from "./subapp-ready";
export * from "./client-render-pipeline";
export * from "./subapp-render-pipeline";
export * from "./client-framework-lib";

/**
 * Load features
 *
 * @param subapp : Subapp definition
 * @param features : Subapp features
 */
function loadFeatures(subapp: SubAppDef, features: SubAppFeatureFactory[]) {
  if (features && features.length > 0) {
    for (const feat of features) {
      feat.add(subapp);
    }
  }
}

const noop = () => {
  //
};

let id = 1;

/**
 * Load the dynamic import module for a subapp
 *
 * Note: not doing async/await to avoid ts transpiling them to non-promise ES5
 *  https://github.com/microsoft/TypeScript/issues/31621
 *
 * @returns Promise resolving to module loaded
 */
async function _getModule(): Promise<any> {
  /* eslint-disable no-invalid-this */
  const container = envHooks.getContainer();
  const subapp = container.get(this.name);

  const getMod = typeof subapp.getModule === "function" ? subapp.getModule() : subapp.getModule;

  if (getMod.then) {
    try {
      const mod = await getMod;
      // get subapp def from container again in case subapp was re-declared by a reloaded module
      // while getModule was in flight.
      const subappB = container.get(this.name);

      if (!subappB) {
        console.error("_getModule can't find the subapp in container for:", this.name); // eslint-disable-line no-console
      } else {
        subappB._module = mod;
        loadFeatures(this, subappB._getExport<unknown>()?.wantFeatures);
      }
      container.updateReady();

      return mod;
    } catch (err) {
      const mod = {
        loadError: err,
        captureErr: new Error(`load subapp ${this.name} module failed`),
        warned: false
      };
      const subappB = container.get(this.name);
      subappB._module = mod;
      return mod;
    }
  } else {
    //
    // allow specifying subapp statically (not using dynamic import)
    // TODO: update types
    //
    const mod = getMod as any;
    const subappB = container.get(this.name);
    subappB._module = mod;
    loadFeatures(this, subappB._getExport<unknown>()?.wantFeatures);
    container.updateReady();
    return mod;
  }
}

/**
 * Get a subapp's export from its module by looking for export resolveName
 *
 * @returns the subapp export or undefined
 */
function _getExport<T>(): SubApp<T> {
  if (!this._module || this.resolveName === false) {
    return {};
  }

  if (this.resolveName) {
    return this._module[this.resolveName];
  }

  return this._module.subapp || this._module.default || {};
}

/**
 * **internal use only**
 *
 * @param opts - declare subapp options
 * @param override - define overrides
 * @returns subapp definition
 */
export function __declareSubApp(opts: SubAppOptions, override?: Partial<SubAppDef>): SubAppDef {
  const def = Object.assign(
    {
      _id: id++,
      _getModule,
      _module: undefined,
      _ssr: false,
      _features: {},
      _mount: noop,
      _unmount: noop,
      _renderPipelines: [],
      _getExport
    },
    override,
    opts
  );

  envHooks.getContainer().declare(opts.name, def);
  loadFeatures(def, opts.wantFeatures);

  return def;
}
