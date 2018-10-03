"use strict";

//
// Look at all the module that was packed into the DLL and save their exact versions
//

const Path = require("path");
const Fs = require("fs");
const { entry } = require(Path.resolve("."));
const context = require("../config/webpack/util/context");

function saveModuleVersions() {
  const entries = Object.keys(entry);
  const tag = context.tag;

  const searchPkg = p => {
    do {
      const up = Path.dirname(p);
      if (up === p) return {};
      try {
        return require(Path.resolve(up, "package.json"));
      } catch (e) {
        //
      }
      p = up;
    } while (true);
    return {};
  };

  const saveVersionsOf = manifest => {
    const versions = {};
    const name = manifest.name;
    const modules = Object.keys(manifest.content).sort();
    modules.forEach(md => {
      const nmIx = md.indexOf("node_modules/");
      const pkg = nmIx >= 0 ? searchPkg(md) : {};

      if (pkg.name && !versions[pkg.name]) {
        versions[pkg.name] = pkg.version;
      }
    });

    Fs.writeFileSync(Path.resolve(`dist/${name}-versions${tag}.json`), JSON.stringify(versions));
  };

  const manifests = entries.map(e => {
    return JSON.parse(Fs.readFileSync(Path.resolve("dist", `dll_${e}-manifest${tag}.json`)));
  });

  manifests.forEach(saveVersionsOf);
}

module.exports = { saveModuleVersions };
