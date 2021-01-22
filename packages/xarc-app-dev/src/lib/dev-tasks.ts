import { XarcOptions } from "../config/opt2/xarc-options";
import { getDevAdminPortFromEnv } from "./utils";
/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable object-shorthand, max-statements, no-magic-numbers */
/* eslint-disable no-console, no-process-exit, global-require, no-param-reassign */

const Fs = require("fs");
const Path = require("path");
const assert = require("assert");
const requireAt = require("require-at");
const optionalRequire = require("optional-require")(require);
const xclap = require("xclap");
const getDevOptions = require("../config/archetype");
const ck = require("chalker");
const xaa = require("xaa");
const { psChildren } = require("ps-get");
const optFlow = optionalRequire("electrode-archetype-opt-flow");
const { getWebpackStartConfig, setWebpackProfile } = require("@xarc/webpack/lib/util/custom-check");
const chokidar = require("chokidar");
const { spawn } = require("child_process");
const scanDir = require("filter-scan-dir");

const xsh = require("xsh");
const logger = require("./logger");
import { createGitIgnoreDir } from "./utils";
import { jestTestDirectories } from "./tasks/constants";
import { eslintTasks } from "./tasks/eslint";

export { xclap };

let xarcCwd: string;

/**
 * Get the webpack's CLI command from @xarc/webpack
 *
 * @returns webpack's CLI command
 */
function webpackCmd() {
  const cmd = "xarc-webpack-cli";
  // This command comes from my dependency @xarc/webpack, so the package manager should either
  // installed it in my node_modules /.bin or hoisted it to the top level node_modules/.bin
  const exactCmd = Path.join(__dirname, "..", "node_modules", ".bin", cmd);
  return Fs.existsSync(exactCmd) ? Path.relative(xarcCwd, exactCmd) : cmd;
}

function quote(str) {
  return str.startsWith(`"`) ? str : `"${str}"`;
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

function setWebpackDev() {
  process.env.WEBPACK_DEV = "true";
}

export { XarcOptions } from "../config/opt2/xarc-options";

/**
 * Get the dev task runner (xclap) from Electrode module's perspective.
 *
 * @param cwd - current working dir for your app - default to `process.cwd()`
 *
 * @returns the instance of xclap that's required
 */
export const getDevTaskRunner = (cwd: string = process.cwd()) => {
  return requireAt(cwd)("xclap") || require("xclap");
};

/**
 * Load xarc development tasks that can be invoked using @xarc/run
 *
 * You can override any of the tasks here by loading your own using the same
 * name with a different namespace (ie: "user").
 *
 * **For example:**
 *
 * ```js
 * import { getDevTaskRunner, loadXarcDevTasks } from "@xarc/app-dev/lib/dev-tasks"
 *
 * const xclap = getDevTaskRunner();
 *
 * xclap.load("user", {
 *   check: xclap.exec("echo my custom check task")
 * });
 *
 * loadXarcDevTasks();
 * ```
 *
 * @param  xrun - `@xarc/run` (or xclap) task runner.  pass `null` and an
 *   internal version will be used.
 * @param  userOptions user provided options to configure features etc
 *
 * @returns The xclap task runner instance that was used.
 */
export function loadXarcDevTasks(xrun, userOptions: XarcOptions = {}) {
  let xarcOptions = getDevOptions(userOptions);
  xarcCwd = xarcOptions.cwd;

  function setupPath() {
    const nmBin = Path.join("node_modules", ".bin");
    xsh.envPath.addToFront(Path.resolve(xarcCwd, nmBin));
    xsh.envPath.addToFront(Path.join(xarcOptions.devDir, nmBin));
  }

  setupPath();

  const mergeIsomorphicAssets = require(`../scripts/merge-isomorphic-assets.js`);
  const flattenMessagesL10n = require(`../scripts/l10n/flatten-messages.js`);
  const mapIsomorphicCdn = require(`../scripts/map-isomorphic-cdn.js`);

  const config = xarcOptions.config;
  const karmaConfig = file => Path.join(config.karma, file);
  const mochaConfig = file => Path.join(config.mocha, file);

  const shell = xsh.$;
  const exec = xsh.exec;
  const mkCmd = xsh.mkCmd;

  const penthouse = optionalRequire("penthouse");
  const CleanCSS = optionalRequire("clean-css");

  const watchExec = (files: string | string[], cmd) => {
    let timer;
    let child;
    const defer = xaa.makeDefer();
    const doExec = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        timer = undefined;
        const run = msg => {
          child = true;
          console.log(`${msg} '${cmd}'`);
          const ch = spawn(cmd, { shell: true, stdio: "inherit" });
          ch.on("close", () => {
            if (child === "restart") {
              run("Restarting");
            } else {
              defer.resolve();
            }
          });
          child = ch;
        };
        if (!child) {
          run("Running");
        } else if (child.kill && child.pid) {
          const ch = child;
          child = "restart";
          (await psChildren(ch.pid)).reverse().forEach(c => process.kill(c.pid));
          ch.kill();
        }
      }, 500);
    };
    const watcher = chokidar.watch([].concat(files));
    watcher.on("change", doExec);
    doExec();
    return defer.promise;
  };

  // By default, the dev proxy server will be hosted from PORT (3000)
  //  and the app from APP_SERVER_PORT (3100).
  //  If the APP_SERVER_PORT is set to the empty string however,
  //  leave it empty and therefore disable the dev proxy server.
  if (!process.env.APP_SERVER_PORT && process.env.APP_SERVER_PORT !== "") {
    process.env.APP_SERVER_PORT = "3100";
  }

  const eTmpDir = xarcOptions.eTmpDir;

  function removeLogFiles() {
    try {
      Fs.unlinkSync(Path.resolve(xarcCwd, "archetype-exceptions.log"));
    } catch (e) {} // eslint-disable-line

    try {
      Fs.unlinkSync(Path.resolve(xarcCwd, "archetype-debug.log"));
    } catch (e) {} // eslint-disable-line
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
    const statsPath = Path.resolve(xarcCwd, "dist/server/stats.json");
    const stats = JSON.parse(Fs.readFileSync(statsPath));
    const cssAsset = stats.assets.find(asset => asset.name.endsWith(".css"));
    const cssAssetPath = Path.resolve(xarcCwd, `dist/js/${cssAsset.name}`);
    const targetPath = Path.resolve(xarcCwd, "dist/js/critical.css");
    const serverPromise = require(Path.resolve(
      xarcCwd,
      `${xarcOptions.AppMode.src.server}/index.js`
    ))();
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

  function startAppServer(argFlags = []) {
    argFlags = argFlags || [];
    const x = argFlags.length > 0 ? ` with options: ${argFlags.join(" ")}` : "";
    logger.info(`Starting app server${x}`);
    logger.info("To terminate press Ctrl+C.");
    xarcOptions.AppMode.setEnv(xarcOptions.AppMode.lib.dir);
    return exec(`node`, argFlags, Path.join(xarcOptions.AppMode.lib.server, "index.js"));
  }

  function generateBrowsersListRc() {
    const configRcFile = ".browserslistrc";
    const destRcFile = Path.resolve(xarcCwd, configRcFile);

    if (Fs.existsSync(destRcFile)) {
      return;
    }

    // generate the config
    Fs.writeFileSync(
      destRcFile,
      `# Browsers that we support
last 2 versions
ie >= 11
> 5%
`
    );
    logger.info(`Generating ${configRcFile} for you - please commit it.`);
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

  // eslint-disable-next-line complexity
  function makeTasks(xclap2) {
    assert(xclap2.concurrent, "xclap version must be 0.2.28+");
    process.env.ENABLE_KARMA_COV = "false";

    const checkFrontendCov = (minimum = "5") => {
      if (typeof minimum !== "string") {
        minimum = "5";
      }
      return exec(
        `nyc check-coverage --temp-dir "coverage/client" --branches ${minimum} --lines ${minimum} --functions ${minimum} --statements ${minimum} --per-file`
      );
    };

    const optimizeModuleForProd = module => {
      const modulePath = Path.resolve(xarcCwd, "node_modules", module);
      assert(shell.test("-d", modulePath), `${modulePath} is not a directory`);
      createGitIgnoreDir(
        Path.resolve(xarcCwd, xarcOptions.prodModulesDir),
        "Electrode production modules dir"
      );
      const prodPath = Path.join(xarcOptions.prodModulesDir, module);
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

    const makeBabelConfig = (destDir, rcFile, resultFile = "babel.config.js") => {
      destDir = Path.resolve(xarcCwd, destDir);

      const files = [".babelrc.js", resultFile];

      if (!Fs.existsSync(destDir) || files.find(file => Fs.existsSync(Path.join(destDir, file)))) {
        return;
      }

      const newName = Path.join(destDir, resultFile);

      console.log(ck`<orange>Generating <cyan>${newName}</> for you - please commit it.</>`);
      Fs.writeFileSync(
        newName,
        `"use strict";
module.exports = {
  extends: "@xarc/app-dev/config/babel/${rcFile}"
};
`
      );
    };

    const AppMode = xarcOptions.AppMode;

    const babelCliIgnore = quote(
      [...jestTestDirectories.map(dir => `**/${dir}`), `**/*.spec.js`, `**/*.spec.jsx`]
        .concat(xarcOptions.babel.enableTypeScript && [`**/*.test.ts`, `**/*.test.tsx`])
        .concat(`**/.__dev_hmr`)
        .filter(x => x)
        .join(",")
    );

    const babelCliExtensions = quote(
      [".js", ".jsx"]
        .concat(xarcOptions.babel.enableTypeScript && [".ts", ".tsx"])
        .filter(x => x)
        .join(",")
    );

    const babelEnvTargetsArr = Object.keys(xarcOptions.babel.envTargets).filter(k => k !== "node");

    const buildDistDirs = babelEnvTargetsArr
      .filter(name => name !== "default")
      .map(name => `dist-${name}`);

    let tasks = {
      ".mk-prod-dir": () =>
        createGitIgnoreDir(Path.resolve(xarcCwd, xarcOptions.prodDir), "Electrode production dir"),
      ".mk-dist-dir": () => createGitIgnoreDir(Path.resolve(xarcCwd, "dist"), "Electrode dist dir"),
      ".mk-dll-dir": () => createGitIgnoreDir(Path.resolve(xarcCwd, "dll"), "Electrode dll dir"),
      ".production-env": () => {
        setProductionEnv();
        xarcOptions = getDevOptions(userOptions); // re-evaluate options
      },
      ".development-env": () => {
        setDevelopmentEnv();
        xarcOptions = getDevOptions(userOptions); // re-evaluate options
      },
      ".webpack-dev": () => {
        setWebpackDev();
        xarcOptions = getDevOptions(userOptions); // re-evaluate options
      },
      ".static-files-env": () => setStaticFilesEnv(),
      ".remove-log-files": () => removeLogFiles(),
      build: {
        dep: [".remove-log-files", ".production-env"],
        desc: `Build your app's ${AppMode.src.dir} directory into ${AppMode.lib.dir} for production`,
        task: [".build-lib", "build-dist", ".check.top.level.babelrc", "mv-to-dist"]
      },

      //
      // browser coverage
      //
      ".build-browser-coverage-1": () => {
        setProductionEnv();
        setWebpackProfile("browsercoverage");
        return exec(
          `${webpackCmd()}`,
          `--config`,
          quote(getWebpackStartConfig("webpack.config.browsercoverage.js")),
          `--colors`
        );
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
        ".clean.build",
        ".mk-dist-dir",
        ".copy-xarc-options-to-dist",
        "build-dist-dll",
        "build-dist-min",
        "build-dist:flatten-l10n",
        "build-dist:merge-isomorphic-assets",
        "copy-dll",
        "build-dist:clean-tmp"
      ],

      ".copy-xarc-options-to-dist": () => shell.cp(Path.join(eTmpDir, "xarc-options.json"), "dist"),

      "mv-to-dist": ["mv-to-dist:clean", "mv-to-dist:mv-dirs", "mv-to-dist:keep-targets"],
      "build-dist-dev-static": {
        desc: false,
        task: function() {
          setWebpackProfile("static");
          return mkCmd(
            `~$${webpackCmd()} --config`,
            quote(getWebpackStartConfig("webpack.config.dev.static.js")),
            `--colors`,
            `--display-error-details`
          );
        }
      },

      ".ss-prod-react": () => optimizeModuleForProd("react"),
      ".ss-prod-react-dom": () => optimizeModuleForProd("react-dom"),
      ".ss-clean.prod-react": () => {
        shell.rm(
          "-rf",
          Path.join(xarcOptions.prodModulesDir, "react"),
          Path.join(xarcOptions.prodModulesDir, "react-dom")
        );
      },
      "ss-prod-react": {
        desc: `Make optimized copy of react&react-dom for server side in dir ${xarcOptions.prodModulesDir}`,
        dep: [".ss-clean.prod-react", ".mk-prod-dir"],
        task: xclap2.concurrent(".ss-prod-react", ".ss-prod-react-dom")
      },

      "build-dist-dll": () => undefined,
      "copy-dll": () => undefined,

      "build-dist-min": {
        dep: [".production-env", () => setWebpackProfile("production")],
        desc: "build dist for production",
        task: xclap2.concurrent(
          babelEnvTargetsArr.map((name, index) =>
            xclap2.exec(
              [
                `${webpackCmd()} --config`,
                quote(getWebpackStartConfig("webpack.config.js")),
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
              dir: Path.resolve(xarcCwd, dir),
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
            // add `targets` field to `dist-X/isomorphic-assets.json`
            const isomorphicPath = Path.resolve(xarcCwd, dir, "isomorphic-assets.json");
            if (Fs.existsSync(isomorphicPath)) {
              Fs.readFile(isomorphicPath, { encoding: "utf8" }, (err, data) => {
                if (err) throw err;
                const assetsJson = JSON.parse(data);
                const { envTargets } = xarcOptions.babel;
                assetsJson.targets = envTargets[dir.split("-")[1]];
                // eslint-disable-next-line no-shadow
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
        if (xarcOptions.checkUserBabelRc() !== false) {
          logger.error(`
  You are using src for client & server, archetype will ignore your top level .babelrc
  Please remove your top level .babelrc file if you have no other use of it.
  Individual .babelrc files were generated for you in src/client and src/server
  `);
        }
      },

      ".clean.lib:client": () => shell.rm("-rf", AppMode.lib.client),
      ".mk.lib.client.dir": () => {
        createGitIgnoreDir(
          Path.resolve(xarcCwd, AppMode.lib.client),
          `Electrode app transpiled code from ${AppMode.src.client}`
        );
      },

      ".build.babelrc": () => {
        makeBabelConfig(xarcCwd, "babelrc.js");
      },

      ".build-lib:delete-babel-ignored-files": {
        desc: false,
        task: () => {
          const scanned = scanDir.sync({
            dir: Path.resolve(xarcCwd, AppMode.lib.dir),
            includeRoot: true,
            includeDir: true,
            grouping: true,
            filterDir: x => (x === `.__dev_hmr` && "dirs") || "otherDirs",
            filter: (x, p) =>
              x.indexOf(".spec.") > 0 || x.indexOf(".test.") > 0 || p === `.__dev_hmr`
          });
          scanned.files.forEach(f => {
            try {
              Fs.unlinkSync(f);
            } catch (err) {
              //
            }
          });
          [].concat(scanned.dirs, scanned.otherDirs).forEach(d => {
            try {
              if (d) Fs.rmdirSync(d);
            } catch (err) {
              // ignore
            }
          });
        }
      },

      "build-lib:all": {
        desc: false,
        dep: [
          ".clean.lib:client",
          ".clean.lib:server",
          ".mk.lib.client.dir",
          ".mk.lib.server.dir",
          ".build.babelrc"
        ],
        task: xclap2.exec(
          [
            `babel ${AppMode.src.dir}`,
            `--out-dir=${AppMode.lib.dir}`,
            `--extensions=${babelCliExtensions}`,
            `--source-maps=inline --copy-files`,
            `--verbose --ignore=${babelCliIgnore}`
          ],
          { env: { XARC_BABEL_TARGET: "node" } }
        ),
        finally: [".build-lib:delete-babel-ignored-files"]
      },

      // TODO: to be removed
      "build-lib:client": {
        desc: false,
        dep: [".clean.lib:client", ".mk.lib.client.dir"],
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
          Path.resolve(xarcCwd, AppMode.lib.server),
          `Electrode app transpiled code from ${AppMode.src.server}`
        );
      },

      // TODO: to be removed
      "build-lib:server": {
        desc: false,
        dep: [".clean.lib:server", ".mk.lib.server.dir"],
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

      check: ["lint", "test-cov"],
      "check-ci": ["lint", "test-ci"],
      "check-cov": ["lint", "test-cov"],
      "check-dev": ["lint", "test-dev"],

      clean: [".clean.dist", ".clean.lib", ".clean.prod", ".clean.etmp", ".clean.dll"],
      ".clean.dist": () => shell.rm("-rf", "dist", ...buildDistDirs),
      ".clean.lib": () => undefined, // to be updated below for src mode
      ".clean.prod": () => shell.rm("-rf", xarcOptions.prodDir),
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
      "mock-cloud": {
        desc: `Run app locally like it's deployed to cloud with CDN mock and HTTPS proxy.
        - You must run clap build first and set env vars like HOST, PORT yourself.
        - NODE_ENV is set to 'production' if it's not set.
        - options: [all options will be passed to node when starting your app server]`,
        task(context) {
          xclap.updateEnv({ NODE_ENV: "production" }, { override: false });

          const mockTask = xclap2.concurrent([
            "dev-proxy --mock-cdn --no-dev",
            xclap2.serial(
              () => xaa.delay(500),
              () =>
                watchExec(
                  ["config/assets.json", "lib/server"],
                  `node ${context.args.join(" ")} lib/server`
                )
            )
          ]);

          if (!Fs.existsSync("dist")) {
            console.log("dist does not exist, running build task first.");
            return xclap2.serial(
              "build",
              () => console.log("build completed, starting mock prod mode with proxy"),
              mockTask
            );
          }

          return xclap2.serial(() => console.log("dist exist, skipping build task"), mockTask);
        }
      },

      "setup-dev": {
        desc: `Setup development related options for your application. \
You only need to run this if you are doing something not through the xarc tasks.`,
        dep: [".webpack-dev", ".development-env"],
        task() {
          console.log(`xarc dev options configured.`);
        }
      },

      dev: {
        desc: `Start your app with watch in development mode with dev-admin.
        options: node.js --inspect can be used to debug the dev-admin`,
        dep: [".remove-log-files", ".development-env", ".build.babelrc"],
        task() {
          return [
            ".webpack-dev",
            [`server-admin ${this.args.join(" ")}`, "generate-service-worker"]
          ];
        }
      },

      hot: {
        desc: "Start app dev with hot reload enabled",
        task: () => {
          xarcOptions.webpack.enableHotModuleReload = true;
          return "dev";
        }
      },

      "dev-static": {
        desc: "Start server in development mode with statically built files",
        task: ["build-dev-static", "app-server"]
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
        Fs.writeFileSync(Path.resolve(xarcCwd, eTmpDir, "bundle.valid.log"), `${Date.now()}`),

      "server-admin": {
        desc: "Start development with admin server",
        task(context) {
          setWebpackProfile("development");
          AppMode.setEnv(AppMode.src.dir);
          // eslint-disable-next-line no-shadow
          const exec = quote(Path.join(xarcOptions.devDir, "lib/babel-run"));
          const isNodeArgs = x => x.startsWith("--inspect");
          const nodeArgs = context.args.filter(isNodeArgs).join(" ");
          const otherArgs = context.args.filter(x => !isNodeArgs(x)).join(" ");

          // get user specified port for admin
          const userPort = getDevAdminPortFromEnv(xarcOptions.adminPort);
          const portArg = !otherArgs.includes("--port") && userPort ? `--port ${userPort}` : "";

          return mkCmd(
            `~(tty)$node`,
            nodeArgs,
            quote(Path.join(xarcOptions.devDir, "lib/dev-admin")),
            otherArgs,
            portArg,
            `--exec ${exec} --ext js,jsx,json,yaml,log,ts,tsx`,
            `--watch config ${AppMode.src.server}`,
            `-- ${AppMode.src.server}`
          );
        }
      },

      "server-admin.test": {
        desc: "Start development with admin server in test mode",
        task(context) {
          setWebpackProfile("test");
          AppMode.setEnv(AppMode.src.dir);
          // eslint-disable-next-line no-shadow
          const exec = quote(Path.join(xarcOptions.devDir, "lib/babel-run"));
          const isNodeArgs = x => x.startsWith("--inspect");
          const nodeArgs = context.args.filter(isNodeArgs);
          const otherArgs = context.args.filter(x => !isNodeArgs(x));
          return mkCmd(
            `~(tty)$node`,
            nodeArgs.join(" "),
            quote(Path.join(xarcOptions.devDir, "lib/dev-admin")),
            otherArgs.join(" "),
            `--exec ${exec} --ext js,jsx,json,yaml,log,ts,tsx`,
            `--watch config ${AppMode.src.server}`,
            `-- ${AppMode.src.server}`
          );
        }
      },

      "dev-proxy": {
        desc: `Start Electrode dev reverse proxy by itself - useful for running it with sudo.
        options: --debug --mock-cdn`,
        task(context) {
          const debug = context.argOpts.debug ? "--inspect-brk " : "";
          const proxySpawn = require.resolve("@xarc/app-dev/lib/dev-admin/redbird-spawn");
          return `~(tty)$node ${debug}${proxySpawn} ${context.args.join(" ")}`;
        }
      },

      "test-server": xclap2.concurrent(["lint-server", "lint-server-test"], "test-server-cov"),
      "test-watch-all": xclap2.concurrent("server-admin.test", "test-frontend-dev-watch"),

      "test-ci": ["test-frontend-ci"],
      "test-cov": [
        "?.karma.test-frontend-cov",
        "?.jest.test-frontend-cov",
        "test-server-cov"
      ].filter(x => x),
      "test-dev": ["test-frontend-dev", "test-server-dev"],

      "test-watch": ["test-watch-all"],

      "test-frontend": ["?.karma.test-frontend"],
      "test-frontend-ci": ["?.karma.test-frontend-ci"],
      "test-frontend-dev": ["?.karma.test-frontend-dev"],

      "test-frontend-dev-watch": ["?.karma.test-frontend-dev-watch"],

      "critical-css": {
        desc: "Start server and run penthouse to output critical CSS",
        task: () => {
          if (penthouse && CleanCSS) {
            inlineCriticalCSS();
          } else {
            const error =
              "Please ensure `options.criticalCSS = true` in your `archetype/config.js` or `archetype/config/index.js`, then reinstall your dependencies";
            throw new Error(`Missing Dependencies\n${error}`);
          }
        }
      },
      "generate-service-worker": {
        desc:
          "Generate Service Worker using the options provided in the app/config/sw-precache-config.json " +
          "file for prod/dev mode",
        task: () => generateServiceWorker()
      },
      pwa: {
        desc:
          "PWA must have dist by running `clap build` first and then start the app server only.",
        task: ["build", "server"]
      },

      "generate-browsers-listrc": {
        desc:
          "Generate .browserlistrc config file, it's used by Browserlist for AutoPrefixer/PostCSS",
        task: () => generateBrowsersListRc()
      }
    };

    if (xarcOptions.options.flow && optFlow) {
      const flowPkgDir = Path.dirname(require.resolve("electrode-archetype-opt-flow"));
      Object.assign(tasks, {
        initflow: {
          desc: "Initiate Flow for type checker",
          task: mkCmd(`flow init`)
        },
        "flow-typed-install": {
          desc: "Install flow 3rd-party interface library definitions from flow-typed repo.",
          task: mkCmd(`flow-typed install --packageDir ${flowPkgDir}`)
        }
      });
    }

    tasks = Object.assign(tasks, {
      ".clean.lib": () =>
        shell.rm("-rf", AppMode.lib.client, AppMode.lib.server, AppMode.savedFile),
      ".build-lib:app-mode": () =>
        Fs.writeFileSync(
          Path.resolve(xarcCwd, AppMode.savedFile),
          JSON.stringify(AppMode, null, 2)
        ),
      ".build-lib": {
        desc: false,
        dep: [".clean.lib", ".mk-prod-dir"],
        task: ["build-lib:all", ".build-lib:app-mode"]
      }
    });

    if (Fs.existsSync(Path.resolve(xarcCwd, AppMode.src.client, "dll.config.js"))) {
      Object.assign(tasks, {
        "build-dist-dll": {
          dep: [".mk-dll-dir", ".production-env"],
          task: () => {
            setWebpackProfile("dll");
            return exec(
              `${webpackCmd()} --config`,
              quote(getWebpackStartConfig("webpack.config.dll.js")),
              `--colors`,
              `--display-error-details`
            );
          }
        },
        "copy-dll": () => shell.cp("-r", "dll/*", "dist")
      });
    }

    Object.assign(tasks, eslintTasks(xarcOptions, xclap2));

    if (xarcOptions.options.karma) {
      const noSingleRun = process.argv.indexOf("--no-single-run") >= 0 ? "--no-single-run" : "";

      Object.assign(tasks, {
        ".karma.test-frontend": {
          desc: false,
          task: () => {
            setWebpackProfile("test");
            return mkCmd(
              `~$karma start`,
              quote(karmaConfig("karma.conf.js")),
              `--colors`,
              noSingleRun
            );
          }
        },

        ".karma.test-frontend-ci": {
          dep: [setKarmaCovEnv],
          task: () => {
            setWebpackProfile("coverage");
            return mkCmd(
              `~$karma start`,
              quote(karmaConfig("karma.conf.coverage.js")),
              `--colors`,
              noSingleRun
            );
          }
        },

        ".karma.test-frontend-cov": {
          dep: [setKarmaCovEnv],
          task: () => {
            setWebpackProfile("coverage");
            if (shell.test("-d", "test")) {
              logger.info("\nRunning Karma unit tests:\n");
              return mkCmd(
                `~$karma start`,
                quote(karmaConfig("karma.conf.coverage.js")),
                `--colors`,
                noSingleRun
              );
            }
            return undefined;
          }
        },

        ".karma.test-frontend-dev": ["test-frontend"],

        ".karma.test-frontend-dev-watch": () => {
          setWebpackProfile("test");
          return mkCmd(
            `~$karma start`,
            quote(karmaConfig("karma.conf.watch.js")),
            `--colors --browsers Chrome --no-single-run --auto-watch`,
            noSingleRun
          );
        }
      });
    } else {
      const karmaTasksDisabled = () => {
        logger.info(`Karma tests disabled because @xarc/opt-karma is not installed.
      Please add it to your devDependencies to enable running karma tests`);
      };
      Object.assign(tasks, {
        ".karma.test-frontend": karmaTasksDisabled,
        ".karma.test-frontend-ci": karmaTasksDisabled,
        ".karma.test-frontend-cov": karmaTasksDisabled,
        ".karma.test-frontend-dev": karmaTasksDisabled,
        ".karma.test-frontend-dev-watch": karmaTasksDisabled
      });
    }

    if (xarcOptions.options.jest) {
      Object.assign(tasks, {
        jest: {
          desc: "Run jest tests (--inspect-brk to start debugger)",
          task() {
            return `.jest.test-frontend-cov ${this.argv.slice(1).join(" ")}`;
          }
        },
        ".jest.test-frontend-cov"() {
          const testDir = jestTestDirectories.find(x => shell.test("-d", x));
          let runJest: any = testDir;
          if (!runJest) {
            const scanned = scanDir.sync({
              dir: Path.resolve(xarcCwd, AppMode.src.dir),
              grouping: true,
              includeDir: true,
              filterDir: d => (jestTestDirectories.indexOf(d) >= 0 ? "dirs" : "otherDirs"),
              filterExt: [".js", ".jsx", ".ts", ".tsx"],
              filter: x => x.indexOf(".spec.") > 0 || x.indexOf(".test.") > 0
            });

            runJest = Boolean(scanned.dirs || scanned.files.length > 0);
          }

          if (!runJest) {
            const { roots } = xarcOptions.jest;
            runJest = roots && roots.length > 0;
          }

          if (runJest) {
            const jestBinJs = require.resolve("jest/bin/jest");
            logger.info("Running jest unit tests");

            const brk = this.argv.indexOf("--inspect-brk") >= 0 ? "--inspect-brk" : "";
            const jestOpts = this.argv.slice(1).filter(x => x !== "--inspect-brk");

            return mkCmd(
              `~(tty)$node`,
              brk,
              jestBinJs,
              jestOpts.join(" "),
              `--config ${xarcOptions.config.jest}/jest.config.js`
            );
          } else {
            return undefined;
          }
        }
      });
    } else {
      Object.assign(tasks, {
        jest: () => {
          logger.info(`Running jest tests is not enabled because @xarc/opt-jest is not installed.
    Please add it to your devDependencies to enable running jest tests.`);
        }
      });
    }

    if (xarcOptions.options.mocha) {
      Object.assign(tasks, {
        "test-server-cov": () => {
          if (shell.test("-d", "test/server")) {
            AppMode.setEnv(AppMode.src.dir);
            return mkCmd(
              `~$nyc --all --cwd src/server`,
              `--reporter=text --reporter=lcov node_modules/mocha/bin/_mocha --opts`,
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
        }
      });
    } else {
      const mochaTestDisabled = () => {
        logger.info(`Running tests with mocha disabled because @xarc/opt-mocha is not installed
    Please add it to your devDependencies to enable running tests with mocha`);
      };
      Object.assign(tasks, {
        "test-server-cov": mochaTestDisabled,
        "test-server-dev": mochaTestDisabled
      });
    }

    return tasks;
  }

  // if (xarcOptions.assertDevArchetypePresent) {
  //   // make sure that -dev app archetype is also installed.
  //   // if it's not then this will fail with an error message that it's not found.
  //   require.resolve(`${archetype.devArchetypeName}/package.json`);
  // }

  xrun = xrun || getDevTaskRunner(xarcCwd);
  process.env._ELECTRODE_DEV_ = "1";
  if (!process.env.hasOwnProperty("FORCE_COLOR")) {
    process.env.FORCE_COLOR = "1"; // force color for chalk
  }

  xrun.load("electrode", makeTasks(xrun), -10);
  generateBrowsersListRc();

  return xrun;
}
