/** @jsx h */

"use strict";

const { h } = require("preact"); // eslint-disable-line
const lib = require("../../lib");

const { expectErrorHas, asyncVerify } = require("run-verify");

describe("SSR Preact framework", function() {
  it("should setup React framework", () => {
    expect(lib.preact).to.be.ok;
    expect(lib.AppContext).to.be.ok;
    expect(lib.FrameworkLib).to.be.ok;
    expect(lib.loadSubApp).to.be.a("function");
  });

  it("should not do SSR without component", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {},
      subAppServer: {},
      options: {}
    });
    const res = await framework.handleSSR();
    expect(res).contains("has no StartComponent");
  });

  it("should not do SSR if serverSideRendering is not true", async () => {
    const framework = new lib.FrameworkLib({
      subApp: { Component: () => {} },
      subAppServer: {},
      options: { serverSideRendering: false }
    });
    const res = await framework.handleSSR();
    expect(res).equals("");
  });

  it("should render subapp with w/o initial props if no prepare provided", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {},
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello <");
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
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
  });

  it("should render Component from subapp with hydration info", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        prepare: () => ({
          test: "foo bar"
        }),
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {},
      options: {
        serverSideRendering: true,
        hydrateServerData: true
      },
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
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
  });

  it("should render Component with react context containing request", async () => {
    const request = {};
    const framework = new lib.FrameworkLib({
      subApp: {
        Component: () => {
          return (
            <lib.AppContext.Consumer>
              {({ isSsr, ssr }) => {
                ssr.request.foo = "bar";
                return (
                  <div>
                    IS_SSR: {`${Boolean(isSsr)}`} HAS_REQUEST: {ssr && ssr.request ? "yes" : "no"}
                  </div>
                );
              }}
            </lib.AppContext.Consumer>
          );
        }
      },
      subAppServer: {
        prepare: () => ({ test: "foo bar" })
      },
      options: { serverSideRendering: true },
      context: {
        user: { request }
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains(`<div>IS_SSR: true HAS_REQUEST: yes</div>`);
    expect(request.foo).equals("bar");
  });

  it("handlePrepare should throw error if trying to use react router", () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        useReactRouter: true
      },
      subAppServer: {}
    });
    return asyncVerify(
      expectErrorHas(
        async () => await framework.handlePrepare(),
        "react router is not yet supported"
      )
    );
  });

  it("handlePrepare should prepare redux data and store", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore() {
          return { testStore: true };
        }
      },
      subAppServer: {
        StartComponent: () => {},
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      }
    });

    const store = await framework.handlePrepare();
    expect(store.testStore).to.equal(true);
  });
});
