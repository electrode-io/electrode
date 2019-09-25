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

  const name = props.name;
  const routeData = setupContext.routeOptions.__internals;
  const bundleAsset = util.getSubAppBundle(name, routeData.assets);
  const async = props.async ? " async" : "";
  const defer = props.defer ? " defer" : "";
  const bundleBase = util.getBundleBase(setupContext.routeOptions);
  const comment = process.env.NODE_ENV === "production" ? "" : `<!-- subapp load ${name} -->\n`;

  const retrieveDevServerBundle = async () => {
    return new Promise((resolve, reject) => {
      request(`${bundleBase}${bundleAsset.name}`, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(`<script>${body}</script>`);
        }
      });
    });
  };

  let bundleScript;
  const webpackDev = process.env.WEBPACK_DEV === "true";

  const cdnJsBundles = util.getCdnJsBundles(
    routeData.assets.byChunkName,
    setupContext.routeOptions
  );

  if (props.inlineScript === "always" || (props.inlineScript === true && !webpackDev)) {
    if (!webpackDev) {
      const src = Fs.readFileSync(Path.resolve("dist/js", bundleAsset.name)).toString();
      bundleScript = `<script>${src}</script>`;
    }
  } else {
    bundleScript = bundleAsset.chunkNames
      .map(x => cdnJsBundles[x] && `<script src="${cdnJsBundles[x]}"${async}${defer}></script>`)
      .filter(x => x)
      .join("");
  }

  let subApp;
  let subAppServer;
  let StartComponent;

  let subAppLoadTime = 0;

  const loadSubApp = () => {
    subApp = loadSubAppByName(name);
    subAppServer = loadSubAppServerByName(name);
    StartComponent = subAppServer.StartComponent || subApp.Component;
  };

  loadSubApp();

  const clientProps = JSON.stringify(_.pick(props, ["useReactRouter"]));

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
        if (subApp.useReactRouter) {
          rrContext = {};
          const rrProps = Object.assign(
            { location: req.url.path, context: rrContext },
            initialProps
          );
          // console.log("rendering", name, "for react router", rrProps);
          return React.createElement(Component, rrProps);
        } else {
          // console.log("rendering without react router", name);
          return React.createElement(Component, initialProps);
        }
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

        outputSpot.add(`\n${comment}`);

        // If user specified an element ID for a DOM Node to host the SSR content then
        // add the div for the Node and the SSR content to it, and add JS to start the
        // sub app on load.
        if (props.elementId) {
          outputSpot.add(`<div id="${props.elementId}">\n`);
          outputSpot.add(ssrContent);
          outputSpot.add(`\n</div><script>startSubAppOnLoad({
  name: "${name}",
  elementId: "${props.elementId}",
  serverSideRendering: ${Boolean(props.serverSideRendering)},
  clientProps: ${clientProps},
  initialState: ${initialStateStr || "{}"}
})</script>\n`);
        } else {
          outputSpot.add("<!-- no elementId for starting subApp on load -->\n");
        }

        const script = bundleScript || (await retrieveDevServerBundle());

        outputSpot.add(script);

        if (props.timestamp) {
          outputSpot.add(`<!-- time: ${Date.now()} -->`);
        }

        outputSpot.close();
      };

      process.nextTick(asyncProcess);
    }
  };
};
