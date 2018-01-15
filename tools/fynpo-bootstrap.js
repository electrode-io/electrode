"use strict";

const Promise = require("bluebird");

const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const pkgPath = Path.resolve("packages");
const ItemQueue = require("item-queue");
const xsh = require("xsh");

const packages = Fs.readdirSync(pkgPath).reduce((acc, k) => {
  try {
    const path = Path.join(pkgPath, k);
    const pkgFile = Path.join(path, "package.json");
    const pkgStr = Fs.readFileSync(pkgFile);
    const pkgJson = JSON.parse(pkgStr);
    acc[pkgJson.name] = Object.assign(
      _.pick(pkgJson, [
        "name",
        "version",
        "dependencies",
        "devDependencies",
        "optionalDependencies",
        "peerDependencies"
      ]),
      {
        localDeps: [],
        dependents: [],
        indirectDeps: [],
        path,
        pkgFile,
        pkgStr,
        pkgJson,
        installed: false
      }
    );
  } catch (e) {}
  return acc;
}, {});

const circulars = [];

function listDeps() {
  const add = (name, deps) => {
    const depPkg = packages[name];

    _.each(deps, (semver, depName) => {
      if (!packages.hasOwnProperty(depName)) return;
      depPkg.localDeps.push(depName);
      packages[depName].dependents.push(name);
    });
  };

  _.each(packages, (pkg, name) => {
    add(name, pkg.dependencies);
    add(name, pkg.devDependencies);
    add(name, pkg.optionalDependencies);
  });
}

function listIndirectDeps() {
  let change = 0;

  const add = (info, deps) => {
    _.each(deps, dep => {
      const depPkg = packages[dep];
      if (info.localDeps.indexOf(dep) < 0 && info.indirectDeps.indexOf(dep) < 0) {
        change++;
        info.indirectDeps.push(dep);
        depPkg.dependents.push(info.name);
      }
      if (depPkg.localDeps.indexOf(info.name) >= 0) {
        const x = [info.name, depPkg.name].sort().join(",");
        if (circulars.indexOf(x) < 0) {
          circulars.push(x);
        }
        return;
      }
      add(info, depPkg.localDeps.concat(depPkg.indirectDeps));
    });
  };

  _.each(packages, (pkg, name) => {
    add(pkg, pkg.localDeps.concat(pkg.indirectDeps));
  });

  if (change > 0) {
    listIndirectDeps();
  }
}

listDeps();
listIndirectDeps();

const depMap = _.mapValues(packages, pkg => {
  return _.pick(pkg, ["name", "localDeps", "indirectDeps", "dependents"]);
});

const uniqCirculars = _.uniq(circulars).map(x => x.split(","));
const ignores = _.map(uniqCirculars, pair => {
  const depA = packages[pair[0]].dependents.length;
  const depB = packages[pair[1]].dependents.length;
  return depA > depB ? pair[1] : pair[0];
});

packages["electrode-webpack-reporter"].ignore = true;

function install(pkg, queue) {
  if (pkg.ignore) return true;
  if (pkg.installed === "pending") return false;
  if (pkg.installed) return true;
  let pending = 0;
  _.each(pkg.localDeps, depName => {
    if (!install(packages[depName], queue)) pending++;
  });

  if (pending === 0 && !pkg.installed) {
    queue.push(pkg);
    pkg.installed = "pending";
  }
  return false;
}

const VisualExec = require("./visual-exec");

function updatePkgToLocal(pkg) {
  if (pkg.ignore) return;
  const json = pkg.pkgJson;
  if (!json) return;
  ["dependencies", "devDependencies", "optionalDependencies"].forEach(sec => {
    const deps = json[sec];
    if (!deps) return;
    _.each(pkg.localDeps, depName => {
      if (!packages[depName].ignore && deps.hasOwnProperty(depName))
        deps[depName] = `../${depName}`;
    });
  });
  Fs.writeFileSync(pkg.pkgFile, `${JSON.stringify(json, null, 2)}\n`);
}

function restorePkgJson() {
  _.each(packages, pkg => {
    if (!pkg.ignore) Fs.writeFileSync(pkg.pkgFile, pkg.pkgStr);
  });
}

_.each(packages, updatePkgToLocal);

const itemQ = new ItemQueue({
  processItem: item => {
    const command = [`eval "$(fyn bash)"`, `fyn -q i install`];
    if (_.get(item, "pkgJson.scripts.prepublish")) command.push("npm run prepublish");
    if (_.get(item, "pkgJson.scripts.prepare")) command.push("npm run prepare");
    return new VisualExec({
      title: `bootstrap ${item.name}`,
      cwd: item.path,
      command: command.join(" && ")
    }).execute();
  },
  concurrency: 3,
  stopOnError: false,
  Promise: require("bluebird")
});

function getMoreInstall(item) {
  if (item) item.installed = true;

  const queue = [];

  _.each(packages, (pkg, name) => {
    install(pkg, queue);
  });

  queue.forEach(x => itemQ.addItem(x, true));
}

itemQ.on("doneItem", data => getMoreInstall(data.item));

let failed = 0;
itemQ.on("done", restorePkgJson);
itemQ.on("failItem", () => {
  failed = 1;
});
itemQ.on("fail", () => {
  failed = 1;
  restorePkgJson();
});

getMoreInstall();
itemQ.resume();

itemQ
  .wait()
  .then(() => {
    process.exit(failed);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
