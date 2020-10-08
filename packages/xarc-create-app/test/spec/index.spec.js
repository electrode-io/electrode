const expect = require("chai").expect;
const shcmd = require("shcmd");
const { resolve } = require("path");
const { execSync } = require("child_process");

describe("index", function () {
  it("creates directory and then app in it", function () {
    process.chdir(resolve(__dirname, "../data"));
    shcmd.exec("echo 'y' | node ../../src/index new-app");
    const output = shcmd.exec("ls new-app").stdout;

    expect(output).to.include("src");
    expect(output).to.include("package.json");
    expect(output).to.include("static");
    expect(output).to.include("xclap");
    execSync("rm -rf new-app");
    process.chdir("..");
  }).timeout(10000);
});
