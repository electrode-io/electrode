/* eslint-disable @typescript-eslint/no-var-requires, max-statements */

import Fs from "fs";
import Path from "path";
import { jestTestDirectories, allSourceDirs } from "./constants";
import { logger } from "../logger";
import makeOptionalRequire from "optional-require";

const optionalRequire = makeOptionalRequire(require);

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

function lint(options, xarcOptions) {
  const ext = options.ext ? ` --ext ${options.ext}` : "";

  const checkCustom = t => {
    const f = ["", ".json", ".yml", ".yaml", ".js"].find(e => {
      const x = Path.resolve(xarcOptions.cwd, Path.join(t, `.eslintrc${e}`));
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

  const ignorePattern = options.ignorePatterns
    ? options.ignorePatterns.map(p => `--ignore-pattern ${p}`)
    : "";

  const version = require("eslint/package.json")
    .version.split(".")
    .map(x => parseInt(x));
  const noUnmatchError = version[0] > 6 && version[1] > 8 ? ` --no-error-on-unmatched-pattern` : "";

  const commands = [
    grouped.custom.length > 0 &&
      `~$eslint${ext}${noUnmatchError} ${grouped.custom.join(" ")} ${ignorePattern}`,
    grouped.archetype.length > 0 &&
      `~$eslint${ext}${noUnmatchError} -c ${options.config} ${grouped.archetype.join(
        " "
      )} ${ignorePattern}`
  ];

  return Promise.resolve(commands.filter(x => x));
}

/**
 * return tasks to show eslint is not enabled
 */

function eslintDisabledTasks() {
  const lintDisabled = () => {
    logger.info(`eslint tasks are disabled because @xarc/opt-eslint is not installed.
  Please add it to your devDependencies to enable eslint.`);
  };
  return {
    lint: lintDisabled,
    "lint-server": lintDisabled,
    "lint-server-test": lintDisabled
  };
}

/**
 * Generate legacy tasks that were for eslint-4.0, messy, no JS config support etc
 */
export function eslint4Tasks(xarcOptions: any, xrun: any) {
  const AppMode = xarcOptions.AppMode;
  const tasks = {};

  const config = xarcOptions.config;
  const eslintConfig = file => Path.join(config.eslint, file);

  if (!xarcOptions.options.eslint) {
    return eslintDisabledTasks();
  }

  const hasTest = Fs.existsSync("test");
  const hasTestServer = Fs.existsSync("test/server");
  // legacy src/client and src/server only setup?
  let isLegacySrc = false;
  try {
    const files = Fs.readdirSync("src").filter(x => !x.startsWith("."));
    isLegacySrc = files.sort().join("") === "clientserver";
  } catch (err) {
    //
  }

  const lintTasks = [
    "lint-client",
    hasTest && "lint-client-test",
    "lint-server",
    hasTestServer && "lint-server-test"
  ].filter(x => x);

  Object.assign(tasks, {
    lint: xrun.concurrent(...lintTasks),

    "lint-client": {
      desc: "Run eslint on code in src/client and templates with react rules (ignore src/server)",
      task: () =>
        lint(
          {
            ext: ".js,.jsx,.ts,.tsx",
            config: eslintConfig(".eslintrc-react"),
            targets: isLegacySrc
              ? [AppMode.src.client, "templates"]
              : [AppMode.src.dir, "templates"],
            ignorePatterns: [AppMode.src.server]
          },
          xarcOptions
        )
    },

    "lint-server": {
      desc: "Run eslint on server code in src/server with node.js rules",
      task: () =>
        lint(
          {
            ext: ".js,.jsx,.ts,.tsx",
            config: eslintConfig(".eslintrc-node"),
            targets: [AppMode.src.server]
          },
          xarcOptions
        )
    }
  });

  if (hasTest) {
    tasks["lint-client-test"] = {
      desc: "Run eslint on code in test with react rules (ignore test/server)",
      task: () =>
        lint(
          {
            ext: ".js,.jsx,.ts,.tsx",
            config: eslintConfig(".eslintrc-react-test"),
            targets: ["test", ...jestTestDirectories.map(dir => `${dir}`)],
            ignorePatterns: ["test/server"]
          },
          xarcOptions
        )
    };
  }

  if (hasTestServer) {
    tasks["lint-server-test"] = {
      desc: "Run eslint on code in in test/server with node.js rules",
      task: () =>
        lint(
          {
            ext: ".js,.jsx,.ts,.tsx",
            config: process.env.SERVER_ES6
              ? eslintConfig(".eslintrc-mocha-test-es6")
              : eslintConfig(".eslintrc-mocha-test"),
            targets: ["test/server"]
          },
          xarcOptions
        )
    };
  }

  return tasks;
}

/**
 * Generate tasks for eslint-7.0
 */
export function eslint7Tasks(xarcOptions: any, xrun: any) {
  if (!xarcOptions.options.eslint) {
    return eslintDisabledTasks();
  }

  return {
    lint: {
      desc: `Run eslint for your sources - require setup .eslintrc.js`,
      task: () => {
        const validDirs = allSourceDirs
          .map(d => {
            const dir = Path.join(xarcOptions.cwd, d);
            try {
              const stat = Fs.statSync(dir);
              if (stat.isDirectory()) {
                return d;
              }
            } catch (err) {
              //
            }
            return "";
          })
          .filter(x => x)
          .join(" ");
        return xrun.exec(`eslint --ext .js,.ts,.jsx,.tsx ${validDirs}`);
      }
    }
  };
}

export function eslintTasks(xarcOptions: any, xrun: any) {
  //
  const xarcOptPkg = optionalRequire("@xarc/opt-eslint/package.json");
  if (xarcOptPkg) {
    const version = parseInt(xarcOptPkg.version.split(".")[0]);

    if (version >= 2) {
      return eslint7Tasks(xarcOptions, xrun);
    }
  }

  return eslint4Tasks(xarcOptions, xrun);
}
