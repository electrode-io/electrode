"use strict";

const Path = require("path");
const assert = require("assert");

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
    return require(Path.join(appDir, "package.json"));
  } catch (e) {
    return {};
  }
}

function optionalArchetypeCheck() {
  //
  // Find the app's dir by using npm's INIT_CWD and then fallback to
  // looking for node_modules in the path
  //
  const appDir = lookupAppDirByInitCwd() || findAppDir();
  const appPkg = checkAppPackage(appDir);
  const myPkg = require("./package.json");
  const myName = myPkg.name;
  const optParams = Object.assign({}, myPkg.electrodeOptArchetype);

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
    `opt archetype ${myName}: package.json missing electrodeOptArchetype.optionalTagName`
  );
  assert(
    optParams.hasOwnProperty("expectTag"),
    `opt archetype ${myName}: package.json missing electrodeOptArchetype.expectTag`
  );

  const optionalTagName = optParams.optionalTagName;
  const expectTag = optParams.expectTag;
  const defaultInstall = Boolean(optParams.defaultInstall);

  try {
    const config = require(Path.join(appDir, "archetype/config"));

    const options = (config && config.options) || {};

    //
    // check if app's package.json has the package in its dependencies or optionalDependencies
    //
    const appDep = ["dependencies", "devDependencies", "optionalDependencies"].find(
      x => appPkg[x] && appPkg[x].hasOwnProperty(myName)
    );

    if (appDep) {
      if (options.hasOwnProperty(optionalTagName)) {
        return done(
          false,
          `
  ERROR
  ERROR: you have ${myName} in your package.json *and* ${optionalTagName} in your archetype/config options.
  ERROR: Please specify only one of those.
  ERROR
  `
        );
      }

      if (optParams.checkAppDep !== false) {
        return done(true, `Found ${myName} in your package.json ${appDep} - installing.`);
      }
    }

    //
    // check if app's archetype/config/index.js options specify the feature tag for
    // the package to be installed.
    //
    if (!options.hasOwnProperty(optionalTagName) && defaultInstall === true) {
      return done(true, `No optional flag specified for package ${myName} - default to installing`);
    }

    const userConfig = options[optionalTagName];

    if (userConfig === expectTag) {
      return done(
        true,
        `${myName}: archetype config set ${optionalTagName} to ${userConfig} - installing`
      );
    } else {
      return done(
        false,
        `${myName}: archetype config set ${optionalTagName} to ${userConfig} - skipping install because it's not ${expectTag}`
      );
    }
  } catch (e) {
    if (defaultInstall === true) {
      return done(
        true,
        `${myName}: exception checking for optional flag ${e.message} - default to install`
      );
    }
    return done(false, `${myName}: no archetype config found - skipping install`);
  }
}

if (require.main === module) {
  const r = optionalArchetypeCheck();

  console.log(r.message);
  process.exit(r.pass ? 0 : 1);
} else {
  module.exports = optionalArchetypeCheck;
}
