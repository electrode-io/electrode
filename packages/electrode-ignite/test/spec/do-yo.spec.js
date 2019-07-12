"use strict";

const doYo = require("../../lib/do-yo");
const expect = require("chai").expect;
const childProcess = require("child_process");
const sinon = require("sinon");
const EventEmitter = require("events");
const { logger } = require("ignite-core");

describe("do-yo", function() {
  const testRun = (data, child, spawn) => {
    const spawnStub = sinon.stub(childProcess, "spawn").callsFake(spawn);
    const logs = [];
    const logStub = sinon.stub(logger, "log").callsFake(msg => logs.push(msg));
    const processExitStub = sinon.stub(process, "exit");
    doYo.run(data.generatorName, data.platform);
    child.emit("error", new Error("test"));
    expect(logs[0]).includes(`Running ${data.generatorName} generator failed: Error: test`);
    child.emit("exit", 1);
    expect(logs[1]).includes(
      `Generator: ${
        data.generatorName
      } failed with exit code 1. This could mean that it didn't generate your app properly. Please double check.`
    );
    child.emit("exit", 0);
    expect(logs[2]).includes(`Generator: ${data.generatorName} exited without any errors.`);
    spawnStub.restore();
    logStub.restore();
    processExitStub.restore();
  };

  it("should run spawn with local copy of yo on nix", () => {
    const child = new EventEmitter();
    const data = { platform: undefined, generatorName: "test" };
    return testRun(data, child, (path, args) => {
      expect(path).includes("electrode-ignite/node_modules/.bin/yo");
      expect(args).to.deep.equal(["test"]);
      return child;
    });
  });

  it("should run spawn with local copy of yo on win32", () => {
    const child = new EventEmitter();
    const data = { platform: "win32", generatorName: "test" };
    return testRun(data, child, (path, args) => {
      expect(path).to.equal("cmd");
      expect(args[0]).to.equal("/c");
      expect(args[1]).includes("yo.cmd");
      return child;
    });
  });

  it("should set generator name as generator-test", () => {
    const child = new EventEmitter();
    const data = { platform: undefined, generatorName: "generator-test" };
    return testRun(data, child, (path, args) => {
      expect(path).includes("electrode-ignite/node_modules/.bin/yo");
      expect(args).to.deep.equal(["generator-test"]);
      return child;
    });
  });

  it("should set generator name as @walmart/test", () => {
    const child = new EventEmitter();
    const data = { platform: undefined, generatorName: "@walmart/test" };
    return testRun(data, child, (path, args) => {
      expect(path).includes("electrode-ignite/node_modules/.bin/yo");
      expect(args).to.deep.equal(["@walmart/test"]);
      return child;
    });
  });
});
