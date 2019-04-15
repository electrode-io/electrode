"use strict";

/* eslint-disable object-shorthand, max-statements */

const Fs = require("fs");
const Path = require("path");
const assert = require("assert");
const requireAt = require("require-at");
const archetype = require("./config/archetype");

// make sure that -dev app archetype is also installed.
// if it's not then this will fail with an error message that it's not found.
require.resolve(`${archetype.devArchetypeName}/package.json`);

const warnYarn = require("./lib/warn-yarn");

const devRequire = archetype.devRequire;

const scanDir = devRequire("filter-scan-dir");
const chalk = devRequire("chalk");

if (process.argv[1].indexOf("gulp") >= 0) {
  const cmd = chalk.magenta(`clap ${process.argv.slice(2).join(" ")}`);
  console.log(`\nPlease use ${chalk.magenta("clap")} to run archetype commands.`);
  console.log(`\nie:  ${cmd}`);
  const icmd = chalk.magenta(`'npm i -g xclap-cli'`);
  console.log(`\nIf you haven't done so, please run ${icmd}\n`);
  process.exit(1);
}

const mergeIsomorphicAssets = require(`${archetype.devDir}/scripts/merge-isomorphic-assets.js`);
const flattenMessagesL10n = require(`${archetype.devDir}/scripts/l10n/flatten-messages.js`);
const mapIsomorphicCdn = require(`${archetype.devDir}/scripts/map-isomorphic-cdn.js`);

const config = archetype.config;
const mkdirp = devRequire("mkdirp");
const xsh = devRequire("xsh");
const shell = xsh.$;
const exec = xsh.exec;
const mkCmd = xsh.mkCmd;

const penthouse = archetype.devRequire("penthouse");
const CleanCSS = archetype.devRequire("clean-css");

const logger = require("./lib/logger");

function quote(str) {
  return str.startsWith(`"`) ? str : `"${str}"`;
}

function taskArgs(argv) {
  return (argv && argv.length > 1 && argv.slice(1)) || [];
}

function webpackConfig(file) {
  return Path.join(config.webpack, file);
}

function karmaConfig(file) {
  return Path.join(config.karma, file);
}

function mochaConfig(file) {
  return Path.join(config.mocha, file);
}

function eslintConfig(file) {
  return Path.join(config.eslint, file);
}

function setupPath() {
  const nmBin = Path.join("node_modules", ".bin");
  xsh.envPath.addToFront(Path.resolve(nmBin));
  xsh.envPath.addToFront(Path.join(archetype.devDir, nmBin));
  xsh.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setDevelopmentEnv() {
  process.env.NODE_ENV = "development";
}

function setKarmaCovEnv() {
  process.env.ENABLE_KARMA_COV = "true";
}

function setStaticFilesEnv() {
  process.env.STATIC_FILES = "true";
}

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

function setWebpackDev() {
  process.env.WEBPACK_DEV = "true";
  if (archetype.webpack.devMiddleware) {
    process.env.WEBPACK_DEV_MIDDLEWARE = "true";
  }
}

function setOptimizeStats() {
  process.env.OPTIMIZE_STATS = "true";
}

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

function removeLogFiles() {
  try {
    Fs.unlinkSync(Path.resolve("archetype-exceptions.log"));
  } catch (e) {} // eslint-disable-line

  try {
    Fs.unlinkSync(Path.resolve("archetype-debug.log"));
  } catch (e) {} // eslint-disable-line
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
      `~$eslint${ext} --no-eslintrc -c ${options.config} ${grouped.archetype.join(" ")}`
  ];

  return Promise.resolve(commands.filter(x => x));
}

/*
 * [generateServiceWorker clap task to generate service worker code that will precache specific
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
  const cacheRequestFetch = NODE_ENV !== "production" ? "--no-handle-fetch" : "";

  if (serviceWorkerConfigExists) {
    // generate-service-worker
    return exec(
      `sw-precache --config=config/sw-precache-config.json --verbose ${cacheRequestFetch}`
    );
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
  const cssAsset = stats.assets.find(asset => asset.name.endsWith(".css"));
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
      Fs.writeFile(targetPath, minifiedCSS, writeErr => {
        if (writeErr) {
          throw writeErr;
        }
        process.exit(0);
      });
    });
  });
}

function startAppServer(options) {
  options = options || [];
  const x = options.length > 0 ? ` with options: ${options.join(" ")}` : "";
  logger.info(`Starting app server${x}`);
  logger.info("To terminate press Ctrl+C.");
  archetype.AppMode.setEnv(archetype.AppMode.lib.dir);
  return exec(`node`, options, Path.join(archetype.AppMode.lib.server, "index.js"));
}

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

function makeTasks(xclap) {
  assert(xclap.concurrent, "xclap version must be 0.2.28+");
  process.env.ENABLE_CSS_MODULE = "false";
  process.env.ENABLE_KARMA_COV = "false";

  const checkFrontendCov = minimum => {
    if (typeof minimum === "string") {
      minimum += ".";
    } else {
      minimum = "";
    }
    const configFile = quote(`${config.istanbul}/.istanbul.${minimum}yml`);
    return exec(
      `istanbul check-coverage "coverage/client/*/coverage.json"`,
      `--config=${configFile}`
    );
  };

  const optimizeModuleForProd = module => {
    const modulePath = Path.resolve("node_modules", module);
    assert(shell.test("-d", modulePath), `${modulePath} is not a directory`);
    createGitIgnoreDir(Path.resolve(archetype.prodModulesDir), "Electrode production modules dir");
    const prodPath = Path.join(archetype.prodModulesDir, module);
    const cmd = mkCmd(
      `babel -q ${quote(modulePath)} --no-babelrc --ignore dist -D`,
      `--plugins transform-node-env-inline,minify-dead-code-elimination`,
      `-d ${quote(prodPath)}`
    );
    return exec(cmd).then(() => {
      const dist = Path.join(modulePath, "dist");
      if (Fs.existsSync(dist)) {
        shell.cp("-rf", dist, prodPath);
      }
    });
  };

  const makeBabelRc = (destDir, rcFile) => {
    destDir = Path.resolve(destDir);

    if (!Fs.existsSync(destDir)) return;

    const archRc = Path.join(archetype.devPkg.name, "config", "babel", rcFile);

    const oldFn = Path.join(destDir, ".babelrc");
    const fn = Path.join(destDir, ".babelrc.js");

    if (Fs.existsSync(oldFn)) {
      const rc = JSON.parse(Fs.readFileSync(oldFn));
      rc.extends = archRc;
      Fs.writeFileSync(oldFn, `${JSON.stringify(rc, null, 2)}\n`);
      logger.info(`You have old ${oldFn} - please remove it to allow .babelrc.js.`);
    } else if (!Fs.existsSync(fn)) {
      logger.info(`Generating ${fn} for you - please commit it.`);
      const rc = `module.exports = {
  extends: "${archRc}"
};\n`;
      Fs.writeFileSync(fn, rc);
    }
  };

  const AppMode = archetype.AppMode;

  const babelCliIgnore = quote(
    [`**/__test__`, `**/__tests__`, `**/_test_`, `**/*.spec.js`, `**/*.spec.jsx`]
      .concat(archetype.babel.enableTypeScript && [`**/*.test.ts`, `**/*.test.tsx`])
      .filter(x => x)
      .join(",")
  );

  const babelCliExtensions = quote(
    [".js", ".jsx"]
      .concat(archetype.babel.enableTypeScript && [".ts", ".tsx"])
      .filter(x => x)
      .join(",")
  );

  const babelEnvTargetsArr = Object.keys(archetype.babel.envTargets).filter(k => k !== "node");

  const buildDistDirs = babelEnvTargetsArr
    .filter(name => name !== "default")
    .map(name => `dist-${name}`);

  let tasks = {
    ".mk-prod-dir": () =>
      createGitIgnoreDir(Path.resolve(archetype.prodDir), "Electrode production dir"),
    ".mk-dist-dir": () => createGitIgnoreDir(Path.resolve("dist"), "Electrode dist dir"),
    ".mk-dll-dir": () => createGitIgnoreDir(Path.resolve("dll"), "Electrode dll dir"),
    ".production-env": () => setProductionEnv(),
    ".development-env": () => setDevelopmentEnv(),
    ".webpack-dev": () => setWebpackDev(),
    ".static-files-env": () => setStaticFilesEnv(),
    ".optimize-stats": () => setOptimizeStats(),
    ".remove-log-files": () => removeLogFiles(),
    build: {
      dep: [".remove-log-files", ".production-env", ".set.css-module.env"],
      desc: AppMode.isSrc
        ? `Build your app's ${AppMode.src.dir} directory into ${AppMode.lib.dir} for production`
        : "Build your app's client bundle",
      task: [".build-lib", "build-dist", ".check.top.level.babelrc", "mv-to-dist"]
    },

    //
    // browser coverage
    //
    ".build-browser-coverage-1": () => {
      setProductionEnv();
      return exec(
        `webpack`,
        `--config`,
        quote(webpackConfig("webpack.config.browsercoverage.js")),
        `--colors`
      );
    },
    ".set.css-module.env": () => {
      const x = archetype.webpack;
      if (x.cssModuleSupport && x.enableShortenCSSNames) {
        process.env.ENABLE_CSS_MODULE = "true";
      }
    },
    "build-browser-coverage": {
      desc: "Build browser coverage",
      task: [
        ".clean.dist",
        ".build-browser-coverage-1",
        "build-dist:flatten-l10n",
        "build-dist:clean-tmp"
      ]
    },

    "build-dev-static": {
      desc: "Build static copy of your app's client bundle for development",
      task: [".clean.dist", "build-dist-dev-static"]
    },

    "build-dist": [
      ".production-env",
      ".set.css-module.env",
      ".clean.build",
      "build-dist-dll",
      "build-dist-min",
      "build-dist:flatten-l10n",
      "build-dist:merge-isomorphic-assets",
      "copy-dll",
      "build-dist:clean-tmp"
    ],

    "mv-to-dist": ["mv-to-dist:clean", "mv-to-dist:mv-dirs", "mv-to-dist:keep-targets"],
    "build-dist-dev-static": {
      desc: false,
      task: mkCmd(
        `webpack --config`,
        quote(webpackConfig("webpack.config.dev.static.js")),
        `--colors`,
        `--display-error-details`
      )
    },

    ".ss-prod-react": () => optimizeModuleForProd("react"),
    ".ss-prod-react-dom": () => optimizeModuleForProd("react-dom"),
    ".ss-clean.prod-react": () => {
      shell.rm(
        "-rf",
        Path.join(archetype.prodModulesDir, "react"),
        Path.join(archetype.prodModulesDir, "react-dom")
      );
    },
    "ss-prod-react": {
      desc: `Make optimized copy of react&react-dom for server side in dir ${
        archetype.prodModulesDir
      }`,
      dep: [".ss-clean.prod-react", ".mk-prod-dir"],
      task: xclap.concurrent(".ss-prod-react", ".ss-prod-react-dom")
    },

    "build-dist-dll": () => undefined,
    "copy-dll": () => undefined,

    "build-dist-min": {
      dep: [".production-env"],
      desc: "build dist for production",
      task: xclap.concurrent(
        babelEnvTargetsArr.map((name, index) =>
          xclap.exec(
            [
              `webpack --config`,
              quote(webpackConfig("webpack.config.js")),
              `--colors --display-error-details`
            ],
            {
              xclap: { delayRunMs: index * 2000 },
              execOptions: { env: { ENV_TARGET: name } }
            }
          )
        )
      )
    },

    "mv-to-dist:clean": {
      desc: `clean static resources within ${buildDistDirs}`,
      task: () => {
        buildDistDirs.forEach(dir => {
          // clean static resources within `dist-X` built by user specified env targets
          // and leave [.js, .map, .json] files only
          const removedFiles = scanDir.sync({
            dir: Path.resolve(dir),
            includeRoot: true,
            ignoreExt: [".js", ".map", ".json"]
          });
          shell.rm("-rf", ...removedFiles);
        });
        return;
      }
    },

    "mv-to-dist:mv-dirs": {
      desc: `move ${buildDistDirs} to dist`,
      task: () => {
        buildDistDirs.forEach(dir => {
          scanDir
            .sync({
              dir,
              includeRoot: true,
              filterExt: [".js", ".json", ".map"]
              // the regex above matches all the sw-registration.js, sw-registration.js.map,
              // main.bundle.js and main.bundle.js.map and stats.json
            })
            .forEach(file => {
              if (file.endsWith(".js")) {
                shell.cp("-r", file, "dist/js");
              } else if (file.endsWith(".map")) {
                shell.cp("-r", file, "dist/map");
              } else {
                shell.cp("-r", file, `dist/server/${dir.split("-")[1]}-${Path.basename(file)}`);
              }
            });
        });
        return;
      }
    },

    "mv-to-dist:keep-targets": {
      desc: `write each targets to respective isomorphic-assets.json`,
      task: () => {
        buildDistDirs.forEach(dir => {
          const isomorphicPath = Path.resolve(dir, "isomorphic-assets.json"); // add `targets` field to `dist-X/isomorphic-assets.json`
          if (Fs.existsSync(isomorphicPath)) {
            Fs.readFile(isomorphicPath, { encoding: "utf8" }, (err, data) => {
              if (err) throw err;
              const assetsJson = JSON.parse(data);
              const { envTargets } = archetype.babel;
              assetsJson.targets = envTargets[dir.split("-")[1]];
              Fs.writeFile(isomorphicPath, JSON.stringify(assetsJson, null, 2), err => {
                if (err) throw err;
              });
            });
          }
        });
        return;
      }
    },

    "build-dist:clean-tmp": {
      desc: false,
      task: () => shell.rm("-rf", "./tmp")
    },

    "build-dist:flatten-l10n": flattenMessagesL10n,

    "build-dist:merge-isomorphic-assets": mergeIsomorphicAssets,
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
      createGitIgnoreDir(
        Path.resolve(AppMode.lib.client),
        `Electrode app transpiled code from ${AppMode.src.client}`
      );
    },

    ".build.client.babelrc": () => {
      makeBabelRc(AppMode.src.dir, "babelrc-client.js");
      makeBabelRc(AppMode.src.client, "babelrc-client.js");
    },

    ".build-lib:delete-babel-ignored-files": {
      desc: false,
      task: () => {
        const libDir = Path.resolve(AppMode.lib.dir);
        const ignoredFiles = scanDir.sync({
          dir: libDir,
          includeRoot: true,
          filter: x => {
            return x.indexOf(".spec.") > 0 || x.indexOf(".test.") > 0;
          }
        });
        ignoredFiles.forEach(f => Fs.unlinkSync(f));
      }
    },

    "build-lib:all": {
      desc: false,
      dep: [
        ".clean.lib:client",
        ".clean.lib:server",
        ".mk.lib.client.dir",
        ".mk.lib.server.dir",
        ".build.client.babelrc",
        ".build.server.babelrc"
      ],
      task: mkCmd(
        `~$babel ${AppMode.src.dir}`,
        `--out-dir=${AppMode.lib.dir}`,
        `--extensions=${babelCliExtensions}`,
        `--source-maps=inline --copy-files`,
        `--verbose --ignore=${babelCliIgnore}`
      ),
      finally: [".build-lib:delete-babel-ignored-files"]
    },

    // TODO: to be removed
    "build-lib:client": {
      desc: false,
      dep: [".clean.lib:client", ".mk.lib.client.dir", ".build.client.babelrc"],
      task: () => {
        const dirs = AppMode.hasSubApps
          ? []
              .concat(
                scanDir.sync({
                  dir: AppMode.src.dir,
                  includeDir: true,
                  grouping: true,
                  filterDir: x => !x.startsWith("server") && "dirs",
                  filter: () => false
                }).dirs
              )
              .filter(x => x)
          : [AppMode.client];

        return dirs.map(x =>
          mkCmd(
            `~$babel ${Path.posix.join(AppMode.src.dir, x)}`,
            `--out-dir=${Path.posix.join(AppMode.lib.dir, x)}`,
            `--extensions=${babelCliExtensions}`,
            `--source-maps=inline --copy-files`,
            `--verbose --ignore=${babelCliIgnore}`
          )
        );
      },
      finally: [".build-lib:delete-babel-ignored-files"]
    },

    ".clean.lib:server": () => shell.rm("-rf", AppMode.lib.server),
    ".mk.lib.server.dir": () => {
      createGitIgnoreDir(
        Path.resolve(AppMode.lib.server),
        `Electrode app transpiled code from ${AppMode.src.server}`
      );
    },

    ".build.server.babelrc": () => {
      const serverDirs =
        scanDir.sync({
          dir: AppMode.src.dir,
          includeDir: true,
          includeRoot: true,
          grouping: true,
          filterDir: x => x.startsWith("server") && "dirs",
          filter: () => false
        }).dirs || [];

      serverDirs.forEach(x => {
        makeBabelRc(x, "babelrc-server.js");
      });
    },

    // TODO: to be removed
    "build-lib:server": {
      desc: false,
      dep: [".clean.lib:server", ".mk.lib.server.dir", ".build.server.babelrc"],
      task: [
        mkCmd(
          `~$babel ${AppMode.src.server} --out-dir=${AppMode.lib.server}`,
          `--extensions=${babelCliExtensions}`,
          `--source-maps=inline --copy-files`,
          `--ignore=${babelCliIgnore}`
        ),
        ".build-lib:delete-babel-ignored-files"
      ]
    },

    ".build.test.client.babelrc": () => {
      return AppMode.isSrc && makeBabelRc("test/client", "babelrc-client.js");
    },

    ".build.test.server.babelrc": () => {
      return AppMode.isSrc && makeBabelRc("test/server", "babelrc-server.js");
    },

    check: ["lint", "test-cov"],
    "check-ci": ["lint", "test-ci"],
    "check-cov": ["lint", "test-cov"],
    "check-dev": ["lint", "test-dev"],

    clean: [".clean.dist", ".clean.lib", ".clean.prod", ".clean.etmp", ".clean.dll"],
    ".clean.dist": () => shell.rm("-rf", "dist", ...buildDistDirs),
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

    debug: ["build-dev-static", "server-debug"],
    devbrk: ["dev --inspect-brk"],
    dev: {
      desc: "Start your app with watch in development mode",
      dep: [
        ".remove-log-files",
        ".development-env",
        ".mk-dist-dir",
        ".build.client.babelrc",
        ".build.server.babelrc"
      ],
      task: function() {
        if (!Fs.existsSync(".isomorphic-loader-config.json")) {
          Fs.writeFileSync(".isomorphic-loader-config.json", JSON.stringify({}));
        }
        const args = taskArgs(this.argv);

        return [
          ".set.css-module.env",
          ".webpack-dev",
          archetype.webpack.devMiddleware
            ? ["server-admin", "generate-service-worker"]
            : ["wds.dev", `server-watch ${args.join(" ")}`, "generate-service-worker"]
        ];
      }
    },

    hot: {
      desc: "Start app dev with hot reload enabled",
      task: () => {
        archetype.webpack.enableHotModuleReload = true;
        return "dev";
      }
    },

    "dev-static": {
      desc: "Start server in development mode with statically built files",
      task: ["build-dev-static", "app-server"]
    },

    lint: xclap.concurrent("lint-client", "lint-client-test", "lint-server", "lint-server-test"),
    "lint-client": {
      desc: "Run eslint on client code in directories client and templates",
      task: () =>
        lint({
          ext: ".js,.jsx",
          config: eslintConfig(".eslintrc-react"),
          targets: [AppMode.src.client, "templates"]
        })
    },
    "lint-client-test": {
      desc: "Run eslint on client test code in directory test/client",
      task: () =>
        lint({
          ext: ".js,.jsx",
          config: eslintConfig(".eslintrc-react-test"),
          targets: ["test/client"]
        })
    },
    "lint-server": {
      desc: "Run eslint on server code in directory server",
      task: () =>
        lint({
          config: eslintConfig(".eslintrc-node"),
          targets: [AppMode.src.server]
        })
    },
    "lint-server-test": {
      desc: "Run eslint on server test code in directories test/server and test/func",
      task: () =>
        lint({
          config: process.env.SERVER_ES6
            ? eslintConfig(".eslintrc-mocha-test-es6")
            : eslintConfig(".eslintrc-mocha-test"),
          targets: ["test/server", "test/func"]
        })
    },

    "npm:test": ["check"],
    "npm:release": mapIsomorphicCdn,

    server: ["app-server"], // keep old server name for backward compat

    "app-server": {
      desc: "Start the app server only. Must run 'clap build' first.",
      task: () => startAppServer()
    },

    "server-debug": {
      desc: "Start the app serve with 'node debug'",
      task: () => startAppServer(["debug"])
    },

    "server-build-debug": {
      desc: "Build and debug with devTools",
      task: ["build", "server-devtools"]
    },

    "server-build-debug-brk": {
      desc: "Build and debug with devTools with breakpoint starting the app",
      task: ["build", "server-devtools-debug-brk"]
    },

    "server-devtools": {
      desc: "Debug the app server with 'node --inspect'",
      task: () => startAppServer(["--inspect"])
    },

    "server-devtools-debug-brk": {
      desc: "Debug the app server with 'node --inspect --debug-brk'",
      task: () => startAppServer(["--inspect", "--debug-brk"])
    },

    "server-prod": {
      dep: [".production-env", ".static-files-env"],
      desc:
        "Start server in production mode with static files routes.  Must run 'clap build' first.",
      task: () => startAppServer()
    },

    ".init-bundle.valid.log": () =>
      Fs.writeFileSync(Path.resolve(eTmpDir, "bundle.valid.log"), `${Date.now()}`),

    "server-watch": {
      dep: [".init-bundle.valid.log"],
      desc: "Start app's node server in watch mode with nodemon",
      task: function() {
        const watches = (archetype.webpack.devMiddleware
          ? []
          : [Path.join(eTmpDir, "bundle.valid.log")]
        )
          .concat(["config", AppMode.src.server])
          .filter(x => x)
          .map(n => `--watch ${n}`)
          .join(" ");
        AppMode.setEnv(AppMode.src.dir);
        const babelRun = quote(Path.join(archetype.dir, "support/babel-run"));
        const nodeRunApp = AppMode.isSrc
          ? `node ${babelRun} ${AppMode.src.server}`
          : `node ${AppMode.src.server}`;

        return mkCmd(
          `~$nodemon`,
          taskArgs(this.argv).join(" "),
          archetype.webpack.devMiddleware ? "" : "-C",
          `--delay 1 --ext js,jsx,json,yaml,log,ts,tsx ${watches}`,
          `--exec ${nodeRunApp}`
        );
      }
    },

    "server-admin": {
      desc: "Start development with admin server",
      task: function() {
        AppMode.setEnv(AppMode.src.dir);
        const exec = AppMode.isSrc
          ? quote(Path.join(archetype.dir, "support/babel-run"))
          : AppMode.src.server;

        return mkCmd(
          `~(tty)$node ${quote(Path.join(archetype.devDir, "lib/dev-admin"))}`,
          taskArgs(this.argv).join(" "),
          `--exec ${exec} --ext js,jsx,json,yaml,log,ts,tsx`,
          `--watch config ${AppMode.src.server}`,
          AppMode.isSrc ? `-- ${AppMode.src.server}` : ""
        );
      }
    },

    "wds.dev": {
      desc: "Start webpack-dev-server in dev mode",
      task: mkCmd(
        "webpack-dev-server",
        `--watch --watch-aggregate-timeout 2000`,
        archetype.webpack.enableHotModuleReload ? `--hot` : ``,
        `--config`,
        quote(webpackConfig("webpack.config.dev.js")),
        `--progress --colors`,
        `--port ${archetype.webpack.devPort}`,
        `--host ${archetype.webpack.devHostname}`
      )
    },

    "wds.test": {
      desc: "Start webpack-dev-server in test mode",
      task: mkCmd(
        "webpack-dev-server",
        `--config`,
        quote(webpackConfig("webpack.config.test.js")),
        `--progress --colors`,
        `--port ${archetype.webpack.testPort}`,
        `--host ${archetype.webpack.devHostname}`
      )
    },

    "test-server": xclap.concurrent(["lint-server", "lint-server-test"], "test-server-cov"),
    "test-watch-all": xclap.concurrent("wds.test", "test-frontend-dev-watch"),

    "test-ci": ["test-frontend-ci"],
    "test-cov": [
      ".build.test.client.babelrc",
      ".build.test.server.babelrc",
      "?.karma.test-frontend-cov",
      ".jest.test-frontend-cov",
      "test-server-cov"
    ].filter(x => x),
    "test-dev": ["test-frontend-dev", "test-server-dev"],

    "test-watch": () =>
      exec(`pgrep -fl "webpack-dev-server.*${archetype.webpack.testPort}"`)
        .then(() => `test-frontend-dev-watch`)
        .catch(() => `test-watch-all`),

    "test-frontend": ["?.karma.test-frontend"],
    "test-frontend-ci": ["?.karma.test-frontend-ci"],

    ".jest.test-frontend-cov": () => {
      const testDir = ["_test_", "__test__", "__tests__"].find(x => shell.test("-d", x));
      let runJest = testDir;
      if (!runJest) {
        runJest =
          scanDir.sync({
            dir: Path.resolve(AppMode.src.dir),
            filterExt: [".js", ".jsx", ".ts", ".tsx"],
            filter: x => x.indexOf(".spec.") > 0 || x.indexOf(".test.") > 0
          }).length > 0;
      }

      if (!runJest) {
        const { roots } = archetype.jest;
        runJest = roots && roots.length > 0;
      }

      if (runJest) {
        makeBabelRc(Path.join(testDir, "client"), "babelrc-client.js");
        logger.info("Running jest unit tests");
        return mkCmd(`~$jest`, `--config ${archetype.config.jest}/jest.config.js`);
      } else {
        return undefined;
      }
    },
    "test-frontend-dev": ["?.karma.test-frontend-dev"],

    "test-frontend-dev-watch": ["?.karma.test-frontend-dev-watch"],

    "test-server-cov": () => {
      if (shell.test("-d", "test/server")) {
        AppMode.setEnv(AppMode.src.dir);
        return mkCmd(
          `~$istanbul cover --include-all-sources --root src/server`,
          `--report text --report lcov node_modules/mocha/bin/_mocha`,
          `-- -c --opts`,
          quote(mochaConfig("mocha.opts")),
          `test/server`
        );
      }
      return undefined;
    },

    "test-server-dev": () => {
      if (shell.test("-d", "test/server")) {
        AppMode.setEnv(AppMode.src.dir);
        return mkCmd(`~$mocha -c --opts`, quote(mochaConfig("mocha.opts")), `test/server`);
      }
      return undefined;
    },

    "build-analyze": {
      dep: [".optimize-stats"],
      desc: "Build your app's client bundle for production and run bundle analyzer",
      task: ["build-dist", "optimize-stats"]
    },
    "critical-css": {
      desc: "Start server and run penthouse to output critical CSS",
      task: inlineCriticalCSS
    },
    "generate-service-worker": {
      desc:
        "Generate Service Worker using the options provided in the app/config/sw-precache-config.json " +
        "file for prod/dev mode",
      task: () => generateServiceWorker()
    },
    "optimize-stats": {
      desc: "Generate a list of all files that went into production bundle JS (results in .etmp)",
      task: () => {
        const stats = JSON.parse(Fs.readFileSync("dist/server/stats.json"));

        for (const chunk in stats.assetsByChunkName) {
          if (!chunk.includes("styles")) {
            const bundle = stats.assetsByChunkName[chunk].find(
              x => x.endsWith(".js") && x.includes("bundle")
            );
            if (bundle) {
              if (!Fs.existsSync(`.etmp.${chunk}`)) {
                Fs.mkdirSync(`.etmp.${chunk}`);
              }
              exec(
                `analyze-bundle -b dist/js/${bundle} -s dist/server/stats.json --d .etmp.${chunk}`
              );
            }
          }
        }
        return;
      }
    },
    pwa: {
      desc: "PWA must have dist by running `clap build` first and then start the app server only.",
      task: ["build", "server"]
    },
    initflow: {
      desc: "Initiate Flow for type checker",
      task: mkCmd(`flow init`)
    },
    "flow-typed-install": {
      desc: "Install flow 3rd-party interface library definitions from flow-typed repo.",
      task: mkCmd(`flow-typed install --packageDir ${archetype.devDir}`)
    }
  };

  if (AppMode.isSrc) {
    tasks = Object.assign(tasks, {
      ".clean.lib": () =>
        shell.rm("-rf", AppMode.lib.client, AppMode.lib.server, AppMode.savedFile),
      ".build-lib:app-mode": () =>
        Fs.writeFileSync(Path.resolve(AppMode.savedFile), JSON.stringify(AppMode, null, 2)),
      ".build-lib": {
        desc: false,
        dep: [".clean.lib", ".mk-prod-dir"],
        task: ["build-lib:all", ".build-lib:app-mode"]
      }
    });
  }

  if (Fs.existsSync(Path.resolve(AppMode.src.client, "dll.config.js"))) {
    Object.assign(tasks, {
      "build-dist-dll": {
        dep: [".mk-dll-dir", ".mk-dist-dir", ".production-env"],
        task: () =>
          exec(
            `webpack --config`,
            quote(webpackConfig("webpack.config.dll.js")),
            `--colors`,
            `--display-error-details`
          )
      },
      "copy-dll": () => shell.cp("-r", "dll/*", "dist")
    });
  }

  if (archetype.options.karma !== false) {
    Object.assign(tasks, {
      ".karma.test-frontend": mkCmd(`karma start`, quote(karmaConfig("karma.conf.js")), `--colors`),

      ".karma.test-frontend-ci": {
        dep: [setKarmaCovEnv],
        task: mkCmd(`karma start`, quote(karmaConfig("karma.conf.coverage.js")), `--colors`)
      },

      ".karma.test-frontend-cov": {
        dep: [setKarmaCovEnv],
        task: () => {
          if (shell.test("-d", "test")) {
            logger.info("\nRunning Karma unit tests:\n");
            return mkCmd(`~$karma start`, quote(karmaConfig("karma.conf.coverage.js")), `--colors`);
          }
          return undefined;
        }
      },

      ".karma.test-frontend-dev": () =>
        exec(`pgrep -fl "webpack-dev-server.*${archetype.webpack.testPort}"`)
          .then(() => exec(`karma start`, quote(karmaConfig("karma.conf.dev.js")), `--colors`))
          .catch(() => `test-frontend`),

      ".karma.test-frontend-dev-watch": mkCmd(
        `karma start`,
        quote(karmaConfig("karma.conf.watch.js")),
        `--colors --browsers Chrome --no-single-run --auto-watch`
      )
    });
  } else {
    logger.info("Disabling karma test tasks since archetype config options.karma === false");
  }

  return tasks;
}

module.exports = function(xclap) {
  setupPath();
  createElectrodeTmpDir();
  xclap = xclap || requireAt(process.cwd())("xclap") || devRequire("xclap");
  process.env.FORCE_COLOR = "true"; // force color for chalk
  xclap.load("electrode", makeTasks(xclap));
  warnYarn();
};
