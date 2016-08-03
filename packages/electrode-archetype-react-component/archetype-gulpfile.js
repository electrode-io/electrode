"use strict";

const $$ = require("shelljs");
const Path = require("path");
const archetype = require("./config/archetype");
const gulpHelper = archetype.devRequire("electrode-gulp-helper");
const exec = gulpHelper.exec;

function setupPath() {
  const nmBin = "node_modules/.bin";
  gulpHelper.envPath.addToFront(Path.resolve(nmBin));
  gulpHelper.envPath.addToFront(Path.join(archetype.devPath, nmBin));
  gulpHelper.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setWebpackDev() {
  process.env.WEBPACK_DEV = "true";
}

function setOptimizeStats() {
  process.env.OPTIMIZE_STATS = "true";
}

function checkFrontendCov(minimum) {
  if (typeof minimum === "string") {
    minimum += ".";
  } else {
    minimum = "";
  }

  return exec(`istanbul check-coverage 'coverage/client/*/coverage.json' --config=${__dirname}/config/istanbul/.istanbul.${minimum}yml`);
}

const tasks = {
  // env setup common tasks
  "~production-env": () => setProductionEnv(),
  "~webpack-dev": () => setWebpackDev(),

  "~optimize-stats": () => setOptimizeStats(),

  // code build/compile tasks
  "build": ["build-lib", "build-dist"],
  "build-dist": ["clean-dist", "build-dist-min", "build-dist-dev"],
  "build-dist-dev": {
    desc: "",
    task: () => exec(`webpack --config ${__dirname}/config/webpack/webpack.config.dev.js --colors`)
  },
  "build-dist-min": {
    dep: ["~production-env"],
    desc: "Build minified dist files for production",
    task: () => exec(`webpack --config ${__dirname}/config/webpack/webpack.config.js --colors`)
  },
  "build-lib": {
    dep: ["~production-env"],
    task: () => ["clean-lib", "babel-src-step", "build-lib:flatten-l10n", "build-lib:copy-flow", "build-lib:clean-tmp"]
  },
  "babel-src-step": () => exec(`babel src -d lib`),
  "build-lib:clean-tmp": () => $$.rm("-rf", "./tmp"),
  "build-lib:copy-flow": () => exec(`node ${__dirname}/scripts/copy-as-flow-declaration.js`),
  "build-lib:flatten-l10n": () => exec(`node ${__dirname}/scripts/l10n/flatten-messages.js`),

  // TODO: fix builder-init tasks using yoeman or something like builder-init
  // "archetype:check": "npm run archetype:lint && npm run archetype:test-dev-pkg && rm -rf test-init && npm run archetype:test-init && npm run archetype:test-init-pkg && rm -rf test-init",
  "archetype:check": ["archetype:lint", "archetype:test-dev-pkg", "clean-test-init"],
  "archetype:lint": ["archetype:lint-server"],
  "archetype:lint-server": () => exec(`eslint --color -c config/eslint/.eslintrc-node config/karma config/webpack demo-server`),
  // "archetype:prepublish": "archetype-support gen-dev",
  "archetype:test-dev-pkg": () => exec(`pjv -f dev/package.json`),
  // "archetype:test-init": "builder-init `pwd` --prompts='{\"packageName\":\"test-init\",\"packageGitHubOrg\":\"electrode\",\"packageDescription\":\"test\",\"licenseDate\":\"2016\",\"licenseOrg\":\"WML\",\"destination\":\"test-init\"}'",
  // "archetype:test-init-pkg": "pjv -f test-init/package.json",

  "check": ["check-dep", "lint", "test-cov"],
  "check-ci": ["check-dep", "lint", "test-ci"],
  "check-cov": ["lint", "test-cov"],
  "check-dep": () => exec(`ecd -f package.json --cf ${__dirname}/config/dependencies/check.json -w`),
  "check-dev": ["lint", "test-dev"],

  "clean": ["clean-lib", "clean-dist"],
  "clean-dist": () => $$.rm("-rf", "dist"),
  "clean-lib": () => $$.rm("-rf", "lib"),
  "clean-test-init": () => $$.rm("-rf", "test-init"),

  "cov-frontend": () => checkFrontendCov(),
  "cov-frontend-50": () => checkFrontendCov("50"),
  "cov-frontend-70": () => checkFrontendCov("70"),
  "cov-frontend-85": () => checkFrontendCov("85"),
  "cov-frontend-95": () => checkFrontendCov("95"),

  "dev": {
    desc: "Start server in development mode",
    task: ["~webpack-dev", ["server-dev", "server-test"]]
  },
  "dev-iso": {
    desc: "Start ISO server in development mode",
    task: ["~webpack-dev", ["iso-render-server-start", "server-dev-iso"]]
  },
  "hot": {
    desc: "Start server in hot/auto-watch mode",
    task: ["~webpack-dev", ["server-hot", "server-test"]]
  },

  "open-dev": ["dev", "open-demo"],
  "open-hot": ["hot", "open-demo"],
  "open-demo": "opener http://127.0.0.1:4000",

  "iso-render-server-start": ["~webpack-dev", "iso-render-server-start-watch"],
  "iso-render-server-start-watch": () => exec(`nodemon -w demo -w server -w src ${__dirname}/demo-server/index.js | bunyan -l warn`),

  "lint": ["lint-stylus", "lint-react-demo", "lint-react-src", "lint-react-test", "lint-scripts"],
  "lint-react-demo": () => exec(`eslint --ext .js,.jsx -c ${__dirname}/config/eslint/.eslintrc-react-demo demo/*.jsx --color`),
  "lint-react-src": () => exec(`eslint --ext .js,.jsx -c ${__dirname}/config/eslint/.eslintrc-react src --color`),
  "lint-react-test": () => exec(`eslint --ext .js,.jsx -c ${__dirname}/config/eslint/.eslintrc-react-test test/client --color`),
  "lint-scripts": () => exec(`eslint --ext .js -c ${__dirname}/config/eslint/.eslintrc-base scripts --color`),
  "lint-stylus": () => exec(`if [ -d src/styles ]; then stylint src/styles -c ${__dirname}/config/stylint/.stylintrc; else echo 'Skipping Stylint as no src/styles directory'; fi`),

  "npm:prepublish": ["build-lib", "build-dist-dev", "build-dist-min"],

  "server-dev": () => exec(`webpack-dev-server --port 4000 --config ${__dirname}/config/webpack/webpack.config.demo.dev.js --colors`),
  "server-dev-iso": () => exec(`webpack-dev-server --port 2992 --config ${__dirname}/config/webpack/webpack.config.demo.dev.js --colors`),
  "server-hot": () => exec(`webpack-dev-server --port 4000 --config ${__dirname}/config/webpack/webpack.config.demo.hot.js --colors`),
  "server-test": () => exec(`webpack-dev-server --port 3001 --config ${__dirname}/config/webpack/webpack.config.test.js --colors`),

  "test-ci": ["test-frontend-ci"],
  "test-cov": ["test-frontend-cov"],
  "test-dev": ["test-frontend-dev"],
  "test-watch": ["test-frontend-dev-watch"],
  "concurrent-test-watch": ["hot", "test-frontend-dev-watch"],
  "test-frontend": () => exec(`karma start ${__dirname}/config/karma/karma.conf.js --colors`),
  "test-frontend-ci": () => exec(`karma start --browsers PhantomJS,Firefox ${__dirname}/config/karma/karma.conf.coverage.js --colors`),
  "test-frontend-cov": () => exec(`karma start ${__dirname}/config/karma/karma.conf.coverage.js --colors`),
  "test-frontend-dev": () => exec(`karma start ${__dirname}/config/karma/karma.conf.dev.js --colors`),
  "test-frontend-dev-watch": () => exec(`karma start ${__dirname}/config/karma/karma.conf.watch.js --colors --browsers Chrome --no-single-run --auto-watch`)
};

module.exports = function (componentTasks, gulp) {
  setupPath();
  gulpHelper.loadTasks(Object.assign(tasks, componentTasks), gulp || require("gulp"));
};
