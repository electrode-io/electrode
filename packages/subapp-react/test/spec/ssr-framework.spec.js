"use strict";

const url = require("url");
const React = require("react"); // eslint-disable-line
const lib = require("../../lib");
const { withRouter } = require("react-router");
const { Route, Switch } = require("react-router-dom"); // eslint-disable-line
const { asyncVerify } = require("run-verify");
const Redux = require("redux");
const { connect } = require("react-redux");

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

  it("should allow preparing data before SSR", async () => {
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
    await framework.handlePrepare();
    expect(framework._initialProps).to.be.ok;
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
  });

  it("should render Component with streaming if enabled", () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        prepare: () => ({ test: "foo bar" }),
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {},
      options: { serverSideRendering: true, streaming: true },
      context: {
        user: {}
      }
    });
    return asyncVerify(
      () => framework.handleSSR(),
      (stream, next) => {
        let res = "";
        stream.on("data", data => (res += data.toString()));
        stream.on("end", () => next(null, res));
        stream.on("error", next);
      },
      res => expect(res).contains("Hello foo bar")
    );
  });

  it("should hydrate render Component with streaming if enabled", () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        prepare: () => ({ test: "foo bar" }),
        Component: props => {
          return <div>Hello {props.test}</div>;
        }
      },
      subAppServer: {},
      options: { serverSideRendering: true, streaming: true, hydrateServerData: true },
      context: {
        user: {}
      }
    });
    return asyncVerify(
      () => framework.handleSSR(),
      (stream, next) => {
        let res = "";
        stream.on("data", data => (res += data.toString()));
        stream.on("end", () => next(null, res));
        stream.on("error", next);
      },
      res => expect(res).contains(`<div>Hello <!-- -->foo bar</div>`)
    );
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
    // data-reactroot isn't getting created due to Context.Provider
    // see https://github.com/facebook/react/issues/15012
    const res = await framework.handleSSR();
    // but the non-static renderToString adds a <!-- --> for some reason
    expect(res).contains("Hello <!-- -->foo bar");
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

  it("should init redux store and render Component", async () => {
    const Component = connect(x => x)(props => <div>Hello {props.test}</div>);

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        Component,
        reduxCreateStore: initState => Redux.createStore(x => x, initState),
        prepare: () => ({ test: "foo bar" })
      },
      subAppServer: {},
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
    expect(framework.initialStateStr).equals(`{"test":"foo bar"}`);
  });

  it("should init redux store and render Component but doesn't attach initial state", async () => {
    const Component = connect(x => x)(props => <div>Hello {props.test}</div>);

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        Component,
        reduxCreateStore: initState => Redux.createStore(x => x, initState),
        prepare: () => ({ test: "foo bar" })
      },
      subAppServer: { attachInitialState: false },
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello foo bar");
    expect(framework.initialStateStr).equals(undefined);
  });

  it("should init redux store but doesn't render Component if serverSideRendering is not true", async () => {
    const Component = connect(x => x)(props => <div>Hello {props.test}</div>);

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        Component,
        reduxCreateStore: initState => Redux.createStore(x => x, initState),
        prepare: () => ({ test: "foo bar" })
      },
      subAppServer: { attachInitialState: false },
      options: { serverSideRendering: false },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).equals("");
    expect(framework.initialStateStr).equals(undefined);
  });

  it("should init redux store with empty state without prepare and render Component", async () => {
    const Component = connect(x => x)(props => <div>Hello {props.test}</div>);

    const framework = new lib.FrameworkLib({
      subApp: {
        __redux: true,
        Component,
        reduxCreateStore: initState => Redux.createStore(x => x, initState)
      },
      subAppServer: {},
      options: { serverSideRendering: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello <");
    expect(framework.initialStateStr).equals(`{}`);
  });

  it("should hydrate render Component with suspense using react-async-ssr", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        Component: props => {
          return (
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <div>Hello {props.test}</div>
            </React.Suspense>
          );
        }
      },
      subAppServer: {
        prepare: () => ({ test: "foo bar" })
      },
      options: { serverSideRendering: true, suspenseSsr: true, hydrateServerData: true },
      context: {
        user: {}
      }
    });
    const res = await framework.handleSSR();
    // react-async-ssr includes data-reactroot
    expect(res).contains(`<div data-reactroot="">Hello <!-- -->foo bar</div>`);
  });

  it("should render Component with suspense using react-async-ssr", async () => {
    const framework = new lib.FrameworkLib({
      subApp: {
        Component: props => {
          return (
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <div>Hello {props.test}</div>
            </React.Suspense>
          );
        }
      },
      subAppServer: {
        prepare: () => ({ test: "foo bar" })
      },
      options: { serverSideRendering: true, suspenseSsr: true },
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

  it("should render subapp with react-router StaticRouter", async () => {
    const TestComponent = () => {
      return <div>Hello test path</div>;
    };
    const Component = withRouter(props => {
      return (
        <Switch>
          <Route path="/test" component={TestComponent} {...props} />
          <Route path="/foo" component={() => "bar"} {...props} />
        </Switch>
      );
    });
    const framework = new lib.FrameworkLib({
      subApp: {
        useReactRouter: true,
        Component
      },
      subAppServer: {
        prepare: () => ({ test: "foo bar" })
      },
      options: { serverSideRendering: true },
      context: {
        user: {
          request: { url: url.parse("http://localhost/test") }
        }
      }
    });
    const res = await framework.handleSSR();
    expect(res).contains("Hello test path<");
  });
});
