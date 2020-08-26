"use strict";

/**
 *
 * NOTE: this file is actually maintained centrally in a directory in our repo.
 *
 * There are many duplicate copies of it in each opt- package, but not as a
 * npm module, because the opt- package needs this upfront for the npm script
 * prepare.  They each copy it from the central one.
 */

const Path = require("path");
const Fs = require("fs");
const assert = require("assert");

const isSameMajorVersion = (verA, verB) => {
  // check for simple semver like x.x.x, ~x.x.x, or ^x.x.x only
  let majorA = verA.match(/[\~\^]{0,1}(\d+)\.(\d+)\.(\d+)/);
  if (majorA) {
    majorA = majorA.slice(1, 4);
    const majorB = verB.split(".");
    if (majorB[0] !== majorA[0] || (majorB[0] === "0" && majorB[1] !== majorA[1])) {
      return false;
    }
  }

  return true;
};

function lookupAppDirByInitCwd() {
  //
  // env INIT_CWD is set by npm to the dir where it started running.
  // Note that it's not strictly where package.json is, because npm
  // would search up the directories for the first package.json found,
  // which is why the we need to do the same search up lookup below.
  //
  let lookupDir = process.env.INIT_CWD;

  if (!lookupDir) return undefined;

  let count = 0;

  while (count < 100) {
    const pkgFile = Path.join(lookupDir, "package.json");

    try {
      require(pkgFile);
      return lookupDir;
    } catch (err) {
      //
    }

    const upDir = Path.join(lookupDir, "..");
    if (upDir === lookupDir) return undefined;
    lookupDir = upDir;
    count++;
  }

  return undefined;
}

const cwd = process.env.PWD || process.cwd();

//
// Trying to find the app's dir by checking for the first
// node_modules in the path string
// For example, /home/userid/myapp/node_modules/electrode-archetype-opt-react
// would yield app dir as /home/userid/myapp
//
function findAppDir() {
  if (cwd.indexOf("node_modules") > 0) {
    const splits = cwd.split("node_modules");
    return Path.dirname(Path.join(splits[0], "x")); // remove trailing slash
  }
  return cwd;
}

function checkAppPackage(appDir) {
  try {
    return JSON.parse(Fs.readFileSync(Path.join(appDir, "./package.json")).toString());
  } catch (e) {
    return {};
  }
}

function xarcOptCheck() {
  //
  // Find the app's dir by using npm's INIT_CWD and then fallback to
  // looking for node_modules in the path
  //
  const appDir = lookupAppDirByInitCwd() || findAppDir();
  const appPkg = checkAppPackage(appDir);
  const myPkg = JSON.parse(Fs.readFileSync(Path.join(__dirname, "./package.json")).toString());
  const myName = myPkg.name;
  const optParams = Object.assign({}, myPkg.xarcOptCheck);

  const done = (pass, message) => {
    return Object.assign({ pass, message }, optParams);
  };

  //
  // just the package itself
  //
  if (cwd === appDir && myName === appPkg.name) {
    return done(true, "self");
  }

  assert(
    optParams.hasOwnProperty("optionalTagName"),
    `opt archetype ${myName}: package.json missing xarcOptCheck.optionalTagName`
  );

  const optionalTagName = optParams.optionalTagName;

  let foundOOO = [];

  //
  // If a workspace detected, then we don't know how dependencies are setup, so
  // skip checking.
  //
  if (!appPkg.workspaces && optParams.onlyOneOf) {
    // first, user's package.json cannot have multiple packages from onlyOneOf list
    ["dependencies", "devDependencies", "optionalDependencies"].forEach(x => {
      if (appPkg[x]) {
        foundOOO = foundOOO.concat(optParams.onlyOneOf.filter(n => appPkg[x].hasOwnProperty(n)));
      }
    });

    if (foundOOO.length > 1) {
      return done(
        false,
        `
  ERROR
  ERROR: you can have *only* ONE of these packages in your package.json dependencies/devDependencies/optionalDependencies.
  ERROR: ${foundOOO.join(", ")}
  ERROR
  `
      );
    }

    // If found a mutually excluding package but it's not this one, then skip installing this.
    if (foundOOO.length > 0 && foundOOO.indexOf(myName) < 0) {
      return done(
        false,
        `Found ${foundOOO[0]} in your package.json and \
it excludes this package ${myName} - skip installing`
      );
    }
  }

  return done(true);
}

module.exports = xarcOptCheck;

if (require.main === module) {
  const r = xarcOptCheck();

  if (r.pass) {
    if (r.message) {
      console.log(r.message);
    }
  } else {
    console.error(r.message);
  }

  process.exit(r.pass ? 0 : 1);
}

module.exports.isSameMajorVersion = isSameMajorVersion;
