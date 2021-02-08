/* eslint-disable @typescript-eslint/no-var-requires */
const dllUtil = require("@xarc/webpack/lib/util/dll-util");

export = () => {
  const tag = process.env.NODE_ENV === "production" ? "" : ".dev";

  const dllPaths = [];

  try {
    const dll = dllUtil.loadAssets();
    const dllAssets = dll.assets;
    Object.keys(dllAssets).forEach(m => {
      const dllMod = dllAssets[m];
      Object.keys(dllMod).forEach(modName => {
        if (modName === "cdnMapping") return;
        const assets = dllMod[modName].assets;
        assets.forEach(a => {
          if (a.endsWith(`${tag}.js`)) {
            dllPaths.push(`${m}/dist/${a}`);
          }
        });
      });
    });
  } catch (e) {
    //
  }

  return dllPaths;
};
