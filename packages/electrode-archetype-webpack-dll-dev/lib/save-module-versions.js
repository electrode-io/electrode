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

  const saveVersionsOf = manifest => {
    const versions = {};
    const name = manifest.name;
    const modules = Object.keys(manifest.content).sort();
    modules.forEach(md => {
      const parts = md.split("/");
      const nmIx = parts.indexOf("node_modules");
      let nmName = "";
      if (nmIx >= 0) {
        nmName = parts[nmIx + 1];
        if (nmName.startsWith("@")) {
          nmName += parts[nmIx + 2];
        }
      }

      if (nmName && !versions[nmName]) {
        const pkg = require(`${nmName}/package.json`);
        versions[nmName] = pkg.version;
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
