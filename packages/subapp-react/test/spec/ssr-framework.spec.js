"use strict";

const url = require("url");
const React = require("react"); // eslint-disable-line
const lib = require("../../lib");
const { withRouter } = require("react-router");
const { Route, Switch } = require("react-router-dom"); // eslint-disable-line

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
