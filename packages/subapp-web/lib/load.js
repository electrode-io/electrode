"use strict";

/* eslint-disable max-statements, no-console, complexity */

const assert = require("assert");
const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const optionalRequire = require("optional-require")(require);
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const AsyncReactDOMServer = optionalRequire("react-async-ssr");
const request = require("request");
const util = require("./util");
const { loadSubAppByName, loadSubAppServerByName } = require("subapp-util");
const { default: AppContext } = require("../browser/app-context");

const ReactRedux = optionalRequire("react-redux", { default: {} });
const { Provider } = ReactRedux;

const ReactRouterDom = optionalRequire("react-router-dom");

module.exports = function setup(setupContext, token) {
  const props = token.props;

  // TODO: create JSON schema to validate props

  // name="Header"
  // async=true
  // defer=true
  // streaming=true
  // serverSideRendering=true
  // hydrateServerData=false
  // clientSideRendering=false
  // inlineScript=true

  // TODO: how to export and load subapp

  // TODO: Need a way to figure out all the subapps need for a page and send out script
  // tags ASAP in <header> so browser can start fetching them before entire page is loaded.

  const name = props.name;
  const routeData = setupContext.routeOptions.__internals;
  const bundleAsset = util.getSubAppBundle(name, routeData.assets);
  const bundleBase = util.getBundleBase(setupContext.routeOptions);
  const comment = process.env.NODE_ENV === "production" ? "\n" : `\n<!-- subapp load ${name} -->\n`;

  //
  // in webpack dev mode, we have to retrieve the subapp's JS bundle from webpack dev server
  // to inline in the index page.
  //
  const retrieveDevServerBundle = async () => {
    return new Promise((resolve, reject) => {
      request(`${bundleBase}${bundleAsset.name}`, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(`<script>/*${name}*/${body}</script>`);
        }
      });
    });
  };

  //
  // When loading a subapp and its instance in the index, user can choose
  // to inline the JS for the subapp's bundle.
  // - In production mode, we read its bundle from dist/js
  // - In webpack dev mode, we retrieve the bundle from webpack dev server every time
  //
  let inlineSubAppJs;

  const prepareSubAppJsBundle = () => {
    const webpackDev = process.env.WEBPACK_DEV === "true";

    if (props.inlineScript === "always" || (props.inlineScript === true && !webpackDev)) {
      if (!webpackDev) {
        // if we have to inline the subapp's JS bundle, we load it for production mode
        const src = Fs.readFileSync(Path.resolve("dist/js", bundleAsset.name)).toString();
        inlineSubAppJs = `<script>/*${name}*/${src}</script>`;
      } else {
        inlineSubAppJs = true;
      }
    } else {
      // if should inline script for webpack dev mode
      // make sure we retrieve from webpack dev server and inline the script later
      inlineSubAppJs = webpackDev && Boolean(props.inlineScript);
    }
  };

  //
  // do server side rendering for the subapp instance
  //
  const renderElement = element => {
    if (props.streaming) {
      assert(!props.suspenseSsr, "streaming and suspense SSR together are not supported");
      if (props.hydrateServerData) {
        return ReactDOMServer.renderToNodeStream(element);
      } else {
        return ReactDOMServer.renderToStaticNodeStream(element);
      }
    }

    if (props.suspenseSsr) {
      assert(AsyncReactDOMServer, "You must install react-async-ssr for suspense SSR support");
      if (props.hydrateServerData) {
        return AsyncReactDOMServer.renderToStringAsync(element);
      } else {
        return AsyncReactDOMServer.renderToStaticMarkupAsync(element);
      }
    }

    if (props.hydrateServerData) {
      return ReactDOMServer.renderToString(element);
    } else {
      return ReactDOMServer.renderToStaticMarkup(element);
    }
  };

  let subApp;
  let subAppServer;
  let StartComponent;
  let subAppLoadTime = 0;

  //
  // ensure that other bundles a subapp depends on are loaded
  //
  const prepareSubAppSplitBundles = async context => {
    const { assets, includedBundles } = context.user;
    const entryName = subApp.name.toLowerCase();
    //
    const entryPoints = assets.entryPoints[entryName];
    const cdnJsBundles = util.getCdnJsBundles(assets, setupContext.routeOptions);

    const bundles = entryPoints.filter(ep => !includedBundles[ep]);
    const splits = bundles
      .map(ep => {
        if (!inlineSubAppJs && !includedBundles[entryName]) {
          includedBundles[ep] = true;
          return (
            cdnJsBundles[ep] &&
            []
              .concat(cdnJsBundles[ep])
              .map(jsBundle => `<script src="${jsBundle}" async></script>`)
              .join("\n")
          );
        }
        return false;
      })
      .filter(x => x);

    if (inlineSubAppJs && !includedBundles[entryName]) {
      includedBundles[entryName] = true;
      if (inlineSubAppJs === true) {
        splits.push(await retrieveDevServerBundle());
      } else {
        splits.push(inlineSubAppJs);
      }
    }

    return { bundles, scripts: splits.join("\n") };
  };

  const loadSubApp = () => {
    subApp = loadSubAppByName(name);
    subAppServer = loadSubAppServerByName(name);
    StartComponent = subAppServer.StartComponent || subApp.Component;
  };

  loadSubApp();
  prepareSubAppJsBundle();

  const clientProps = JSON.stringify(_.pick(props, ["useReactRouter"]));

  return {
    process: context => {
      const req = context.user.request;

      if (req.app.webpackDev && subAppLoadTime < req.app.webpackDev.compileTime) {
        subAppLoadTime = req.app.webpackDev.compileTime;
        loadSubApp();
      }

      const outputSpot = context.output.reserve();
      // console.log("subapp load", name, "useReactRouter", subApp.useReactRouter);
      let rrContext;

      const createElement = (Component, initialProps) => {
        let TopComponent;
        if (subApp.useReactRouter) {
          rrContext = {};
          const rrProps = Object.assign(
            { location: req.url.pathname, context: rrContext },
            initialProps
          );
          // console.log("rendering", name, "for react router", rrProps);
          TopComponent = React.createElement(Component, rrProps);
        } else {
          // console.log("rendering without react router", name);
          TopComponent = React.createElement(Component, initialProps);
        }
        return React.createElement(
          AppContext.Provider,
          { value: { isSsr: true, subApp, ssr: { request: req } } },
          TopComponent
        );
      };

      const asyncProcess = async () => {
        if (props.timestamp) {
          outputSpot.add(`<!-- time: ${Date.now()} -->`);
        }

        let ssrContent = "";
        let initialStateStr = "";
        if (props.serverSideRendering) {
          // If subapp wants to use react router and server didn't specify a StartComponent,
          // then create a wrap StartComponent that uses react router's StaticRouter
          if (subApp.useReactRouter && !subAppServer.StartComponent) {
            assert(
              ReactRouterDom && ReactRouterDom.StaticRouter,
              `subapp ${subApp.name} specified useReactRouter without a StartComponent, \
and can't generate it because module react-dom-router with StaticRouter is not found`
            );
            StartComponent = props2 =>
              React.createElement(
                ReactRouterDom.StaticRouter,
                props2,
                React.createElement(subApp.Component)
              );
          }

          if (!StartComponent) {
            ssrContent = `<!-- serverSideRendering ${name} has no StartComponent -->`;
          } else if (subApp.__redux) {
            // subApp.reduxReducers || subApp.reduxCreateStore) {
            // if sub app has reduxReducers or reduxCreateStore then assume it's using
            // redux data model.  prepare initial state and store to render it.
            let reduxData;

            // see if app has a prepare callback, on the server side first, and then the
            // app itself, and call it.  assume the object it returns would contain the
            // initial redux state data.
            const prepare = subAppServer.prepare || subApp.prepare;
            if (prepare) {
              reduxData = await prepare({ request, context });
            }

            if (!reduxData) {
              reduxData = { initialState: {} };
            }

            const initialState = reduxData.initialState || reduxData;
            // if subapp didn't request to skip sending initial state, then stringify it
            // and attach it to the index html.
            if (subAppServer.attachInitialState !== false) {
              initialStateStr = JSON.stringify(initialState);
            }
            // next we take the initial state and create redux store from it
            const store =
              reduxData.store ||
              (subApp.reduxCreateStore && (await subApp.reduxCreateStore(initialState)));
            assert(
              store,
              `redux subapp ${subApp.name} didn't provide store, reduxCreateStore, or reducers`
            );
            if (props.serverSideRendering === true) {
              assert(Provider, "subapp-web: react-redux Provider not available");
              // finally render the element with Redux Provider and the store created
              ssrContent = await renderElement(
                React.createElement(Provider, { store }, createElement(StartComponent))
              );
            }
          } else if (props.serverSideRendering === true) {
            let initialProps;

            // even though we don't know what data model the component is using, but if it
            // has a prepare callback, we will just call it to get initial props to pass
            // to the component when rendering it
            const prepare = subAppServer.prepare || subApp.prepare;
            if (prepare) {
              initialProps = await prepare({ request, context });
            }

            try {
              ssrContent = await renderElement(createElement(StartComponent, initialProps));
            } catch (err) {
              console.log("rendering", name, "failed", err);
            }
          }
        } else {
          ssrContent = `<!-- serverSideRendering flag is ${props.serverSideRendering} -->`;
        }

        let markBundlesLoadedJs = "";
        const { bundles, scripts } = await prepareSubAppSplitBundles(context);
        outputSpot.add(`${comment}`);
        if (bundles.length > 0) {
          outputSpot.add(`${scripts}\n`);
          markBundlesLoadedJs = `markBundlesLoaded(${JSON.stringify(bundles)});\n`;
        }

        // If user specified an element ID for a DOM Node to host the SSR content then
        // add the div for the Node and the SSR content to it, and add JS to start the
        // sub app on load.
        if (props.elementId) {
          outputSpot.add(`<div id="${props.elementId}">\n`);
          outputSpot.add(ssrContent);
          outputSpot.add(`\n</div><script>${markBundlesLoadedJs}startSubAppOnLoad({
  name: "${name}",
  elementId: "${props.elementId}",
  serverSideRendering: ${Boolean(props.serverSideRendering)},
  clientProps: ${clientProps},
  initialState: ${initialStateStr || "{}"}
})</script>\n`);
        } else {
          outputSpot.add("<!-- no elementId for starting subApp on load -->\n");
        }

        if (props.timestamp) {
          outputSpot.add(`<!-- time: ${Date.now()} -->`);
        }

        outputSpot.close();
      };

      process.nextTick(asyncProcess);
    }
  };
};
