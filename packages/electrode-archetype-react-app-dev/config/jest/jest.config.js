const Path = require("path");
const optionalRequire = require("optional-require")(require);

const rootDir = process.cwd();
const devPkgPath = Path.join(__dirname, "../..");

const jestPath = Path.join(devPkgPath, "config", "jest");
const fileMock = Path.join(jestPath, "__mocks__", "file-mock.js");
const frameworkMock = Path.join(jestPath, "__mocks__", "framework-mock.js");

const archetypeOptions = optionalRequire(Path.resolve("archetype", "config"), {
  default: {}
});

const jestDefaultConfig = {
  rootDir,
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": fileMock,
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupTestFrameworkScriptFile: frameworkMock,
  modulePathIgnorePatterns: ["<rootDir>/test"]
};

module.exports = Object.assign(
  {},
  jestDefaultConfig,
  archetypeOptions.jest
);
