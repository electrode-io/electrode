/* eslint-disable @typescript-eslint/no-var-requires */

const Path = require("path");
const _ = require("lodash");
const fileMock = Path.join(__dirname, "__mocks__", "file-mock.js");

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
  testEnvironmentOptions: {
    url: "http://localhost/"
}
};

export = _.merge(
  {},
  _.pickBy(jestDefaultConfig, x => x !== undefined),
  xarcOptions.jest
);
