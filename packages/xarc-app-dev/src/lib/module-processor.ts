/* eslint-disable @typescript-eslint/no-var-requires */
export {};

/**
 * Take webpack Stat JSON output and group modules by npm packages,
 * noting duplicates if there are any.
 */

const Path = require("path");

const tildaSep = "/~/";
const nmSep = "/node_modules/";
const NUMBER_TWO = 2;

// match @namespace/packageName/file
const atModRegex = new RegExp(`([^/]+/[^/]+)/(.+)`);
// match packageName/file
const modRegex = new RegExp(`([^/]+)/(.+)`);

class ModuleProcessor {
  statJson: any;
  modulesByPackage: any;
  totalSize: any;
  modulesByName: any;

  constructor(statJson) {
    this.statJson = statJson;
    this.makeModulesByName();
  }

  makeModulesByName() {
    const mbn = (this.modulesByName = {});
    const obj = this.statJson;

    const filterLoaders = name => name.replace(/.*!/, "");

    if (obj.modules) {
      obj.modules.forEach(module => {
        mbn[filterLoaders(module.name)] = module;
      });
    } else if (obj.chunks) {
      obj.chunks.forEach(chunk => {
        if (chunk.modules) {
          chunk.modules.forEach(module => {
            mbn[filterLoaders(module.name)] = module;
          });
        }
      });
    }

    return mbn;
  }

  _splitPathName(name) {
    const pkgs = name.indexOf(tildaSep) < 0 ? [name] : name.split(tildaSep).splice(1);
    const n = pkgs.pop();
    const match = n.match(n.startsWith("@") ? atModRegex : modRegex);

    if (match) {
      return {
        name: match[1],
        parents: pkgs,
        file: match[NUMBER_TWO]
      };
    } else {
      return {
        name,
        parents: pkgs,
        file: ""
      };
    }
  }
  /*
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
    const byPkg = (this.modulesByPackage = {});
    this.totalSize = 0;
    Object.keys(this.modulesByName).forEach(name => {
      // Ignore "ignored" modules i.e. node shims etc.
      if (name.indexOf("(ignored)") > -1) {
        return;
      }

      const split = this._splitPathName(name);
      const pkg = byPkg[split.name] || (byPkg[split.name] = { size: 0 });
      const getVersion = parents => {
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
      const getByParents = parents => {
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
