const Path = require("path");
const myRequire = require("../../../require");

module.exports = class ModuleResolver {
  constructor() {
  }

  apply(resolver) {
    resolver.plugin("module", (request, callback) => {
      const obj = Object.assign({}, request, {
        path: Path.dirname(myRequire.resolve(request.request)),
        request: `./${request.request}`
      });
      resolver.doResolve("resolve", obj, `looking for modules in ${obj.path}`, callback, true);
    });
  }
};
