import { SubAppOptions, SubAppFeatureFactory, SubAppDef } from "@xarc/subapp";

/**
 * construct a framework feature for the implementation of FrameworkLib passed in
 *
 * @remark
 *  Internal use
 *
 * @param __FrameWorkLib
 *
 * @returns framework feature
 */
export function __reactFrameworkFeature(factory: () => unknown): SubAppFeatureFactory {
  return {
    id: "framework",
    subId: "react",

    add: (subapp: SubAppDef) => {
      if (!subapp._frameworkFactory) {
        subapp._frameworkFactory = factory;
      }
      return subapp;
    }
  };
}

/**
 * add a feature to subapp options - internal use
 *
 * @remark
 *  Internal use
 *
 * @param options
 * @param id
 * @param featureProvider
 */
export function __addFeature(
  options: SubAppOptions,
  id: string,
  featureProvider: () => SubAppFeatureFactory
) {
  return options.wantFeatures && options.wantFeatures.find(x => x.id === id)
    ? options
    : {
        ...options,
        wantFeatures: [].concat(options.wantFeatures || [], featureProvider())
      };
}
