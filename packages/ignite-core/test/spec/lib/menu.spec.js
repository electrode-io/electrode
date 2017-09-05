"use strict";

const rewire = require("rewire");
const chalk = require("chalk");
const assert = require("assert");
const sinon = require("sinon");

const testModule = rewire("../../../lib/menu");

describe("ignite-core: menu", function() {
  let loggerStub;

  beforeEach(function() {
    loggerStub = sinon.stub(console, "log");
  });

  afterEach(function() {
    loggerStub.restore();
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
    sinon.assert.callCount(loggerStub, 4);
  });
});
