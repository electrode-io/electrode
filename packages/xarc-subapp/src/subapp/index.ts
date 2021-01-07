import { SubAppDef, SubAppOptions, SubAppFeatureFactory, SubApp } from "./types";
import { envHooks } from "./envhooks";
export * from "./types";
export * from "./envhooks";
export * from "./subapp-ready";
export * from "./client-render-pipeline";
export * from "./subapp-render-pipeline";
export * from "./client-framework-lib";

function loadFeatures(subapp: SubAppDef, features: SubAppFeatureFactory[]) {
  if (features) {
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
 * @remark not doing async/await to avoid ts transpiling them to non-promise ES5
 *  https://github.com/microsoft/TypeScript/issues/31621
 *
 * @returns Promise resolving to module loaded
 */
function _getModule(): Promise<any> {
  /* eslint-disable no-invalid-this */
  const container = envHooks.getContainer();
  const subapp = container.get(this.name);

  const getMod = typeof subapp.getModule === "function" ? subapp.getModule() : subapp.getModule;

  if (getMod.then) {
    return getMod.then(mod => {
      // get subapp def from container again in case subapp was re-declared by a reloaded module
      // while getModule was in flight.
      const subappB = container.get(this.name);

      if (!subappB) {
        console.error("_getModule can't find the subapp in container for:", this.name); // eslint-disable-line no-console
      } else {
        subappB._module = mod;
        loadFeatures(this, subapp._getExport<unknown>()?.wantFeatures);
      }
      container.updateReady();

      return mod;
    });
  } else {
    //
    // allow specifying subapp statically (not using dynamic import)
    // TODO: update types
    //
    const mod = getMod as any;
    subapp._module = mod;
    loadFeatures(this, subapp._getExport<unknown>()?.wantFeatures);
    return Promise.resolve(mod);
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
