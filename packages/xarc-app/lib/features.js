"use strict";

const cwd = process.env.PWD || process.cwd();
const optionalRequire = require("optional-require")(require);
const archetype = require("../config/archetype")();
let appPkg = require(`${cwd}/package.json`);
const fs = require("fs");
const util = require("util");
const os = require("os");
const Path = require("path");

const devRequire = archetype.devRequire;
const chalk = devRequire("chalk");
const childProcess = require("child_process");
const execPromise = util.promisify(childProcess.exec);
const execSync = require("child_process").execSync;
const prompts = devRequire("prompts");
const request = devRequire("request");

const archetypeOptions = archetype.options || {};

const UTF8_REGEX = /UTF-?8$/i;

const optionalDependenciesList = [
  "electrode-archetype-opt-critical-css",
  "electrode-archetype-opt-eslint",
  "electrode-archetype-opt-flow",
  "electrode-archetype-opt-inferno",
  "electrode-archetype-opt-jest",
  "electrode-archetype-opt-karma",
  "electrode-archetype-opt-less",
  "electrode-archetype-opt-mocha",
  "electrode-archetype-opt-phantomjs",
  "electrode-archetype-opt-postcss",
  "electrode-archetype-opt-preact",
  "electrode-archetype-opt-pwa",
  "electrode-archetype-opt-react",
  "electrode-archetype-opt-react-intl",
  "electrode-archetype-opt-sass",
  "electrode-archetype-opt-sinon",
  "electrode-archetype-opt-stylus",
  "electrode-archetype-opt-typescript"
];

const write = function() {
  console.log.apply(undefined, arguments); // eslint-disable-line no-console
};

const writeError = function() {
  console.error.apply(undefined, arguments); // eslint-disable-line no-console
};

const Hour = 1000 * 60 * 60; // eslint-disable-line no-magic-numbers

const isSameMajorVersion = (verA, verB) => {
  // check for simple semver like x.x.x, ~x.x.x, or ^x.x.x only
  let majorA = verA.match(/[\~\^]{0,1}(\d+)\.(\d+)\.(\d+)/);
  if (majorA) {
    majorA = majorA.slice(1, 4); // eslint-disable-line no-magic-numbers
    const majorB = verB.split(".");
    if (majorB[0] !== majorA[0] || (majorB[0] === "0" && majorB[1] !== majorA[1])) {
      return false;
    }
  }

  return true;
};

function userCancel() {
  write("User cancelled");
  process.exit(1); // eslint-disable-line no-process-exit
}

// Adapted from here: https://www.npmjs.com/package/has-unicode
function isUnicodeSupported() {
  if (os.type() === "Windows_NT") {
    return false;
  }

  return UTF8_REGEX.test(process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG);
}

function areCurrentEnablementsLegacy(features) {
  const packageNames = features.map(feature => feature.packageName);
  const deps = appPkg.dependencies || {};
  const devDeps = appPkg.devDependencies || {};
  return !packageNames.find(name => deps.hasOwnProperty(name) || devDeps.hasOwnProperty(name));
}

class Feature {
  constructor(packageName) {
    this.packageName = packageName;
    this.attachNpmAttributes = this.attachNpmAttributes.bind(this);
    this.setEnabled = this.setEnabled.bind(this);
    this.removeLegacyEnabled = this.removeLegacyEnabled.bind(this);
    this.convert = this.convert.bind(this);
    this.getConflictingFeatures = this.getConflictingFeatures.bind(this);
  }

  async attachNpmAttributes() {
    const { description, electrodeOptArchetype, version } = await this.getNpmAttributes();
    this.npmDescription = description;
    this.npmElectrodeOptArchetype = electrodeOptArchetype;
    this.npmVersion = version;
  }

  async getNpmAttributes() {
    const pathName = Path.resolve(archetype.eTmpDir, `${this.packageName}.registry.json`);
    let mtime = 0;
    try {
      mtime = fs.statSync(pathName).mtime;
    } catch (e) {} // eslint-disable-line no-empty
    const currentDate = new Date();
    let body;
    if (currentDate.getTime() - mtime < Hour) {
      body = JSON.parse(fs.readFileSync(pathName));
    } else {
      const { stdout } = await execPromise("npm get registry");
      const url = `${stdout.trim()}/${this.packageName}`;
      const promise = new Promise((resolve, reject) => {
        request(
          url,
          { json: true },
          (err, res, reqBody) => {
            if (err) {
              return reject(err);
            }
            return resolve(reqBody);
          },
          reject
        );
      });
      body = await promise;
      fs.writeFileSync(pathName, JSON.stringify(body));
    }
    return body.versions[body["dist-tags"].latest];
  }

  get name() {
    const options = this.electrodeOptArchetype;
    return options.expectTag === true ? options.optionalTagName : options.expectTag;
  }

  get description() {
    return this.package ? this.package.description : this.npmDescription;
  }

  get electrodeOptArchetype() {
    return this.package ? this.package.electrodeOptArchetype : this.npmElectrodeOptArchetype;
  }

  get package() {
    if (!this._package && this._package !== false) {
      this._package = optionalRequire(`${this.packageName}/package.json`) || false;
    }
    return this._package;
  }

  get installedVersion() {
    return this.package ? this.package.version : "";
  }

  get enabled() {
    if (this.hasOwnProperty("_enabled")) {
      return this._enabled;
    }
    return Boolean(
      ["dependencies", "devDependencies"].find(
        x => appPkg && appPkg[x] && appPkg[x].hasOwnProperty(this.packageName)
      )
    );
  }

  set enabled(value) {
    this._enabled = value;
  }
  // eslint-disable-next-line complexity, max-statements
  get enabledLegacy() {
    if (!this.electrodeOptArchetype.hasOwnProperty("optionalTagName")) {
      throw new Error(`feature ${this.packageName}: package.json missing optionalTagName`);
    }
    if (!this.electrodeOptArchetype.hasOwnProperty("expectTag")) {
      throw new Error(`feature ${this.packageName}: package.json missing expectTag`);
    }

    const optionalTagName = this.electrodeOptArchetype.optionalTagName;
    const expectTag = this.electrodeOptArchetype.expectTag;
    const defaultInstall = Boolean(this.electrodeOptArchetype.defaultInstall);

    let foundOOO = [];

    if (this.electrodeOptArchetype.onlyOneOf) {
      // first, user's package.json cannot have multiple packages from onlyOneOf list
      ["dependencies", "devDependencies", "optionalDependencies"].forEach(x => {
        if (appPkg[x]) {
          foundOOO = foundOOO.concat(
            this.electrodeOptArchetype.onlyOneOf.filter(n => appPkg[x].hasOwnProperty(n))
          );
        }
      });

      if (foundOOO.length > 1) {
        // onlyOneOf conflict
        return false;
      }

      // If found a mutually excluding package but it's not this one, then skip installing this.
      if (foundOOO.length > 0 && foundOOO.indexOf(this.packageName) < 0) {
        // onlyOneOf conflict
        return false;
      }
    }

    //
    // check if app's package.json has the package in its dependencies or optionalDependencies
    //
    const appDep = ["dependencies", "devDependencies", "optionalDependencies"].find(
      x => appPkg[x] && appPkg[x].hasOwnProperty(this.packageName)
    );

    if (appDep) {
      if (archetypeOptions.hasOwnProperty(optionalTagName)) {
        // onlyOneOf conflict
        return false;
      }

      if (this.electrodeOptArchetype.checkAppDep !== false) {
        // Try to do a simple major version check.  If they don't match then assume user
        // is trying install a different one, so fail this copy.
        const appSemV = appPkg[appDep][this.packageName];
        if (!isSameMajorVersion(appSemV, this.installedVersion)) {
          // Found a different version from this copy's major version skipping installing this copy.
          return false;
        }
        // Found in the package.json - installing
        return true;
      }
    }

    // check if app's archetype/config/index.js options specify the feature tag
    //  for the package to be installed.
    if (!archetypeOptions.hasOwnProperty(optionalTagName) && defaultInstall === true) {
      // No optional flag specified for package - default to installing
      return true;
    }

    const userConfig = archetypeOptions[optionalTagName];

    return userConfig === expectTag;
  }

  get exclusivities() {
    return this.electrodeOptArchetype.onlyOneOf || [];
  }

  setEnabled(pkg, enabled) {
    const dependencies = { ...pkg.dependencies };
    const devDependencies = { ...pkg.devDependencies };

    let devOnly = true;
    if (this.electrodeOptArchetype.devOnly !== undefined) {
      devOnly = this.electrodeOptArchetype.devOnly;
    } else if (this.package && this.package.electrodeOptArchetype.devOnly !== undefined) {
      devOnly = this.package.electrodeOptArchetype.devOnly;
    }

    if (enabled && devOnly) {
      delete dependencies[this.packageName];
      devDependencies[this.packageName] = `^${this.installedVersion || this.npmVersion}`;
    } else if (enabled && !devOnly) {
      dependencies[this.packageName] = `^${this.installedVersion || this.npmVersion}`;
      delete devDependencies[this.packageName];
    } else {
      delete dependencies[this.packageName];
      delete devDependencies[this.packageName];
    }
    this.enabled = enabled;
    return {
      ...pkg,
      dependencies,
      devDependencies
    };
  }

  removeLegacyEnabled(pkg) {
    const optionalDependencies = { ...pkg.optionalDependencies };
    delete optionalDependencies[this.packageName];
    return {
      ...pkg,
      optionalDependencies
    };
  }

  convert(pkg) {
    pkg = this.setEnabled(pkg, this.enabledLegacy);
    return this.removeLegacyEnabled(pkg);
  }

  getConflictingFeatures(features) {
    if (!this.exclusivities.length) {
      return [];
    }

    return features.filter(feature => {
      if (feature.packageName === this.packageName || !feature.enabled || !this.enabled) {
        return false;
      }

      return this.exclusivities.indexOf(feature.packageName) >= 0;
    });
  }
}

async function getFeatures() {
  const features = optionalDependenciesList.map(packageName => new Feature(packageName));
  await Promise.all(features.map(feature => feature.attachNpmAttributes()));
  features.sort(function(a, b) { // eslint-disable-line prefer-arrow-callback
    return a.name.localeCompare(b.name);
  });
  return features;
}

function displayFeatureStatus(features) {
  const namePadding =
    features.reduce(function(a, b) { // eslint-disable-line prefer-arrow-callback
      return a.name.length > b.name.length ? a : b;
    }).name.length + 1;
  const enabledPadding = 4;
  const versionPadding = 10;

  const DISABLED = (isUnicodeSupported() ? "✗" : "N").padEnd(enabledPadding);
  const ENABLED = chalk.green((isUnicodeSupported() ? "✓" : "Y").padEnd(enabledPadding));

  write(
    chalk.bold("Feature".padEnd(namePadding)),
    chalk.bold("En?".padEnd(enabledPadding)),
    chalk.bold("Installed".padEnd(versionPadding)),
    chalk.bold("Latest".padEnd(versionPadding)),
    chalk.bold("Description")
  );

  const legacy = areCurrentEnablementsLegacy(features);

  features.forEach(feature => {
    const version =
      feature.installedVersion === feature.npmVersion
        ? chalk.cyan(feature.installedVersion.padEnd(versionPadding))
        : chalk.red(feature.installedVersion.padEnd(versionPadding));
    write(
      feature.name.padEnd(namePadding),
      (legacy ? feature.enabledLegacy : feature.enabled) ? ENABLED : DISABLED,
      version,
      chalk.yellow(feature.npmVersion.padEnd(versionPadding)),
      feature.description
    );
  });
}

function displayFeatureIssues(features) {
  const featuresByName = {};
  features.forEach(feature => (featuresByName[feature.packageName] = feature));
  features.forEach(feature => {
    if (!feature.package && feature.enabled) {
      writeError(
        chalk.red([
          `The feature "${feature.packageName}" is enabled but isn’t available`,
          `in your node_modules directory. Please perform an "npm install"`
        ].join(" "))
      );
    }

    feature.exclusivities
      .filter(
        exclusiveName =>
          exclusiveName !== feature.packageName &&
          feature.enabled &&
          featuresByName[exclusiveName].enabled
      )
      .forEach(exclusiveName => {
        const exclusive = featuresByName[exclusiveName];
        writeError(
          chalk.red(
            `The feature "${feature.name}" collides with "${exclusive.name}". Please uninstall one.`
          )
        );
      });
  });
}

function writeAppPkg(pkg) {
  const file = `${cwd}/package.json`;
  fs.writeFileSync(file, JSON.stringify(pkg, undefined, "  ") + "\n"); // eslint-disable-line
  appPkg = pkg;
}

function npmInstall() {
  execSync("npm install", { stdio: [0, 1, 2] }); // eslint-disable-line no-magic-numbers
}

async function convertEnablements(features, runNpmInstall = true) {
  features = features || (await getFeatures());
  let pkg = appPkg;
  features.forEach(feature => {
    pkg = feature.convert(pkg);
  });
  writeAppPkg(pkg);
  if (runNpmInstall) {
    npmInstall();
  }
}

async function promptForConversion(features) {
  const responses = await prompts({
    type: "confirm",
    name: "convert",
    message: `Convert archetype feature usage to new style (recommended)?`,
    initial: true
  });
  if (responses.convert === undefined) {
    userCancel();
  }
  if (responses.convert) {
    convertEnablements(features, false);
  }
}

async function promptForEnabled(features) {
  let pkg = appPkg;
  let conflictingFeature;
  let message = "Select features to enable:";

  do {
    const choices = features.map(feature => ({
      title: `${feature.name} - ${feature.description}`,
      value: feature.packageName,
      selected: feature.enabled
    }));

    const response = await prompts({
      type: "multiselect",
      name: "enabled",
      message,
      choices
    });

    if (response.enabled === undefined) {
      userCancel();
    }

    features.forEach(feature => {
      const enabled = response.enabled.indexOf(feature.packageName) >= 0;
      feature.enabled = enabled;
    });

    conflictingFeature = features.find(feature => { // eslint-disable-line
      // eslint-disable-line no-loop-func
      const conflicts = feature.getConflictingFeatures(features);
      if (conflicts.length > 0) {
        const package1 = chalk.underline(feature.name);
        const package2 = chalk.underline(conflicts[0].name);
        message = chalk.red(`${package1} conflicts with ${package2}, please reselect features:`);
        return true;
      }

      return false;
    });
  } while (conflictingFeature);

  features.forEach(feature => (pkg = feature.setEnabled(pkg, feature.enabled)));
  writeAppPkg(pkg);
}

async function promptForNpmInstall() {
  const responses = await prompts({
    type: "confirm",
    name: "npm",
    message: "Run `npm install`?",
    initial: false
  });
  if (responses.npm) {
    npmInstall();
  } else {
    write("Please run `npm install` to finalize feature selections.");
  }
}

async function displayFeatures() {
  const features = await getFeatures();
  displayFeatureStatus(features);
  displayFeatureIssues(features);
  if (areCurrentEnablementsLegacy(features)) {
    await promptForConversion(features);
  }
  await promptForEnabled(features);
  await promptForNpmInstall();
}

module.exports = {
  convertEnablements,
  displayFeatures,
  isUnicodeSupported,
  Feature
};
