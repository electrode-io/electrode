"use strict";

/**
 * Take webpack Stat JSON output and group modules by npm packages,
 * noting duplicates if there are any.
 */

const Path = require("path");

const tildaSep = Path.join(Path.sep, "~", Path.sep);
const nmSep = Path.join(Path.sep, "node_modules", Path.sep);

// match @namespace/packageName/file
const atModRegex = new RegExp(`([^\\${Path.sep}]+\\${Path.sep}[^\\${Path.sep}]+)\\${Path.sep}(.+)`);
// match packageName/file
const modRegex = new RegExp(`([^\\${Path.sep}]+)\\${Path.sep}(.+)`);

class ModuleProcessor {
  constructor(statJson) {
    this.statJson = statJson;
    this.makeModulesByName();
  }

  makeModulesByName() {
    const mbn = this.modulesByName = {};
    const obj = this.statJson;

    const filterLoaders = (name) => name.replace(/.*!/, "");

    if (obj.modules) {
      obj.modules.forEach((module) => {
        mbn[filterLoaders(module.name)] = module;
      });
    } else if (obj.chunks) {
      obj.chunks.forEach((chunk) => {
        if (chunk.modules) {
          chunk.modules.forEach((module) => {
            mbn[filterLoaders(module.name)] = module;
          });
        }
      });
    }

    return mbn;
  }

  _splitPathName(name) {
    // name could be ./~/name1/~/name2/lib/index.js or ./client/app.jsx
          // ERROR <-- first name was 'multi main'
    const pkgs = name.indexOf(tildaSep) < 0 ? // not a NPM module
      [name] : name.split(tildaSep).splice(1);
    const n = pkgs.pop();
    const match = n.match(n.startsWith("@") ? atModRegex : modRegex);
          //ERROR <-- match === null when 'multi name'
    return {
      name: match[1], // ERROR <-- null throws error
      parents: pkgs,
      file: match[2]
    };
  }

  /**
   *
   * {
   *  packageName: {
   *    $: {
    *    modules: {
    *     filename: {
    *       chunks: [],
    *       size: 123
    *     }
    *    },
    *    parents: {
    *    }
   *    }
   *  }
   * }
   * @returns {{}|*}
   */
  makeModulesByPackage() {
    const byPkg = this.modulesByPackage = {};
    this.totalSize = 0;
//strange work around to shift off 'multi main' from the array
    const minusMultiMain = Object.keys(this.modulesByName)
    minusMultiMain.shift();
    minusMultiMain.forEach((name) => {
      const split = this._splitPathName(name);
      const pkg = byPkg[split.name] || (byPkg[split.name] = {size: 0});
      const getVersion = (parents) => {
        try {
          if (split.name !== ".") {
            return require(Path.resolve(parents.join(nmSep), split.name, "package.json")).version; // eslint-disable-line
          } else {
            return "-";
          }
        } catch (e) {
          return "?";
        }
      };
      const getByParents = (parents) => {
        const parentId = `\$${parents.join(":")}`;
        if (pkg[parentId]) {
          return pkg[parentId];
        } else {
          return (pkg[parentId] = {
            parents,
            name: split.name,
            size: 0,
            version: getVersion(parents),
            modules: {}
          });
        }
      };
      const byParents = getByParents(split.parents);
      const module = this.modulesByName[name];
      pkg.size += module.size;
      byParents.size += module.size;
      this.totalSize += module.size;
      byParents.modules[split.file] = module;
    });

    return this.modulesByPackage;
  }
}


module.exports = ModuleProcessor;
