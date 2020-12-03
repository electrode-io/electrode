/* eslint-disable @typescript-eslint/no-var-requires */

const Path = require("path");
const _ = require("lodash");
const fileMock = Path.join(__dirname, "__mocks__", "file-mock.js");
const frameworkMock = Path.join(__dirname, "__mocks__", "framework-mock.js");
const { getOptArchetypeRequire } = require("../../lib/utils");
const optRequire = getOptArchetypeRequire(["@xarc/opt-jest", "electrode-archetype-opt-jest"]);

const jestPkg = optRequire("jest/package.json");
const jestMajVersion = parseInt(jestPkg.version.split(".")[0], 10);
// Jest changed its config setting for setup files on version 24
const SETUP_FILES_VERSION_SPLIT = 24;

import { loadXarcOptions } from "../../lib/utils";

const xarcOptions = loadXarcOptions();
const xarcCwd = xarcOptions.cwd;

const { enableTypeScript } = xarcOptions.babel;

// https://jestjs.io/docs/en/configuration.html#testregex-string
const scrTypes = enableTypeScript ? "jt" : "j";
const testRegex = `(/_?_tests?_?_/.*|(\\.|\/)(test|spec))\\.[${scrTypes}]sx?$`;

const rootDir = xarcCwd;

const jestDefaultConfig = {
  rootDir,
  resolver: require.resolve("electrode-node-resolver/lib/jest"),
  moduleFileExtensions: ["js", "jsx"].concat(enableTypeScript && ["ts", "tsx"]).filter(x => x),
  transform: enableTypeScript
    ? {
        "^.+\\.tsx?$": "babel-jest",
        "^.+\\.jsx?$": "babel-jest"
      }
    : undefined,
  testRegex,
  testPathIgnorePatterns: ["/node_modules/", "\\.babelrc.*"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": fileMock,
    "\\.(css|less|styl|sass|scss)$": "identity-obj-proxy"
  },
  modulePathIgnorePatterns: ["<rootDir>/test"],
  testURL: "http://localhost/"
};

const jestSetupFilesDeprecated = { setupTestFrameworkScriptFile: frameworkMock };
const jestSetupFilesNew = { setupFilesAfterEnv: [frameworkMock] };

const jestSetupFilesConfig =
  jestMajVersion >= SETUP_FILES_VERSION_SPLIT ? jestSetupFilesNew : jestSetupFilesDeprecated;

module.exports = _.merge(
  {},
  _.pickBy(jestDefaultConfig, x => x !== undefined),
  jestSetupFilesConfig,
  xarcOptions.jest
);
