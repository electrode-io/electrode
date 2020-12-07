export const jestTestDirectories = ["_test_", "_tests_", "__test__", "__tests__"];
export const appSourceDirs = ["src", "test"];
export const allSourceDirs = [].concat(appSourceDirs, jestTestDirectories);
export const serverOnlySourceDirs = ["src/server", "src/server-routes", "test/server"];
