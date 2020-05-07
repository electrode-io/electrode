/* eslint-disable filenames/match-regex */

import { Component } from "../../src/Component";
import { expect } from "chai";

describe("Component", function () {
  it("should have isComponent and render method", () => {
    const x = new Component({});
    expect(x.isComponent()).to.equal(true);
    expect(x.render()).to.equal("component");
  });

  it("should allow instantiating with defaults", () => {
    const component = new Component();
    expect(component.props).to.deep.equal({});
    expect(component.context).to.deep.equal({});
    expect(component.isComponent()).to.equal(true);
  });

  it("should take passed in props and context", () => {
    const props = { a: 1 };
    const context = { b: 2 };
    const component = new Component(props, context);
    expect(component.props).to.deep.equal(props);
    expect(component.context).to.deep.equal(context);
    expect(component.isComponent()).to.equal(true);
  });
});
