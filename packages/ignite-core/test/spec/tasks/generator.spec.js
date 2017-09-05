"use strict";

const chalk = require("chalk");

const mockSpawn = require("mock-spawn");
const mySpawn = mockSpawn();
require("child_process").spawn = mySpawn;

const CLISpinner = require("cli-spinner").Spinner;
const spinner = new CLISpinner(chalk.green("%s"));
const testModule = require("../../../tasks/generator");

describe.skip("ignite-core:generator", function() {
  it("Start generator task on mac platform", function(done) {
    const originalPlatform = Object.getOwnPropertyDescriptor(
      process,
      "platform"
    );
    Object.defineProperty(process, "platform", {
      value: "mac"
    });

    testModule("oss", "fake", null, spinner).then(function() {
      Object.defineProperty(process, "platform", originalPlatform);
      done();
    });
  });
});
