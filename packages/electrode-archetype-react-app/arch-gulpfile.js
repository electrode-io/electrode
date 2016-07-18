"use strict";

const shell = require("shelljs");
const Path = require("path");
const archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
const gulpLoadTasks = archDevRequire("@walmart/electrode-gulp-load-tasks");

function setupPath() {
  const nm = Path.resolve("node_modules/.bin");
  if (process.env.PATH && process.env.PATH.indexOf(nm) < 0) {
    process.env.PATH += `:${nm}`;
  }
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

function exec(cmd, cb) {
  const error = (code) => new Error(`command exit code ${code}`);
  if (typeof cb === "function") {
    shell.exec(cmd, (code, stdout, stderr) => {
      cb(code !== 0 ? error(code) : undefined);
    });
  } else {
    return new Promise((resolve, reject) => {
      shell.exec(cmd, (code, stdout, stderr) => {
        code !== 0 ? reject(error(code)) : resolve();
      });
    });
  }
}

function checkFrontendCov(minimum) {
  if (typeof minimum === "string") {
    minimum += ".";
  } else {
    minimum = "";
  }
  return exec(`istanbul check-coverage 'coverage/client/*/coverage.json' --config=${__dirname}/config/istanbul/.istanbul.${minimum}yml`);
}

/*
 *
 * For information on how to specify a task, see:
 *
 * https://gecgithub01.walmart.com/xchen11/electrode-gulp-load-tasks#taskdata
 *
 */

const tasks = {
  ".production-env": () => setProductionEnv(),
  ".webpack-dev": () => setWebpackDev(),
  ".optimize-stats": () => setOptimizeStats(),
  "build": {
    desc: "Build your app's client bundle for production",
    task: ["build-dist"]
  },
  ".build-browser-coverage-1": () => {
    setProductionEnv();
    return exec(`webpack --config ${__dirname}/config/webpack/webpack.config.browsercoverage.js --colors`);
  },
  "build-browser-coverage": {
    desc: "Build browser coverage",
    task: ["clean-dist", ".build-browser-coverage-1", "build-dist:flatten-l10n", "build-dist:clean-tmp"]
  },
  "build-dev-static": {
    desc: "Build static copy of your app's client bundle for development",
    task: ["clean-dist", "build-dist-dev-static"]
  },
  "build-dist": ["clean-dist", "build-dist-min", "build-dist:flatten-l10n", "build-dist:clean-tmp"],
  "build-dist-dev-static": {
    desc: false,
    task: () => exec(`webpack --config ${__dirname}/config/webpack/webpack.config.dev.static.js --colors`)
  },
  "build-dist-min": {
    dep: [".production-env"],
    desc: false,
    task: () => exec(`webpack --config ${__dirname}/config/webpack/webpack.config.dev.static.js --colors`)
  },
  "build-dist:clean-tmp": {desc: false, task: () => shell.rm("-rf", "./tmp")},
  "build-dist:flatten-l10n": {desc: false, task: () => exec(`node ${__dirname}/scripts/l10n/flatten-messages.js`)},
  "check": ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"],
  "check-cov": ["lint", "test-cov"],
  "check-dev": ["lint", "test-dev"],
  "clean": ["clean-dist"],
  "clean-dist": () => shell.rm("-rf", "dist"),
  "cov-frontend": () => checkFrontendCov(),
  "cov-frontend-50": () => checkFrontendCov("50"),
  "cov-frontend-70": () => checkFrontendCov("70"),
  "cov-frontend-85": () => checkFrontendCov("85"),
  "cov-frontend-95": () => checkFrontendCov("95"),
  "debug": ["build-dev-static", "server-debug"],
  "dev": {
    desc: "Start server with watch in development mode with webpack-dev-server",
    task: [".webpack-dev", ["server-dev", "server-watch"]]
  },
  "dev-static": {
    desc: "Start server in development mode with statically built files",
    task: ["build-dev-static", "server"]
  },
  "hot": {
    desc: "Start server with watch in hot mode with webpack-dev-server",
    task: [".webpack-dev", ["server-hot", "server-watch"]]
  },
  "install-dev-peer-dep": () => {
  },
  "install-peer-dep": () => {
  },
  "lint": [["lint-client", "lint-client-test", "lint-server", "lint-server-test"]],
  "lint-client": () => exec(`eslint --ext .js,.jsx -c ${__dirname}/config/eslint/.eslintrc-react client templates`),
  "lint-client-test": () => exec(`eslint --ext .js,.jsx -c ${__dirname}/config/eslint/.eslintrc-react-test test/client`),
  "lint-server": () => exec(`eslint -c ${__dirname}/config/eslint/.eslintrc-node server`),
  "lint-server-test": () => exec(`eslint -c ${__dirname}/config/eslint/.eslintrc-mocha-test test/server test/func`),
  ".optimize-stats-gen": () => exec(`node ${__dirname}/scripts/gen-optimize-stats.js dist/js/bundle.*.js > optimize-stats.txt`),
  "optimize-stats": {
    desc: "Generate a TSV file optimize-stats.txt with list of all files that went into production bundle JS",
    task: [".optimize-stats", "build", ".optimize-stats-gen"]
  },
  "npm:test": ["check"],
  "npm:release": () => exec(`node ${__dirname}/scripts/map-isomorphic-cdn.js`),
  "server": {desc: "Start the app server only, need build first.", task: () => exec(`node server/index.js`)},
  "server-debug": () => exec(`node debug server/index.js`),
  "server-watch": () => exec(`nodemon --ext js,jsx --watch client --watch server --watch config server/index.js --exec node`),
  "server-dev": {
    desc: "Start server in dev mode with webpack-dev-server",
    task: () => exec(`webpack-dev-server --config ${__dirname}/config/webpack/webpack.config.dev.js --progress --colors --port 2992`)
  },
  "server-hot": {
    desc: "Start server in hot mode with webpack-dev-server",
    task: () => exec(`webpack-dev-server --config ${__dirname}/config/webpack/webpack.config.hot.js --hot --progress --colors --port 2992 --inline`)
  },
  "server-test": {
    desc: "Start server in test mode with webpack-dev-server",
    task: () => exec(`webpack-dev-server --config ${__dirname}/config/webpack/webpack.config.test.js --progress --colors --port 3001`)
  },
  "test-ci": ["test-frontend-ci"],
  "test-cov": ["test-frontend-cov", "test-server-cov"],
  "test-dev": ["test-frontend-dev", "test-server-dev"],
  "test-watch": () => exec(`(pgrep -fl 'webpack-dev-server.*3001' && gulp test-frontend-dev-watch) || gulp test-watch-all`),
  "test-watch-all": ["server-test", "test-frontend-dev-watch"],
  "test-frontend": () => exec(`karma start ${__dirname}/config/karma/karma.conf.js --colors`),
  "test-frontend-ci": () => exec(`karma start --browsers PhantomJS,Firefox ${__dirname}/config/karma/karma.conf.coverage.js --colors`),
  "test-frontend-cov": () => exec(`karma start ${__dirname}/config/karma/karma.conf.coverage.js --colors`),
  "test-frontend-dev": () => exec(`(pgrep -fl 'webpack-dev-server.*3001' && karma start ${__dirname}/config/karma/karma.conf.dev.js --colors) || gulp test-frontend`),
  "test-frontend-dev-watch": () => exec(`karma start ${__dirname}/config/karma/karma.conf.watch.js --colors --browsers Chrome --no-single-run --auto-watch`),
  "test-server": () => [["lint-server", "lint-server-test"], "test-server-cov"],
  "test-server-cov": () => exec(`if [ -d test/server ]; then istanbul cover _mocha -- -c --opts ${__dirname}/config/mocha/mocha.opts test/server; fi`),
  "test-server-dev": () => exec(`if [ -d test/server ]; then mocha -c --opts ${__dirname}/config/mocha/mocha.opts test/server; fi`)
};

module.exports = function (gulp) {
  setupPath();
  gulpLoadTasks(tasks, gulp || require("gulp"));
};
