"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const electrodeIgnite = rewire("../../cli/ignite");
const logger = require("ignite-core/lib/logger");
const chalk = require("chalk");
const pkg = require("../../package.json");

describe("electrode-ignite", function() {
  let loggerStub = "";

  beforeEach(function() {
    loggerStub = sinon.stub(logger, "log");
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it("when electrode-ignite is outdated, it should auto update.", function() {
    const igniteOutdated = electrodeIgnite.__get__("igniteOutdated");

    igniteOutdated("1.0.0");

    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.yellow(`You are currently in electrode-ignite@${pkg.version}. The latest version is 1.0.0.`)
    );
    assert.equal(
      loggerStub.getCalls()[1].args.toString(),
      chalk.yellow("Please hold, trying to update.")
    );
  });

  it("when electrode-ignite is up-to-date, it should prompt proper messages.", function() {
    const igniteUpToDate = electrodeIgnite.__get__("igniteUpToDate");

    igniteUpToDate("install", "0.1.0");

    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("You've aleady installed the latest electrode-ignite@0.1.0.")
    );
  });
});
