const { expect } = require("chai");
const { runFinally, asyncVerify } = require("run-verify");
const checkDir = require("../../src/check-dir");
const shcmd = require("shcmd");
const { execSync } = require("child_process");

describe("checkDir", function () {
  const cwd = process.cwd();
  afterEach(() => {
    process.chdir(cwd);
  });

  it("checks if directory has existing files", function () {
    shcmd.mkdir("test/data/empty-dir");
    process.chdir("test/data/empty-dir");
    asyncVerify(
      () => checkDir(process.cwd()),
      ret => {
        expect(ret).to.equal(true);
      }
    );
    runFinally(() => {
      shcmd.rmdir("test/data/empty-dir");
    });
  });

  it("check non empty prompt", async function () {
    const output = execSync(
      `echo 'n' | node -e "require('./src/check-dir')('test/data')"`
    ).toString();
    expect(output).to.include("not empty");
  });
});
