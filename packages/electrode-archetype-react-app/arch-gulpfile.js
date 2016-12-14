"use strict";

const Path = require("path");
const fs = require("fs");
const archetype = require("./config/archetype");
const gulpHelper = archetype.devRequire("electrode-gulp-helper");
const shell = gulpHelper.shell;
const mkdirp = archetype.devRequire("mkdirp");
const config = archetype.config;
const penthouse = require("penthouse");
const CleanCSS = require('clean-css');

function setupPath() {
  const nmBin = "node_modules/.bin";
  gulpHelper.envPath.addToFront(Path.resolve(nmBin));
  gulpHelper.envPath.addToFront(Path.join(archetype.devPath, nmBin));
  gulpHelper.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setStaticFilesEnv() {
  process.env.STATIC_FILES = "true";
}

function setWebpackDev() {
  process.env.WEBPACK_DEV = "true";
}

function setOptimizeStats() {
  process.env.OPTIMIZE_STATS = "true";
}

const exec = gulpHelper.exec;


/*
 *  There are multiple eslint config for different groups of code
 *
 *   - eslintrc-react for directories client and templates (React Code)
 *   - eslintrc-react-test for test/client (React test code)
 *   - eslintrc-node for server (NodeJS code)
 *   - eslintrc-mocha-test for test/server and test/func (NodeJS test code)
 *
 *  If the directory contains a .eslintrc then it's used instead
 *
 */

function lint(options) {
  const ext = options.ext ? `--ext ${options.ext}` : "";

  const checkCustom = (t) => {
    const f = ["", ".json", ".yml"].find((e) => {
      const x = Path.resolve(Path.join(t, `.eslintrc${e}`));
      return fs.existsSync(x);
    });
    return f !== undefined;
  };

  //
  // group target directories into custom and archetype
  // custom - .eslintrc file exist
  // archetype - no .eslintrc, use config from archetype
  //
  const grouped = options.targets.reduce((a, t) => {
    (checkCustom(t) ? a.custom : a.archetype).push(t);
    return a;
  }, {custom: [], archetype: []});

  let promise;

  if (grouped.custom.length > 0) {
    const cmd = `eslint ${ext} ${grouped.custom.join(" ")}`;
    promise = exec(cmd);
  }

  if (grouped.archetype.length > 0) {
    const cmd = `eslint ${ext} --no-eslintrc -c ${options.config} ${grouped.archetype.join(" ")}`;
    promise = promise ? promise.then(() => exec(cmd)) : exec(cmd);
  }

  return promise;
}

function checkFrontendCov(minimum) {
  if (typeof minimum === "string") {
    minimum += ".";
  } else {
    minimum = "";
  }
  return exec(`istanbul check-coverage 'coverage/client/*/coverage.json' --config=${config.istanbul}/.istanbul.${minimum}yml`);
}

function createElectrodeTmpDir() {
  const eTmp = Path.resolve(".etmp");
  const eTmpGitIgnore = Path.join(eTmp, ".gitignore");
  if (!fs.existsSync(eTmpGitIgnore)) {
    mkdirp.sync(eTmp);
    fs.writeFileSync(eTmpGitIgnore, "# Electrode tmp dir\n*\n");
  }
}

/**
 * [generateServiceWorker gulp task to generate service worker code that will precache specific resources so they work offline.]
 *
 */
function generateServiceWorker() {
  const NODE_ENV = process.env.NODE_ENV;
  const serviceWorkerExists = fs.existsSync("./service-worker.js");
  const serviceWorkerConfigExists = fs.existsSync("config/sw-precache-config.json");

  /**
   * Determines whether the fetch event handler is included in the generated service worker code,
   * by default value is set to true for development builds set the value to false
   *
   * https://github.com/GoogleChrome/sw-precache#handlefetch-boolean
   *
   */
  const cacheRequestFetch = (NODE_ENV !== "production" ? "--no-handle-fetch" : "");

  if (serviceWorkerConfigExists) {
    // generate-service-worker
    return exec(`sw-precache --config=config/sw-precache-config.json --verbose ${cacheRequestFetch}`);
  } else if (serviceWorkerExists && !serviceWorkerConfigExists) {
    // this is the case when service-worker exists from the previous build but service-worker-config
    // does not exist/deleted on purpose for future builds
    return shell.rm("-rf", "./service-worker.js");
  } else {
    // default case
    return false;
  }
}

function inlineCriticalCSS(cb) {
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;
  const PATH = process.env.CRITICAL_PATH || '/';
  const url = `http://${HOST}:${PORT}${PATH}`;
  const statsPath = Path.resolve(process.cwd(), 'dist/server/stats.json');
  const stats = JSON.parse(fs.readFileSync(statsPath));
  const cssAsset = stats.assets.find((asset) => asset.name.endsWith('.css'));
  const cssAssetPath = Path.resolve(process.cwd(), `dist/js/${cssAsset.name}`);
  const targetPath = Path.resolve(process.cwd(), 'dist/js/critical.css');
  var serverPromise = require(Path.resolve(process.cwd(), 'server/index.js'));
  const penthouseOptions = {
    url: url,
    css: cssAssetPath,
    width: 1440,
    height: 900,
    timeout: 30000,
    strict: false,
    maxEmbeddedBase64Length: 1000,
    renderWaitTime: 2000,
    blockJSRequests: false,
  };
  serverPromise.then(() => {
    penthouse(penthouseOptions, (err, css)  => {
        if (err) {
          throw err;
        }
        const minifiedCSS = new CleanCSS().minify(css).styles;
        fs.writeFile(targetPath, minifiedCSS, (err) => {
          if (err) {
            throw err;
          }
          process.exit(0);
        })
    });
  });
}
/*
 *
 * For information on how to specify a task, see:
 *
 * https://www.npmjs.com/package/electrode-gulp-helper#taskdata
 *
 */

const tasks = {
  ".production-env": () => setProductionEnv(),
  ".static-files-env": () => setStaticFilesEnv(),
  ".webpack-dev": () => setWebpackDev(),
  ".optimize-stats": () => setOptimizeStats(),
  "build": {
    desc: "Build your app's client bundle for production",
    task: ["build-dist"]
  },
  "build-analyze": {
    dep: [".optimize-stats"],
    desc: "Build your app's client bundle for production and run bundle analyzer",
    task: ["build-dist", "optimize-stats"]
  },
  ".build-browser-coverage-1": () => {
    setProductionEnv();
    return exec(`webpack --config ${config.webpack}/webpack.config.browsercoverage.js --colors`);
  },
  "build-browser-coverage": {
    desc: "Build browser coverage",
    task: ["clean-dist", ".build-browser-coverage-1", "build-dist:flatten-l10n", "build-dist:clean-tmp"]
  },
  "build-dev-static": {
    desc: "Build static copy of your app's client bundle for development",
    task: ["clean-dist", "build-dist-dev-static"]
  },
  "build-dist": ["clean-dist", "build-dist-min", "build-dist:flatten-l10n", "generate-service-worker", "build-dist:clean-tmp"],
  "build-dist-dev-static": {
    desc: false,
    task: `webpack --config ${config.webpack}/webpack.config.dev.static.js --colors`
  },
  "electrify": ["clean-dist", "build-webpack-stats-with-fullpath", "build-dist:clean-tmp", "run-electrify-cli"],
  "build-webpack-stats-with-fullpath": {
    desc: "Build static bundle with stats.json containing fullPaths to inspect the bundle on electrode-electrify",
    task: `webpack --config ${config.webpack}/webpack.config.stats.electrify.js --colors`
  },
  "build-dist-min": {
    dep: [".production-env"],
    desc: false,
    task: `webpack --config ${config.webpack}/webpack.config.js --colors`
  },
  "build-dist:clean-tmp": {
    desc: false,
    task: () => shell.rm("-rf", "./tmp")
  },
  "build-dist:flatten-l10n": {
    desc: false,
    task: `node ${__dirname}/scripts/l10n/flatten-messages.js`
  },
  "run-electrify-cli": {
    desc: false,
    task: `electrify dist/server/stats.json -O`
  },
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
    task: [".webpack-dev", ["server-dev", "server-watch", "generate-service-worker"]]
  },
  "dev-static": {
    desc: "Start server in development mode with statically built files",
    task: ["build-dev-static", "server"]
  },
  "hot": {
    desc: "Start server with watch in hot mode with webpack-dev-server",
    task: [".webpack-dev", ["server-hot", "server-watch", "generate-service-worker"]]
  },
  "critical-css": {
    desc: "Start server and run penthouse to output critical CSS",
    task: inlineCriticalCSS
  },
  "generate-service-worker": {
    desc: "Generate Service Worker using the options provided in the app/config/sw-precache-config.json file for prod/dev/hot mode",
    task: () => generateServiceWorker()
  },
  "lint": [["lint-client", "lint-client-test", "lint-server", "lint-server-test"]],
  "lint-client": {
    desc: "Run eslint on client code in directories client and templates",
    task: () => lint({
      ext: ".js,.jsx",
      config: `${config.eslint}/.eslintrc-react`,
      targets: ["client", "templates"]
    })
  },
  "lint-client-test": {
    desc: "Run eslint on client test code in directory test/client",
    task: () => lint({
      ext: ".js,.jsx",
      config: `${config.eslint}/.eslintrc-react-test`,
      targets: ["test/client"]
    })
  },
  "lint-server": {
    desc: "Run eslint on server code in directory server",
    task: () => lint({
      config: `${config.eslint}/.eslintrc-node`,
      targets: ["server"]
    })
  },
  "lint-server-test": {
    desc: "Run eslint on server test code in directories test/server and test/func",
    task: () => lint({
      config: `${config.eslint}/.eslintrc-mocha-test`,
      targets: ["test/server", "test/func"]
    })
  },
  "optimize-stats": {
    desc: "Generate a list of all files that went into production bundle JS (results in .etmp)",
    task: `analyze-bundle -b dist/js/bundle.*.js -s dist/server/stats.json`
  },
  "npm:test": ["check"],
  "npm:release": `node ${__dirname}/scripts/map-isomorphic-cdn.js`,
  "pwa": {
    desc: "PWA must have dist by running `gulp build` first and then start the app server only.",
    task: ["build", "server"]
  },
  "server": {
    desc: "Start the app server only, Must have dist by running `gulp build` first.",
    task: `node server/index.js`
  },
  "server-prod": {
    dep: [".production-env", ".static-files-env"],
    desc: "Start server in production mode with static files routes.  Must have dist by running `gulp build`.",
    task: `node server/index.js`
  },
  "server-debug": `node debug server/index.js`,
  ".init-bundle.valid.log": () => fs.writeFileSync(Path.resolve(".etmp/bundle.valid.log"), `${Date.now()}`),
  "server-watch": {
    dep: [".init-bundle.valid.log"],
    task: `nodemon -C --ext js,jsx,json,yaml --watch .etmp/bundle.valid.log --watch server --watch config server/index.js --exec node`
  },
  "server-dev": {
    desc: "Start server in dev mode with webpack-dev-server",
    task: `webpack-dev-server --config ${config.webpack}/webpack.config.dev.js --progress --colors --port ${archetype.webpack.devPort}`
  },
  "server-hot": {
    desc: "Start server in hot mode with webpack-dev-server",
    task: `webpack-dev-server --config ${config.webpack}/webpack.config.hot.js --hot --progress --colors --port ${archetype.webpack.devPort} --inline`
  },
  "server-test": {
    desc: "Start server in test mode with webpack-dev-server",
    task: `webpack-dev-server --config ${config.webpack}/webpack.config.test.js --progress --colors --port ${archetype.webpack.testPort}`
  },
  "test-ci": ["test-frontend-ci"],
  "test-cov": ["test-frontend-cov", "test-server-cov"],
  "test-dev": ["test-frontend-dev", "test-server-dev"],
  "test-watch": () => exec(`pgrep -fl 'webpack-dev-server.*${archetype.webpack.testPort}`)
    .then(() => exec(`gulp test-frontend-dev-watch`))
    .catch(() => exec(`gulp test-watch-all`)),
  "test-watch-all": ["server-test", "test-frontend-dev-watch"],
  "test-frontend": `karma start ${config.karma}/karma.conf.js --colors`,
  "test-frontend-ci": `karma start --browsers PhantomJS,Firefox ${config.karma}/karma.conf.coverage.js --colors`,
  "test-frontend-cov": `karma start ${config.karma}/karma.conf.coverage.js --colors`,
  "test-frontend-dev": () => exec(`pgrep -fl 'webpack-dev-server.*${archetype.webpack.testPort}'`)
    .then(() => exec(`karma start ${config.karma}/karma.conf.dev.js --colors`))
    .catch(() => exec(`gulp test-frontend`)),
  "test-frontend-dev-watch": `karma start ${config.karma}/karma.conf.watch.js --colors --browsers Chrome --no-single-run --auto-watch`,
  "test-server": () => [["lint-server", "lint-server-test"], "test-server-cov"],
  "test-server-cov": () => shell.test("-d", "test/server") && exec(`istanbul cover _mocha -- -c --opts ${config.mocha}/mocha.opts test/server`),
  "test-server-dev": () => shell.test("-d", "test/server") && exec(`mocha -c --opts ${config.mocha}/mocha.opts test/server`)
};

module.exports = function (gulp) {
  setupPath();
  createElectrodeTmpDir();
  gulpHelper.loadTasks(tasks, gulp || require("gulp"));
};
