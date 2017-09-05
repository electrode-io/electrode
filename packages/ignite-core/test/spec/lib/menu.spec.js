"use strict";

const rewire = require("rewire");
const chalk = require("chalk");
const assert = require("assert");
const sinon = require("sinon");
const readline = require("readline");

const logger = require("../../../lib/logger");
const testModule = rewire("../../../lib/menu");

function foo() {
  return process.exit(0);
}

describe("ignite-core: menu", function() {
  let loggerStub;
  let processStub;
  let sandbox;
  let consoleStub;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    loggerStub = sinon.stub(logger, "log");
    processStub = sinon.stub(process, "exit");
    consoleStub = sinon.stub(console, "log");
  });

  afterEach(function() {
    loggerStub.restore();
    processStub.restore();
    sandbox.restore();
    consoleStub.restore();
  });

  it("generateStars", function() {
    const generateStars = testModule.__get__("generateStars");
    assert.equal(
      generateStars(),
      `${chalk.green(" * ")}${chalk.magenta(" * ")}${chalk.green(
        " * "
      )}${chalk.magenta(" * ")}${chalk.green(" * ")}${chalk.magenta(" * ")}`
    );
  });

  it("createMenuBanner", function() {
    const createMenuBanner = testModule.__get__("createMenuBanner");
    assert.equal(
      createMenuBanner(),
      `${chalk.green(" * ")}${chalk.magenta(" * ")}${chalk.green(
        " * "
      )}${chalk.magenta(" * ")}${chalk.green(" * ")}${chalk.magenta(
        " * "
      )}${chalk.blueBright("Electrode Ignite Menu")}${chalk.green(
        " * "
      )}${chalk.magenta(" * ")}${chalk.green(" * ")}${chalk.magenta(
        " * "
      )}${chalk.green(" * ")}${chalk.magenta(" * ")}`
    );
  });

  it("createMenu", function() {
    const createMenu = testModule.__get__("createMenu");
    createMenu([]);
    sinon.assert.callCount(consoleStub, 4);
  });

  it("igniteMenu on install task", function() {
    const rl = function() {
      return {
        question: function(question, cb) {
          cb("1");
        },
        close: function() {}
      };
    };
    sandbox.stub(readline, "createInterface", rl);
    testModule("oss", foo, rl());
    loggerStub.calledWith(
      chalk.green("Checking your Electrode environment...")
    );
  });

  it("igniteMenu on invalid task", function() {
    const rl = function() {
      return {
        question: function(question, cb) {
          cb("0");
        },
        close: function() {}
      };
    };
    sandbox.stub(readline, "createInterface", rl);
    testModule("oss", foo, rl());
    loggerStub.calledWith(
      chalk.red("Please provide a valid option between 1 to 8.")
    );
  });
});
