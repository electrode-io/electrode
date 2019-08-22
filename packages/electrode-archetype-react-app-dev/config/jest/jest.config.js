"use strict";

const Path = require("path");
const _ = require("lodash");
const fileMock = Path.join(__dirname, "__mocks__", "file-mock.js");
const frameworkMock = Path.join(__dirname, "__mocks__", "framework-mock.js");
const { getOptArchetypeRequire } = require("../../lib/utils");
const optRequire = getOptArchetypeRequire("electrode-archetype-opt-jest");

const jestPkg = optRequire("jest/package.json");
const jestMajVersion = parseInt(jestPkg.version.split(".")[0], 10);

const archetype = require("electrode-archetype-react-app/config/archetype");

const { enableTypeScript } = archetype.babel;

// https://jestjs.io/docs/en/configuration.html#testregex-string
const scrTypes = enableTypeScript ? "jt" : "j";
const testRegex = `(/_?_tests?_?_/.*|(\\.|\/)(test|spec))\\.[${scrTypes}]sx?$`;

const rootDir = process.cwd();

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
    "\\.(css|less)$": "identity-obj-proxy"
  },
  modulePathIgnorePatterns: ["<rootDir>/test"],
  testURL: "http://localhost/"
};

const jestVersionSpecificConfig = {
  23: {
    setupTestFrameworkScriptFile: frameworkMock
  },
  24: {
    setupFilesAfterEnv: [frameworkMock]
  }
};

module.exports = _.merge(
  {},
  _.pickBy(jestDefaultConfig, x => x !== undefined),
  jestVersionSpecificConfig[jestMajVersion],
  archetype.jest
);
