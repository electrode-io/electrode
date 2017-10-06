"use strict";

const installToolsItem = require("../../../lib/menu-items/install-tools");
const expect = require("chai").expect;

// TODO: add more tests

describe("menu-item install-tools", function() {
  it("should create menu item", () => {
    const mi = installToolsItem();
    expect(mi.emit).to.exist;
    expect(mi.icon).to.exist;
    expect(mi.execute).to.exist;
  });

  it("should prompt user to install if latest is newer", () => {});

  it("should not install if user answer no", () => {});

  it("should show congrat message if user already has latest", () => {});
});
