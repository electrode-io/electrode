"use strict";

/* eslint-disable max-statements, no-console, complexity */

const assert = require("assert");
const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const optionalRequire = require("optional-require")(require);
const request = require("request");
const util = require("./util");
const { loadSubAppByName, loadSubAppServerByName } = require("subapp-util");

const ReactRedux = optionalRequire("react-redux", { default: {} });
const { Provider } = ReactRedux;

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
  const bundleJs = bundleAsset.name;
  const async = props.async ? " async" : "";
  const defer = props.defer ? " defer" : "";
  const bundleBase = util.getBundleBase(setupContext.routeOptions);
  const comment = process.env.NODE_ENV === "production" ? "" : `<!-- subapp load ${name} -->\n`;

  const retrieveDevServerBundle = async () => {
    return new Promise((resolve, reject) => {
      request(`${bundleBase}${bundleJs}`, (err, resp, body) => {
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

  if (props.inlineScript === "always" || (props.inlineScript === true && !webpackDev)) {
    if (!webpackDev) {
      const src = Fs.readFileSync(Path.resolve("dist/js", bundleJs)).toString();
      bundleScript = `<script>${src}</script>`;
    }
  } else {
    bundleScript = `<script src="${bundleBase}${bundleJs}"${async}${defer}></script>`;
  }

  let SubApp;
  let subAppServer;
  let StartComponent;

  let subAppLoadTime = 0;

  const loadSubApp = () => {
    SubApp = loadSubAppByName(name);
    subAppServer = loadSubAppServerByName(name);
    StartComponent = subAppServer.StartComponent || SubApp.Component;
  };

  loadSubApp();

  const clientProps = JSON.stringify(_.pick(props, ["useReactRouter"]));

  const renderElement = element => {
    if (props.streaming) {
      if (props.hydrateServerData) {
        return ReactDOMServer.renderToNodeStream(element);
      } else {
        return ReactDOMServer.renderToStaticNodeStream(element);
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
      console.log("subapp load", name, "useReactRouter", SubApp.useReactRouter);
      let rrContext;

      const createElement = Component => {
        if (SubApp.useReactRouter) {
          rrContext = {};
          const rrProps = { location: req.url.path, context: rrContext };
          console.log("rendering", name, "for react router", rrProps);
          return React.createElement(Component, rrProps);
        } else {
          console.log("rendering without react router", name);
          return React.createElement(Component);
        }
      };

      const asyncProcess = async () => {
        if (props.timestamp) {
          outputSpot.add(`<!-- time: ${Date.now()} -->`);
        }

        let ssrContent = "";
        let initialState = "";
        if (props.serverSideRendering) {
          if (!StartComponent) {
            ssrContent = `<!-- serverSideRendering ${name} has no StartComponent -->`;
          } else if (SubApp.reduxCreateStore) {
            let reduxData;

            if (subAppServer.prepare) {
              reduxData = await subAppServer.prepare(req, context);
            }
            // TODO: load server entry and check redux flag and get initial state store from server
            initialState = JSON.stringify(reduxData.initialState);
            if (props.serverSideRendering === true) {
              assert(Provider, "subapp-web: react-redux Provider not available");
              ssrContent = renderElement(
                React.createElement(
                  Provider,
                  { store: reduxData.store },
                  createElement(StartComponent)
                )
              );
            }
          } else if (props.serverSideRendering === true) {
            try {
              ssrContent = renderElement(createElement(StartComponent));
            } catch (err) {
              console.log("rendering", name, "failed", err);
            }
          }
        } else {
          ssrContent = `<!-- serverSideRendering flag is ${props.serverSideRendering} -->`;
        }

        outputSpot.add(`\n${comment}`);

        if (props.elementId) {
          outputSpot.add(`<div id="${props.elementId}">\n`);
          outputSpot.add(ssrContent);
          outputSpot.add(`\n</div><script>startSubAppOnLoad({
  name: "${name}",
  elementId: "${props.elementId}",
  serverSideRendering: ${props.serverSideRendering},
  clientProps: ${clientProps},
  initialState: ${initialState || "{}"}
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
