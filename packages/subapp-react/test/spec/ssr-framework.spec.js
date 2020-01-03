"use strict";

const React = require("react"); // eslint-disable-line
const lib = require("../../lib");

describe("SSR React framework", function() {
  it("should setup React framework", () => {
    expect(lib.React).to.be.ok;
    expect(lib.AppContext).to.be.ok;
    expect(lib.FrameworkLib).to.be.ok;
    expect(lib.loadSubApp).to.be.a("function");
  });

  it("should not do SSR without component", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {},
      subAppServer: {},
      props: {}
    });
    const res = await framework.handleSSR();
    expect(res).contains("has no StartComponent");
  });

  it("should render Component from subapp with initial props from prepare", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        prepare: () => ({ test: "foo bar" }),
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {},
      props: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
  });

  it("should render Component from subapp with initial props from server's prepare", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {
        prepare: () => ({ test: "foo bar" })
      },
      props: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
  });
});
