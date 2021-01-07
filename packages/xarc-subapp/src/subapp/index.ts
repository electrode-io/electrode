import { SubAppDef, SubAppOptions, SubAppFeatureFactory } from "./types";
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

let id = 1;

/**
 * **internal use only**
 *
 * @param opts - declare subapp options
 * @returns subapp definition
 */
export function __declareSubApp(opts: SubAppOptions): SubAppDef {
  const def = Object.assign(
    {
      _id: id++,
      _getModule() {
        const container = envHooks.getContainer();
        const subapp = container.get(def.name);

        // not doing async/await to avoid ts transpiling them to non-promise ES5
        // https://github.com/microsoft/TypeScript/issues/31621
        const mod = typeof subapp.getModule === "function" ? subapp.getModule() : subapp.getModule;
        return mod.then(mod2 => {
          // get subapp def from container again in case subapp was re-declared by a reloaded module
          // while getModule was in flight.
          const subapp2 = container.get(def.name);

          if (!subapp2) {
            console.error("_getModule can't find the subapp in container for:", this.name); // eslint-disable-line no-console
          } else {
            subapp2._module = mod2;
            loadFeatures(def, mod2.subapp?.wantFeatures);
          }
          container.updateReady();

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

  envHooks.getContainer().declare(opts.name, def);
  loadFeatures(def, opts.wantFeatures);

  return def;
}
