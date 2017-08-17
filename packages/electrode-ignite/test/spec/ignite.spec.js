"use strict";

const sinon = require("sinon");
const assert = require("assert");
const rewire = require("rewire");

const electrodeIgnite = rewire("../../cli/ignite");
const pkg = require("../../package.json");
const logger = require("ignite-core/lib/logger");
const chalk = require("chalk");

describe("electrode-ignite", function() {
  const pkgVersion = pkg.version;

  it("when electrode-ignite is outdated, it should auto update.", function(done) {
    const loggerStub = sinon.stub(logger, "log");
    pkg.version = "0.0.1";

    electrodeIgnite().then(function() {
      sinon.assert.callCount(loggerStub, 4);
      assert.equal(
        loggerStub.getCalls()[3].args.toString(),
        chalk.yellow("Please hold, trying to update.")
      );

      pkg.version = pkgVersion;
      loggerStub.restore();
      done();

    });
  });

  it("when electrode-ignite is up-to-date, it should prompt proper messages.", function() {
    const igniteUpToDate = electrodeIgnite.__get__("igniteUpToDate");
    const loggerStub = sinon.stub(logger, "log");

    igniteUpToDate("install");

    sinon.assert.callCount(loggerStub, 2);
    assert.equal(
      loggerStub.getCalls()[0].args.toString(),
      chalk.green("You've aleady installed the latest electrode-ignite.")
    );
  });
});
