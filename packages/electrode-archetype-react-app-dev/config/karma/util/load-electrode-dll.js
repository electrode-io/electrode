"use strict";

const Fs = require("fs");
const Path = require("path");

module.exports = () => {
  const tag = process.env.NODE_ENV === "production" ? "" : ".dev";

  const dllAssetsFile = Path.resolve(`dist/electrode-dll-assets${tag}.json`);

  const dllPaths = [];

  try {
    const dllAssets = JSON.parse(Fs.readFileSync(dllAssetsFile));
    Object.keys(dllAssets).forEach(m => {
      const dllMod = dllAssets[m];
      Object.keys(dllMod).forEach(dll => {
        if (dll === "cdnMapping") return;
        const assets = dllMod[dll].assets;
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
