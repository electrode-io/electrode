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

function checkFrontendCov(minimum) {
  if (typeof minimum === "string") {
    minimum += ".";
  } else {
    minimum = "";
  }

  return exec(
    `istanbul check-coverage 'coverage/client/*/coverage.json'`,
    `--config=${archetype.devPath}/config/istanbul/.istanbul.${minimum}yml`
  );
}

const tasks = {
  // env setup common tasks
  "~production-env": () => setProductionEnv(),

  // code build/compile tasks
  build: ["clean-dist", "build-lib", "build-dist"],
  "build-dist": ["build-dist-min", "build-lib:clean-tmp"],
  "build-dist-min": {
    dep: ["~production-env"],
    desc: "Build minified dist files for production",
    task: `webpack --config ${archetype.devPath}/config/webpack/webpack.config.js --colors`
  },
  "build-lib": {
    dep: ["~production-env"],
    task: [
      "clean-lib",
      "babel-src-step",
      "build-lib:flatten-l10n",
      "build-lib:copy-flow",
      "build-lib:clean-tmp"
    ]
  },
  "babel-src-step": `babel -D src -d lib`,
  "build-lib:clean-tmp": () => $$.rm("-rf", "./tmp"),
  "build-lib:copy-flow": `node ${archetype.devPath}/scripts/copy-as-flow-declaration.js`,
  "build-lib:flatten-l10n": `node ${archetype.devPath}/scripts/l10n/flatten-messages.js`,

  "archetype:check": [
    "archetype:test-dev-pkg",
    "clean-test-init",
    "archetype:test-init-pkg",
    "clean-test-init"
  ],
  "archetype:test-dev-pkg": `pjv -f dev/package.json`,
  "archetype:test-init-pkg": "pjv -f test-init/package.json",

  check: ["check-dep", "lint", "test-cov", "build-lib:clean-tmp"],
  "check-ci": ["check-dep", "lint", "test-ci", "build-lib:clean-tmp"],
  "check-cov": ["lint", "test-cov"],
  "check-dep": `ecd -f package.json --cf ${archetype.devPath}/config/dependencies/check.json -w`,
  "check-dev": ["lint", "test-dev"],

  clean: ["clean-lib", "clean-dist"],
  "clean-dist": () => $$.rm("-rf", "dist"),
  "clean-lib": () => $$.rm("-rf", "lib"),
  "clean-test-init": () => $$.rm("-rf", "test-init"),

  "cov-frontend": () => checkFrontendCov(),
  "cov-frontend-50": () => checkFrontendCov("50"),
  "cov-frontend-70": () => checkFrontendCov("70"),
  "cov-frontend-85": () => checkFrontendCov("85"),
  "cov-frontend-95": () => checkFrontendCov("95"),

  lint: ["lint-react-src", "lint-react-test", "lint-scripts"],

  "lint-react-src": mkCmd(
    `eslint --ext .js,.jsx`,
    `-c ${archetype.devPath}/config/eslint/.eslintrc-react src --color`
  ),

  "lint-react-test": mkCmd(
    `eslint --ext .js,.jsx`,
    `-c ${archetype.devPath}/config/eslint/.eslintrc-react-test test/client --color`
  ),

  "lint-scripts": mkCmd(
    `eslint --ext .js`,
    `-c ${archetype.devPath}/config/eslint/.eslintrc-base scripts --color`
  ),

  "npm:prepublish": ["build-lib", "build-dist-min"],

  "server-test": mkCmd(
    `webpack-dev-server --port 3001`,
    `--config ${archetype.devPath}/config/webpack/webpack.config.test.js --colors`
  ),

  "test-ci": ["test-frontend-ci"],
  "test-cov": ["test-frontend-cov"],
  "test-dev": ["test-frontend-dev"],
  "test-watch": ["test-frontend-dev-watch"],
  "concurrent-test-watch": ["hot", "test-frontend-dev-watch"],
  "test-frontend": `karma start ${archetype.devPath}/config/karma/karma.conf.js --colors`,
  "test-frontend-ci": mkCmd(
    `karma start --browsers PhantomJS,Firefox`,
    `${archetype.devPath}/config/karma/karma.conf.coverage.js --colors`
  ),
  "test-frontend-cov": mkCmd(
    `karma start`,
    `${archetype.devPath}/config/karma/karma.conf.coverage.js --colors`
  ),
  "test-frontend-dev": mkCmd(
    `karma start`,
    `${archetype.devPath}/config/karma/karma.conf.dev.js --colors`
  ),
  "test-frontend-dev-watch": mkCmd(
    `karma start ${archetype.devPath}/config/karma/karma.conf.watch.js`,
    ` --colors --browsers Chrome --no-single-run --auto-watch`
  )
};

module.exports = function(xclap) {
  setupPath();
  xclap = xclap || requireAt(process.cwd())("xclap") || devRequire("xclap");
  xclap.load("electrode", tasks);
};
