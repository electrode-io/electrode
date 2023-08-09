const baseConfig = require("@xarc/app-dev/config/jest/jest.config");

const coverageThreshold = {
  global: {
    branches: 0,
    functions: 0,
    lines: 0,
    statements: 0,
  },
};

const config = {
  ...baseConfig,
  coverageThreshold,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "json-summary", "text-summary", "text"],
  collectCoverageFrom: ["src/**/*.(ts|tsx|js|jsx)", "!src/server/index.(ts|js)"],
  coveragePathIgnorePatterns: [
    "\\.d.ts",
    ".snap",
    ".test",
    ".spec",
    "__tests__",
    "__mock-api__",
    "__dev_hmr",
    "subapp-manifest",
    "locales/*",
  ],
  reporters: ["default"],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'] 
};

module.exports = config;