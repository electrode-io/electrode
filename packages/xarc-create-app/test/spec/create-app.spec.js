const shcmd = require("shcmd");
const { resolve } = require("path");
const { execSync } = require("child_process");
describe("create app", () => {
  beforeEach(() => {
    process.chdir(resolve(__dirname, "../../"));

    shcmd.mkdir("test/data/create-app-unit-test");
    process.chdir("test/data/create-app-unit-test");
  });

  afterEach(() => {
    process.chdir(resolve(__dirname, "../../"));

    execSync("rm -rf test/data/create-app-unit-test");
  });

  it("precondition: directory is created, and create app in cwd", () => {
    shcmd.exec("echo 'y' | node ../../../src/create-app");
  });
});
