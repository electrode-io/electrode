"use strict";

const Path = require("path");
const requireAt = require("require-at");
const archetype = require("./config/archetype");
const devRequire = archetype.devRequire;
const xsh = devRequire("xsh");
const $$ = xsh.$;
const exec = xsh.exec;
const mkCmd = xsh.mkCmd;
const chalk = devRequire("chalk");
const Fs = require("fs");
const glob = devRequire("glob");

const flattenMessagesL10n = require(`${archetype.devPath}/scripts/l10n/flatten-messages.js`);
const copyAsFlowDeclaration = require(`${archetype.devPath}/scripts/copy-as-flow-declaration.js`);

if (process.argv[1].indexOf("gulp") >= 0) {
  const cmd = chalk.magenta(`clap ${process.argv.slice(2).join(" ")}`);
  console.log(`\nPlease use ${chalk.magenta("clap")} to run archetype commands.`);
  console.log(`\nie:  ${cmd}`);
  const icmd = chalk.magenta(`'npm i -g xclap-cli'`);
  console.log(`\nIf you haven't done so, please run ${icmd}\n`);
  process.exit(1);
}

function setupPath() {
  const nmBin = "node_modules/.bin";
  xsh.envPath.addToFront(Path.resolve(nmBin));
  xsh.envPath.addToFront(Path.join(archetype.devPath, nmBin));
  xsh.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setES6Module(flag) {
  if (flag) {
    process.env.ENABLE_ES6_MODULE = true;
  } else {
    delete process.env.ENABLE_ES6_MODULE;
  }
}

function checkFrontendCov(minimum) {
  if (typeof minimum !== "string") {
    minimum = "5";
  }

  return exec(
    `nyc check-coverage --temp-dir "coverage/client" --branches ${minimum} --lines ${minimum} --functions ${minimum} --statements ${minimum} --per-file`
  );
}

/*
 *  There are multiple eslint config for different groups of code
 *
 *   - eslintrc-base for scripts (React Code)
 *   - eslintrc-react for directories client and templates (React Code)
 *   - eslintrc-react-test for test/client (React test code)
 *
 *  If the directory contains a .eslintrc then it's used instead
 *
 */

function lint(options) {
  const ext = options.ext ? ` --ext ${options.ext}` : "";

  const checkCustom = t => {
    const f = ["", ".json", ".yml", ".yaml", ".js"].find(e => {
      const x = Path.resolve(Path.join(t, `.eslintrc${e}`));
      return Fs.existsSync(x);
    });
    return f !== undefined;
  };

  //
  // group target directories into custom and archetype
  // custom - .eslintrc file exist
  // archetype - no .eslintrc, use config from archetype
  //
  const grouped = options.targets.reduce(
    (a, t) => {
      (checkCustom(t) ? a.custom : a.archetype).push(t);
      return a;
    },
    { custom: [], archetype: [] }
  );

  const commands = [
    grouped.custom.length > 0 && `~$eslint${ext} ${grouped.custom.join(" ")}`,
    grouped.archetype.length > 0 &&
      `~$eslint${ext} -c ${options.config} ${grouped.archetype.join(" ")}`
  ];

  return Promise.resolve(commands.filter(x => x));
}

const makeBabelRc = () => {
  const archRc = Path.join(archetype.devPkg.name, "config", "babel", ".babelrc.js");

  const fn = Path.resolve(".babelrc");
  let rc = {};

  if (Fs.existsSync(fn)) {
    rc = JSON.parse(Fs.readFileSync(fn));
  }

  if (rc.extends !== archRc) {
    rc.extends = archRc;
    Fs.writeFileSync(fn, `${JSON.stringify(rc, null, 2)}\n`);
  }
};

/*
 *
 * For information on how to specify a task, see:
 *
 * https://www.npmjs.com/package/xclap
 *
 */

// quick tips name naming and invoking tasks:
// - task name without . or - are primary tasks
// - task name starts with . are hidden in help output
// - when invoking tasks in [], starting name with ? means optional (ie: won't fail if task not found)

function makeTasks(hostDir) {
  const tasks = {
    // env setup common tasks
    ".production-env": () => setProductionEnv(),

    // code build/compile tasks
    build: ["clean-dist", "build-lib", "build-dist"],
    "build-dist": ["build-dist-min", "build-lib:clean-tmp"],
    "build-dist-min": {
      dep: [".production-env"],
      desc: "Build minified dist files for production",
      task: `webpack --config ${archetype.devPath}/config/webpack/webpack.config.js --colors`
    },
    "build-esm": {
      dep: [".production-env", () => setES6Module(true)],
      task: [".prep-tmp-lib", "babel-src-step", "clean-esm", ".tmp-to-esm", "build-lib:clean-tmp"]
    },
    "build-lib": {
      dep: [".production-env", () => setES6Module(false)],
      task: [
        ".prep-tmp-lib",
        "babel-src-step",
        "clean-lib",
        ".tmp-to-lib",
        "build-lib:flatten-l10n",
        "build-lib:copy-flow",
        "build-lib:clean-tmp"
      ]
    },
    "babel-src-step": `~$babel -D src -d .tmplib`,
    "build-lib:clean-tmp": () => $$.rm("-rf", "./tmp"),
    "build-lib:copy-flow": () => copyAsFlowDeclaration(),
    "build-lib:flatten-l10n": flattenMessagesL10n,

    "archetype:check": [
      "archetype:test-dev-pkg",
      "clean-test-init",
      "archetype:test-init-pkg",
      "clean-test-init"
    ],
    "archetype:test-dev-pkg": `pjv -f dev/package.json`,
    "archetype:test-init-pkg": "pjv -f test-init/package.json",

    test: ["?.karma.test-frontend"],
    check: ["check-dep", "lint", "test-cov", "build-lib:clean-tmp"],
    "check-ci": ["check-dep", "lint", "test-ci", "build-lib:clean-tmp"],
    "check-cov": ["lint", "test-cov"],
    "check-dep": `ecd -f package.json --cf ${archetype.devPath}/config/dependencies/check.json -w`,
    "check-dev": ["lint", "test-dev"],

    ".prep-tmp-lib": () => $$.rm("-rf", ".tmplib"),
    ".tmp-to-lib": () => $$.mv(".tmplib", "lib"),
    clean: ["clean-lib", "clean-dist"],
    "clean-dist": () => $$.rm("-rf", "dist"),
    "clean-lib": () => $$.rm("-rf", "lib"),
    "clean-test-init": () => $$.rm("-rf", "test-init"),

    "clean-esm": () => $$.rm("-rf", "esm"),
    ".tmp-to-esm": () => $$.mv(".tmplib", "esm"),

    "cov-frontend": () => checkFrontendCov(),
    "cov-frontend-50": () => checkFrontendCov("50"),
    "cov-frontend-70": () => checkFrontendCov("70"),
    "cov-frontend-85": () => checkFrontendCov("85"),
    "cov-frontend-95": () => checkFrontendCov("95"),

    lint: ["lint-react-src", "lint-react-test", "lint-scripts"],

    "lint-react-src": {
      desc: "Run eslint on client code in directories client and templates",
      task: () =>
        lint({
          ext: ".js,.jsx",
          config: `${archetype.devPath}/config/eslint/.eslintrc-react`,
          targets: ["src"]
        })
    },

    "lint-react-test": {
      desc: "Run eslint in directories test/client and templates",
      task: () =>
        lint({
          ext: ".js,.jsx",
          config: `${archetype.devPath}/config/eslint/.eslintrc-react-test`,
          targets: ["test/client"]
        })
    },

    "lint-scripts": {
      desc: "Run eslint in directories scripts",
      task: () =>
        lint({
          ext: ".js",
          config: `${archetype.devPath}/config/eslint/.eslintrc-base`,
          targets: ["scripts"]
        })
    },

    "npm:prepublish"() {
      return ["electrode/prepublish " + this.argv.slice(1).join(" ")];
    },

    prepublish() {
      return [
        ".",
        this.argv.indexOf("--no-esm") < 0 && "build-esm",
        "build-lib",
        this.argv.indexOf("--no-dist-min") < 0 && "build-dist-min"
      ].filter(x => x);
    },

    "server-test": mkCmd(
      `webpack-dev-server --port 3001`,
      `--config ${archetype.devPath}/config/webpack/webpack.config.test.js --colors`
    ),

    "test-ci": ["?.karma.test-frontend-cov"],
    "test-cov": ["?.karma.test-frontend-cov", "?.jest.test-frontend-cov"],
    "test-dev": ["?.karma.test-frontend-dev"],
    "test-watch": ["?.karma.test-frontend-dev-watch"],
    "concurrent-test-watch": ["?.karma.test-frontend-dev-watch"],
    "test-frontend": ["?.karma.test-frontend"],
    initflow: {
      desc: "Initiate Flow for type checker",
      task: mkCmd(`flow init`)
    },
    "flow-typed-install": {
      desc: "Install flow 3rd-party interface library definitions from flow-typed repo.",
      task: mkCmd(`flow-typed install --packageDir ${archetype.devDir}`)
    }
  };

  if (archetype.options.karma !== false && archetype.options.mocha !== false) {
    Object.assign(tasks, {
      ".karma.test-frontend": mkCmd(
        `karma start`,
        `${archetype.devPath}/config/karma/karma.conf.js --colors`
      ),
      ".karma.test-frontend-cov": () => {
        process.env.ENABLE_KARMA_COV = "true";
        if ($$.test("-d", "test")) {
          console.log("\nRunning Karma unit tests:\n");
          return mkCmd(
            `~$karma start`,
            `${archetype.devPath}/config/karma/karma.conf.coverage.js --colors`
          );
        }
        return undefined;
      },
      ".karma.test-frontend-dev": mkCmd(
        `karma start`,
        `${archetype.devPath}/config/karma/karma.conf.dev.js --colors`
      ),
      ".karma.test-frontend-dev-watch": mkCmd(
        `karma start ${archetype.devPath}/config/karma/karma.conf.watch.js`,
        ` --colors --browsers Chrome --no-single-run --auto-watch`
      )
    });
  } else {
    console.log(
      "Disabling karma test tasks since archetype config options.karma === false or options.mocha === false"
    );
  }
  if (archetype.options.jest !== false) {
    Object.assign(tasks, {
      // TODO: need more jest equivalent tasks compare to karma
      ".jest.test-frontend-cov": () => {
        const srcJestFiles = glob.sync(`${hostDir}/src/**/\*.{test,spec}.{js,jsx}`);

        if ($$.test("-d", "_test_") || srcJestFiles.length > 0) {
          console.info("\nRunning jest unit tests:\n");
          return mkCmd(`~$jest`, `--config ${archetype.devPath}/config/jest/jest.config.js`);
        }
        return undefined;
      }
    });
  } else {
    console.log("Disabling jest test tasks since archetype config options.jest === false");
  }

  return tasks;
}

module.exports = function(xclap) {
  setupPath();
  makeBabelRc();
  xclap = xclap || requireAt(archetype.hostDir)("xclap") || devRequire("xclap");
  xclap.load("electrode", makeTasks(archetype.hostDir));
};
