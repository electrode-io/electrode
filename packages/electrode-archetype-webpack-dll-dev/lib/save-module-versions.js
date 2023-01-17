"use strict";

//
// Look at all the module that was packed into the DLL and save their exact versions
//

const Path = require("path");
const Fs = require("fs");
const context = require("../config/webpack/util/context");

function saveModuleVersions() {
  const { entry } = require(Path.resolve("."));
  const entries = Object.keys(entry);
  const tag = context.tag;

  const searchPkgTop = p => {
    do {
      const up = Path.dirname(p);
      if (up === p) return {};
      p = up;
      try {
        return { path: p, pkg: require(Path.resolve(p, "package.json")) };
      } catch (e) {
        // continue searching
      }
    } while (true);
    return {};
  };

  const saveVersionsOf = manifest => {
    const versions = {};
    const name = manifest.name;
    const modules = Object.keys(manifest.content).sort();
    modules.forEach(md => {
      const nm = "node_modules";
      const nmIx = md.indexOf(`${nm}/`);
      const top = nmIx >= 0 ? searchPkgTop(md) : {};
      const pkg = top.pkg;

      if (!pkg || !pkg.name) return;

      const parts = top.path.split("/");
      const dirName = parts.slice(parts.indexOf("node_modules") + 1).join("/");

      if (!versions[dirName]) {
        versions[dirName] = { name: pkg.name, version: pkg.version };
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
