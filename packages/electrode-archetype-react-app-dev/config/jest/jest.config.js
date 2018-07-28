"use strict";

const Path = require("path");
const fileMock = Path.join(__dirname, "__mocks__", "file-mock.js");
const frameworkMock = Path.join(__dirname, "__mocks__", "framework-mock.js");

const archetype = require("electrode-archetype-react-app/config/archetype");

const rootDir = process.cwd();

const jestDefaultConfig = {
  rootDir,
  resolver: require.resolve("electrode-node-resolver/lib/jest"),
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": fileMock,
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupTestFrameworkScriptFile: frameworkMock,
  modulePathIgnorePatterns: ["<rootDir>/test"],
  testURL: "http://localhost/"
};

module.exports = Object.assign({}, jestDefaultConfig, archetype.jest);
