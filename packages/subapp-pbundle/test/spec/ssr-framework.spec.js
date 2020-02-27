/** @jsx h */

"use strict";

const { h } = require("preact"); // eslint-disable-line
const lib = require("../../lib");
const { connect } = require("redux-bundler-preact");
const { composeBundles } = require("redux-bundler");

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

  const helloBundle = {
    name: "hello",
    reducer(state = "foo", action) {
      if (action.type === "UPDATE_STATE") {
        return action.newState;
      }
      return state;
    },
    doUpdateState: (newState) => ({ dispatch }) => {
      dispatch({ type: "UPDATE_STATE", newState });
    },
    selectHello(state) {
      return state.hello;
    }
  };

  it("handlePrepare should prepare redux data and store", async () => {
    let storeReady;

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return composeBundles(helloBundle)(initialState);
        },
        reduxStoreReady({ store }) {
          storeReady = store;
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });

    const store = await framework.handlePrepare();
    const html = await framework.handleSSR();
    expect(store.selectHello).to.be.ok;
    expect(storeReady).to.equal(store);
    expect(html).to.equal("test hello world");
  });

  it("handleSSR should prepare and realize redux data and store", async () => {
    let storeReady;

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return {
            realize() {
              return composeBundles(helloBundle)(initialState);
            }
          };
        },
        reduxStoreReady({ store }) {
          storeReady = store;
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });

    const html = await framework.handleSSR();
    const store = framework.store;
    expect(store.selectHello).to.be.ok;
    expect(storeReady).to.equal(store);
    expect(html).to.equal("test hello world");
  });

  it("should use empty default initial state if no prepare exist", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return composeBundles(helloBundle)(initialState);
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        })
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });

    const store = await framework.handlePrepare();
    const html = await framework.handleSSR();
    expect(framework.initialStateStr).to.equal("{}");
    expect(store.selectHello).to.be.ok;
    expect(html).to.equal("test hello foo");
  });

  it("should not attach initial state if attachInitialState is false", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return composeBundles(helloBundle)(initialState);
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        },
        attachInitialState: false
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });

    const store = await framework.handlePrepare();
    const html = await framework.handleSSR();
    expect(framework.initialStateStr).to.equal("");
    expect(store.selectHello).to.be.ok;
    expect(html).to.equal("test hello world");
  });

  it("should throw if unable to create redux store", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        name: "test",
        __redux: true
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });
    return asyncVerify(
      expectErrorHas(
        async () => await framework.handlePrepare(),
        "redux subapp test didn't provide store, reduxCreateStore, or redux bundles"
      )
    );
  });

  it("should skip SSR if serverSideRendering is not true", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return composeBundles(helloBundle)(initialState);
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: null }
    });

    const store = await framework.handlePrepare();
    const html = await framework.handleSSR();
    expect(framework.initialStateStr).to.equal(undefined);
    expect(store).to.equal(false);
    expect(html).to.equal("");
  });

  it("should use packReduxData to generate initial state if it exists", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        packReduxData: (store) => store.getState(),
        reduxStoreReady: ({ store }) => {
          store.doUpdateState("universe");
        },
        reduxCreateStore(initialState) {
          return {
            realize() {
              return composeBundles(helloBundle)(initialState);
            }
          };
        }
      },
      subAppServer: {
        StartComponent: connect("selectHello", ({ hello }) => {
          return `test hello ${hello}`;
        }),
        async prepare() {
          return { hello: "world" };
        }
      },
      context: {
        user: {}
      },
      options: { serverSideRendering: true }
    });

    await framework.handleSSR();
    expect(JSON.parse(framework.initialStateStr).hello).to.equal("universe");
  });

  it("should provide location prop to StartComponent", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        reduxCreateStore(initialState) {
          return composeBundles(helloBundle)(initialState);
        }
      },
      subAppServer: {
        StartComponent: ({ request }) => `path is: ${request.url.pathname}`
      },
      context: {
        user: {
          request: {
            url: {
              pathname: "somepath"
            }
          }
        }
      },
      options: { serverSideRendering: true }
    });

    const html = await framework.handleSSR();
    expect(html).to.equal("path is: somepath");
  });
});
