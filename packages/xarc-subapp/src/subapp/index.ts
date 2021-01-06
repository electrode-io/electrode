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

const noop = () => {
  //
};

/**
 * **internal use only**
 *
 * @param opts - declare subapp options
 * @returns subapp definition
 */
export function __declareSubApp(opts: SubAppOptions): SubAppDef {
  const container = envHooks.getContainer();

  let def = container.get(opts.name);

  if (!def) {
    def = Object.assign(
      {
        _getModule() {
          // not doing async/await to avoid ts transpiling them to non-promise ES5
          // https://github.com/microsoft/TypeScript/issues/31621
          const mod = typeof opts.getModule === "function" ? opts.getModule() : opts.getModule;
          return mod.then(mod2 => {
            def._module = mod2;
            loadFeatures(def, mod2.subapp?.wantFeatures);
            return mod2;
          });
        },
        _module: undefined,
        _ssr: false,
        _features: {},
        _mount: noop,
        _unmount: noop
      },
      opts
    );

    (def as any)._createTime = Date.now();
  } else if (def._module) {
    def._module = false;
    container.readyCount--;
  }

  container.declare(opts.name, def);
  loadFeatures(def, opts.wantFeatures);

  return def;
}
