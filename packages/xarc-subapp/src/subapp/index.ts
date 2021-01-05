import { SubAppDef, SubAppMountInfo, SubAppOptions, SubAppFeatureFactory } from "./types";
import { envHooks } from "./envhooks";

export * from "./types";
export * from "./envhooks";
export * from "./subapp-ready";

function loadFeatures(subapp: SubAppDef, features: SubAppFeatureFactory[]) {
  if (features) {
    for (const feat of features) {
      feat.add(subapp);
    }
  }
}

const noop = (_: SubAppMountInfo) => {
  //
};

/**
 * **internal use only**
 *
 * @param opts - declare subapp options
 * @returns subapp definition
 */
export function __declareSubApp(opts: SubAppOptions): SubAppDef {
  const def: SubAppDef = Object.assign(
    {
      _getModule() {
        // not doing async/await to avoid ts transpiling them to non-promise ES5
        // https://github.com/microsoft/TypeScript/issues/31621
        const mod = typeof opts.getModule === "function" ? opts.getModule() : opts.getModule;
        return mod.then(mod2 => {
          this._module = mod2;
          loadFeatures(this, mod2.subapp?.wantFeatures);
          return mod;
        });
      },
      _module: null,
      _ssr: false,
      _features: {},
      _mount: noop,
      _unmount: noop
    },
    opts
  );

  const container = envHooks.getContainer();
  container.declare(opts.name, def);

  loadFeatures(def, opts.wantFeatures);

  return def;
}
