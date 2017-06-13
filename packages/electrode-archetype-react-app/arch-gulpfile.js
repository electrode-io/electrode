"use strict";

const Fs = require("fs");
const archetype = require("./config/archetype");
const assert = require("assert");

assert(!archetype.noDev, "dev archetype is missing - development & build tasks not possible");

const Path = require("path");
const devRequire = archetype.devRequire;
const gulpHelper = devRequire("electrode-gulp-helper");
const shell = gulpHelper.shell;
const config = archetype.config;
const mkdirp = devRequire("mkdirp");
const envify = devRequire("gulp-envify");
const uglify = devRequire("gulp-uglify");
const filter = devRequire("gulp-filter");

const penthouse = archetype.devRequire("penthouse");
const CleanCSS = archetype.devRequire("clean-css");

const logger = require("./lib/logger");

function setupPath() {
  const nmBin = Path.join("node_modules", ".bin");
  gulpHelper.envPath.addToFront(Path.resolve(nmBin));
  gulpHelper.envPath.addToFront(Path.join(archetype.devDir, nmBin));
  gulpHelper.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setDevelopmentEnv() {
  process.env.NODE_ENV = "development";
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

const eTmpDir = archetype.eTmpDir;

function createGitIgnoreDir(dir, comment) {
  comment = comment || "";
  const dirFP = Path.resolve(dir);
  try {
    mkdirp.sync(dirFP);
  } catch (e) {
    logger.info("mkdir", e);
  }

  const gitIgnore = Path.join(dirFP, ".gitignore");
  if (!Fs.existsSync(gitIgnore)) {
    Fs.writeFileSync(gitIgnore, `# ${comment}\n*\n`);
  }
}

function createElectrodeTmpDir() {
  createGitIgnoreDir(Path.resolve(eTmpDir), "Electrode tmp dir");
}

function mkCmd(a) {
  return Array.isArray(a) ? a.join(" ") : Array.prototype.slice.call(arguments).join(" ");
}


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
    const f = ["", ".json", ".yml", ".yaml", ".js"].find((e) => {
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
  const grouped = options.targets.reduce((a, t) => {
    (checkCustom(t) ? a.custom : a.archetype).push(t);
    return a;
  }, { custom: [], archetype: [] });

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

/*
 * [generateServiceWorker gulp task to generate service worker code that will precache specific
 * resources so they work offline.]
 *
 */
function generateServiceWorker() {
  const NODE_ENV = process.env.NODE_ENV;
  const serviceWorkerExists = Fs.existsSync("./service-worker.js");
  const serviceWorkerConfigExists = Fs.existsSync("config/sw-precache-config.json");

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

function inlineCriticalCSS() {
  const HOST = process.env.HOST || "localhost";
  const PORT = process.env.PORT || 3000;
  const PATH = process.env.CRITICAL_PATH || "/";
  const url = `http://${HOST}:${PORT}${PATH}`;
  const statsPath = Path.resolve(process.cwd(), "dist/server/stats.json");
  const stats = JSON.parse(Fs.readFileSync(statsPath));
  const cssAsset = stats.assets.find((asset) => asset.name.endsWith(".css"));
  const cssAssetPath = Path.resolve(process.cwd(), `dist/js/${cssAsset.name}`);
  const targetPath = Path.resolve(process.cwd(), "dist/js/critical.css");
  const serverPromise = require(Path.resolve(process.cwd(), "server/index.js"));
  const penthouseOptions = {
    url,
    css: cssAssetPath,
    width: 1440,
    height: 900,
    timeout: 30000,
    strict: false,
    maxEmbeddedBase64Length: 1000,
    renderWaitTime: 2000,
    blockJSRequests: false
  };
  serverPromise.then(() => {
    penthouse(penthouseOptions, (err, css) => {
      if (err) {
        throw err;
      }
      const minifiedCSS = new CleanCSS().minify(css).styles;
      Fs.writeFile(targetPath, minifiedCSS, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        process.exit(0);
      });
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

function makeTasks(gulp) {
  const checkFrontendCov = (minimum) => {
    if (typeof minimum === "string") {
      minimum += ".";
    } else {
      minimum = "";
    }
    return exec(`istanbul check-coverage "coverage/client/*/coverage.json"`,
      `--config=${config.istanbul}/.istanbul.${minimum}yml`);
  };

  const optimizeModuleForProd = (module) => {
    const modulePath = Path.resolve("node_modules", module);
    assert(shell.test("-d", modulePath), `${modulePath} is not a directory`);
    createGitIgnoreDir(Path.resolve(archetype.prodModulesDir), "Electrode production modules dir");
    const prodPath = Path.join(archetype.prodModulesDir, module);
    return new Promise((resolve, reject) =>
      gulp.src(`${modulePath}/**/*.js`)
        .pipe(filter(["**", "!**/dist/**"]))
        .pipe(envify({
          NODE_ENV: "production"
        }))
        .pipe(uglify({
          compress: {
            "sequences": false,
            "dead_code": true,
            "drop_debugger": true
          },
          output: {
            beautify: false,
            comments: false,
            bracketize: true
          }
        }))
        .pipe(gulp.dest(prodPath))
        .on("error", reject)
        .on("end", resolve))
      .then(() => {
        shell.cp(Path.join(modulePath, "package.json"), Path.join(prodPath, "package.json"));
      });
  };

  const makeBabelRc = (destDir, rcFile) => {
    destDir = Path.resolve(destDir);
    const fn = Path.join(destDir, ".babelrc");
    if (Fs.existsSync(destDir) && !Fs.existsSync(fn)) {
      logger.info(`Generating ${fn} for you - please commit it.`);
      const rc = JSON.stringify({
        extends: `${Path.join(archetype.devPkg.name, "config", "babel", rcFile)}`
      }, null, 2);
      Fs.writeFileSync(fn, `${rc}\n`);
    }
  };

  const AppMode = archetype.AppMode;

  let tasks = {
    ".mk-prod-dir": () => createGitIgnoreDir(Path.resolve(archetype.prodDir), "Electrode production dir"),
    ".mk-dist-dir": () => createGitIgnoreDir(Path.resolve("dist"), "Electrode dist dir"),
    ".mk-dll-dir": () => createGitIgnoreDir(Path.resolve("dll"), "Electrode dll dir"),
    ".production-env": () => setProductionEnv(),
    ".development-env": () => setDevelopmentEnv(),
    ".webpack-dev": () => setWebpackDev(),
    ".static-files-env": () => setStaticFilesEnv(),
    ".optimize-stats": () => setOptimizeStats(),
    "build": {
      desc: AppMode.isSrc
        ? `Build your app's ${AppMode.src.dir} directory into ${AppMode.lib.dir} for production`
        : "Build your app's client bundle",
      task: ["build-dist", ".build-lib", "ss-prod-react", ".check.top.level.babelrc"]
    },

    //
    // browser coverage
    //
    ".build-browser-coverage-1": () => {
      setProductionEnv();
      return exec(`webpack`,
        `--config ${config.webpack}/webpack.config.browsercoverage.js`,
        `--colors`);
    },
    "build-browser-coverage": {
      desc: "Build browser coverage",
      task: [".clean.dist", ".build-browser-coverage-1", "build-dist:flatten-l10n", "build-dist:clean-tmp"]
    },

    "build-dev-static": {
      desc: "Build static copy of your app's client bundle for development",
      task: [".clean.dist", "build-dist-dev-static"]
    },

    "build-dist": [".clean.build", "build-dist-dll", "build-dist-min", "build-dist:flatten-l10n",
      "build-dist:merge-isomorphic-assets", "copy-dll", "build-dist:clean-tmp"],

    "build-dist-dev-static": {
      desc: false,
      task: `webpack --config ${config.webpack}/webpack.config.dev.static.js --colors`
    },

    ".ss-prod-react": () => optimizeModuleForProd("react"),
    ".ss-prod-react-dom": () => optimizeModuleForProd("react-dom"),
    ".ss-clean.prod-react": () => {
      shell.rm("-rf",
        Path.join(archetype.prodModulesDir, "react"),
        Path.join(archetype.prodModulesDir, "react-dom"));
    },
    "ss-prod-react": {
      desc: `Make optimized copy of react&react-dom for server side in dir ${archetype.prodModulesDir}`,
      dep: [".ss-clean.prod-react", ".mk-prod-dir"],
      task: [[".ss-prod-react", ".ss-prod-react-dom"]]
    },

    "build-dist-dll": () => undefined,
    "copy-dll": () => undefined,

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
      task: `node ${archetype.devDir}/scripts/l10n/flatten-messages.js`
    },

    "build-dist:merge-isomorphic-assets": {
      desc: false,
      task: `node ${archetype.devDir}/scripts/merge-isomorphic-assets.js`
    },

    ".build-lib": () => undefined,

    ".check.top.level.babelrc": () => {
      if (AppMode.isSrc && archetype.checkUserBabelRc() !== false) {
        logger.warn(`
You are using src for client & server, archetype will ignore your top level .babelrc
Please remove your top level .babelrc file if you have no other use of it.
Individual .babelrc files were generated for you in src/client and src/server
`);
      }
    },

    ".clean.lib:client": () => shell.rm("-rf", AppMode.lib.client),
    ".mk.lib.client.dir": () => {
      createGitIgnoreDir(Path.resolve(AppMode.lib.client), `Electrode app transpiled code from ${AppMode.src.client}`);
    },

    ".build.client.babelrc": () => makeBabelRc(AppMode.src.client, "babelrc-client"),

    "build-lib:client": {
      desc: false,
      dep: [".clean.lib:client", ".mk.lib.client.dir", ".build.client.babelrc"],
      task: mkCmd(`babel`,
        `--source-maps=inline --copy-files --out-dir ${AppMode.lib.client}`,
        `${AppMode.src.client}`)
    },

    ".clean.lib:server": () => shell.rm("-rf", AppMode.lib.server),
    ".mk.lib.server.dir": () => {
      createGitIgnoreDir(Path.resolve(AppMode.lib.server), `Electrode app transpiled code from ${AppMode.src.server}`);
    },

    ".build.server.babelrc": () => makeBabelRc(AppMode.src.server, "babelrc-server"),

    "build-lib:server": {
      desc: false,
      dep: [".clean.lib:server", ".mk.lib.server.dir", ".build.server.babelrc"],
      task: mkCmd(`babel`,
        `--source-maps=inline --copy-files --out-dir ${AppMode.lib.server}`,
        `${AppMode.src.server}`)
    },

    ".build.test.client.babelrc": () => {
      return AppMode.isSrc && makeBabelRc("test/client", "babelrc-client");
    },

    ".build.test.server.babelrc": () => {
      return AppMode.isSrc && makeBabelRc("test/server", "babelrc-server");
    },

    "check": ["lint", "test-cov"],
    "check-ci": ["lint", "test-ci"],
    "check-cov": ["lint", "test-cov"],
    "check-dev": ["lint", "test-dev"],

    "clean": [".clean.dist", ".clean.lib", ".clean.prod", ".clean.etmp", ".clean.dll"],
    ".clean.dist": () => shell.rm("-rf", "dist"),
    ".clean.lib": () => undefined, // to be updated below for src mode
    ".clean.prod": () => shell.rm("-rf", archetype.prodDir),
    ".clean.etmp": () => shell.rm("-rf", eTmpDir),
    ".clean.dll": () => shell.rm("-rf", "dll"),
    ".clean.build": [".clean.dist", ".clean.dll"],

    "cov-frontend": () => checkFrontendCov(),
    "cov-frontend-50": () => checkFrontendCov("50"),
    "cov-frontend-70": () => checkFrontendCov("70"),
    "cov-frontend-85": () => checkFrontendCov("85"),
    "cov-frontend-95": () => checkFrontendCov("95"),

    "debug": ["build-dev-static", "server-debug"],
    "dev": {
      desc: "Start your app with watch in development mode with webpack-dev-server",
      dep: [".development-env", ".clean.build", ".mk-dist-dir"],
      task: [".webpack-dev", ["wds.dev", "server-watch", "generate-service-worker"]]
    },

    "dev-static": {
      desc: "Start server in development mode with statically built files",
      task: ["build-dev-static", "app-server"]
    },

    "hot": {
      desc: "Start your app with watch in hot mode with webpack-dev-server",
      dep: [".development-env", ".clean.build", ".mk-dist-dir"],
      task: [".webpack-dev", ["wds.hot", "server-watch", "generate-service-worker"]]
    },

    "lint": [["lint-client", "lint-client-test", "lint-server", "lint-server-test"]],
    "lint-client": {
      desc: "Run eslint on client code in directories client and templates",
      task: () => lint({
        ext: ".js,.jsx",
        config: `${config.eslint}/.eslintrc-react`,
        targets: [AppMode.src.client, "templates"]
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
        targets: [AppMode.src.server]
      })
    },
    "lint-server-test": {
      desc: "Run eslint on server test code in directories test/server and test/func",
      task: () => lint({
        config: process.env.ES6_LINT ? `${config.eslint}/.eslintrc-mocha-test-es6` : `${config.eslint}/.eslintrc-mocha-test`,
        targets: ["test/server", "test/func"]
      })
    },

    "npm:test": ["check"],
    "npm:release": `node ${archetype.devDir}/scripts/map-isomorphic-cdn.js`,

    "server": ["app-server"],  // keep old server name for backward compat

    "app-server": {
      desc: "Start the app server only, Must have dist by running `gulp build` first.",
      task: () => {
        AppMode.setEnv(AppMode.lib.dir);
        return exec(`node ${Path.join(AppMode.lib.server, "index.js")}`);
      }
    },

    "server-debug": () => {
      AppMode.setEnv(AppMode.lib.dir);
      return exec(`node debug ${Path.join(AppMode.lib.server, "index.js")}`);
    },

    "server-prod": {
      dep: [".production-env", ".static-files-env"],
      desc: "Start server in production mode with static files routes.  Must have dist by running `gulp build`.",
      task: () => {
        AppMode.setEnv(AppMode.lib.dir);
        return exec(`node ${Path.join(AppMode.lib.server, "index.js")}`);
      }
    },

    ".init-bundle.valid.log": () => Fs.writeFileSync(Path.resolve(eTmpDir, "bundle.valid.log"), `${Date.now()}`),

    "server-watch": {
      dep: [".init-bundle.valid.log"],
      desc: "Start app's node server in watch mode with nodemon",
      task: () => {
        const watches = [
          Path.join(eTmpDir, "bundle.valid.log"),
          AppMode.src.server,
          "config"
        ].map((n) => `--watch ${n}`).join(" ");
        AppMode.setEnv(AppMode.src.dir);
        const node = AppMode.isSrc ? `babel-node` : "node";
        const serverIndex = Path.join(AppMode.src.server, "index.js");
        return exec(`nodemon`,
          `--delay 1 -C --ext js,jsx,json,yaml ${watches}`,
          `--exec ${node} ${serverIndex}`);
      }
    },

    "wds.dev": {
      desc: "Start webpack-dev-server in dev mode",
      task: mkCmd("webpack-dev-server",
        `--config ${config.webpack}/webpack.config.dev.js`,
        `--progress --colors`,
        `--port ${archetype.webpack.devPort}`,
        `--host ${archetype.webpack.devHostname}`)
    },

    "wds.hot": {
      desc: "Start webpack-dev-server with Hot Module Reload",
      task: mkCmd("webpack-dev-server",
        `--config ${config.webpack}/webpack.config.hot.js`,
        `--hot --progress --colors --inline`,
        `--port ${archetype.webpack.devPort}`,
        `--host ${archetype.webpack.devHostname}`)
    },

    "wds.test": {
      desc: "Start webpack-dev-server in test mode",
      task: mkCmd("webpack-dev-server",
        `--config ${config.webpack}/webpack.config.test.js`,
        `--progress --colors`,
        `--port ${archetype.webpack.testPort}`,
        `--host ${archetype.webpack.devHostname}`)
    },

    "test-server": () => [["lint-server", "lint-server-test"], "test-server-cov"],
    "test-watch-all": [["wds.test", "test-frontend-dev-watch"]],

    "test-ci": ["test-frontend-ci"],
    "test-cov": [".build.test.client.babelrc", ".build.test.server.babelrc", "test-frontend-cov", "test-server-cov"],
    "test-dev": ["test-frontend-dev", "test-server-dev"],

    "test-watch": () => exec(`pgrep -fl "webpack-dev-server.*${archetype.webpack.testPort}"`)
      .then(() => exec(`gulp test-frontend-dev-watch`))
      .catch(() => exec(`gulp test-watch-all`)),

    "test-frontend": `karma start ${config.karma}/karma.conf.js --colors`,

    "test-frontend-ci": mkCmd(`karma`,
      `start --browsers PhantomJS,Firefox ${config.karma}/karma.conf.coverage.js`,
      `--colors`),

    "test-frontend-cov": mkCmd(`karma`,
      `start ${config.karma}/karma.conf.coverage.js`, `--colors`),

    "test-frontend-dev": () => exec(`pgrep -fl "webpack-dev-server.*${archetype.webpack.testPort}"`)
      .then(() => exec(`karma start ${config.karma}/karma.conf.dev.js --colors`))
      .catch(() => exec(`gulp test-frontend`)),

    "test-frontend-dev-watch": mkCmd(`karma start`,
      `${config.karma}/karma.conf.watch.js`,
      `--colors --browsers Chrome --no-single-run --auto-watch`),

    "test-server-cov": () => {
      if (shell.test("-d", "test/server")) {
        AppMode.setEnv(AppMode.src.dir);
        return exec(`istanbul cover node_modules/mocha/bin/_mocha`,
          `-- -c --opts ${config.mocha}/mocha.opts test/server`);
      }
      return undefined;
    },

    "test-server-dev": () => {
      if (shell.test("-d", "test/server")) {
        AppMode.setEnv(AppMode.src.dir);
        return exec(`mocha`,
          `-c --opts ${config.mocha}/mocha.opts test/server`);
      }
      return undefined;
    },

    "build-analyze": {
      dep: [".optimize-stats"],
      desc: "Build your app's client bundle for production and run bundle analyzer",
      task: ["build-dist", "optimize-stats"]
    },
    "run-electrify-cli": {
      desc: false,
      task: `electrify dist/server/stats.json -O`
    },
    "electrify": [".clean.dist", "build-webpack-stats-with-fullpath", "build-dist:clean-tmp", "run-electrify-cli"],
    "build-webpack-stats-with-fullpath": {
      desc: "Build static bundle with stats.json containing fullPaths to inspect the bundle on electrode-electrify",
      task: `webpack --config ${config.webpack}/webpack.config.stats.electrify.js --colors`
    },
    "critical-css": {
      desc: "Start server and run penthouse to output critical CSS",
      task: inlineCriticalCSS
    },
    "generate-service-worker": {
      desc: "Generate Service Worker using the options provided in the app/config/sw-precache-config.json " +
      "file for prod/dev/hot mode",
      task: () => generateServiceWorker()
    },
    "optimize-stats": {
      desc: "Generate a list of all files that went into production bundle JS (results in .etmp)",
      task: `analyze-bundle -b dist/js/bundle.*.js -s dist/server/stats.json`
    },
    "pwa": {
      desc: "PWA must have dist by running `gulp build` first and then start the app server only.",
      task: ["build", "server"]
    }
  };

  if (AppMode.isSrc) {
    tasks = Object.assign(tasks, {
      ".clean.lib": () => shell.rm("-rf", AppMode.lib.client, AppMode.lib.server, AppMode.savedFile),
      ".build-lib:app-mode": () => Fs.writeFileSync(Path.resolve(AppMode.savedFile), JSON.stringify(AppMode, null, 2)),
      ".build-lib": {
        desc: false,
        dep: [".clean.lib", ".mk-prod-dir"],
        task: ["build-lib:client", "build-lib:server", ".build-lib:app-mode"]
      }
    });
  }

  if (Fs.existsSync(Path.resolve(AppMode.src.client, "dll.config.js"))) {
    tasks = Object.assign(tasks, {
      "build-dist-dll": {
        dep: [".mk-dll-dir", ".mk-dist-dir", ".production-env"],
        task: () => exec(`webpack`,
          `--config ${config.webpack}/webpack.config.dll.js`,
          `--colors`)
      },
      "copy-dll": () => shell.cp("-r", "dll/*", "dist")
    });
  }

  return tasks;
}


module.exports = function (gulp) {
  setupPath();
  createElectrodeTmpDir();
  gulp = gulp || require("gulp");
  process.env.FORCE_COLOR = "true"; // force color for chalk
  process.env.ES6_LINT = process.env.ES6_LINT || false; //enable lint es6 config for tests
  gulpHelper.loadTasks(makeTasks(gulp), gulp);
};
