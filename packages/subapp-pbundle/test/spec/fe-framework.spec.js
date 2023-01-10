"use strict";
/** @jsx h */

process.env.BABEL_ENV = "src-node";
const { h } = require("preact"); // eslint-disable-line
const feLib = require("../../src");
const { JSDOM } = require("jsdom");

describe("FE Preact framework", function () {
  afterEach(() => {
    delete global.window;
    delete global.document;
  });
  //
  it("should setup FrameworkLib", () => {
    expect(feLib.AppContext).to.be.ok;
    expect(feLib.loadSubApp).to.be.a("function");
    expect(feLib.FrameworkLib).to.be.ok;
  });

  it("should render component into DOM element", () => {
    const dom = new JSDOM(`<div id="test"></div>`);
    global.window = dom.window;
    global.document = dom.window.document;
    const element = dom.window.document.getElementById("test");
    const framework = new feLib.FrameworkLib({
      subApp: {
        info: {
          Component: props => <p>hello {props.foo}</p>
        }
      },
      element,
      options: { props: { foo: "bar" } }
    });
    framework.renderStart();
    expect(element.innerHTML).equals(`<p>hello bar</p>`);
  });

  it("should hydrate render component into DOM element", () => {
    const dom = new JSDOM(`<div id="test"><p>hello bar</p></div>`);
    global.window = dom.window;
    global.document = dom.window.document;
    const element = dom.window.document.getElementById("test");
    const framework = new feLib.FrameworkLib({
      subApp: {
        info: {
          Component: props => <p>hello {props.foo}</p>
        }
      },
      element,
      options: { props: { foo: "bar" }, serverSideRendering: true }
    });
    framework.renderStart();
    expect(element.innerHTML).equals(`<p>hello bar</p>`);
  });

  it("should just return the component without DOM element", () => {
    const Component = props => <p>hello {props.foo}</p>;

    const framework = new feLib.FrameworkLib({
      subApp: {
        info: { Component }
      },
      options: { props: { foo: "bar" }, serverSideRendering: true }
    });
    const c = framework.renderStart();
    expect(c.type).equals(Component);
  });
});
