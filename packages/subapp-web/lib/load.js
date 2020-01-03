"use strict";

/* eslint-disable max-statements, no-console, complexity */

/*
 * - Figure out all the dependencies and bundles a subapp needs and make sure
 *   to generate all links to load them for index.html.
 * - If serverSideRendering is enabled, then load and render the subapp for SSR.
 *   - Prepare initial state (if redux enabled) or props for the subapp
 *   - run renderTo* to generate HTML output
 *   - include output in index.html
 *   - generate code to bootstrap subapp on client
 */

const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const retrieveUrl = require("request");
const util = require("./util");
const { loadSubAppByName, loadSubAppServerByName } = require("subapp-util");

module.exports = function setup(setupContext, token) {
  const options = token.props;

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

  const name = options.name;
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
      retrieveUrl(`${bundleBase}${bundleAsset.name}`, (err, resp, body) => {
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

    if (options.inlineScript === "always" || (options.inlineScript === true && !webpackDev)) {
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
      inlineSubAppJs = webpackDev && Boolean(options.inlineScript);
    }
  };

  let subApp;
  let subAppServer;
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
  };

  loadSubApp();
  prepareSubAppJsBundle();

  const clientProps = JSON.stringify(_.pick(options, ["useReactRouter"]));

  return {
    process: context => {
      const { request } = context.user;

      if (request.app.webpackDev && subAppLoadTime < request.app.webpackDev.compileTime) {
        subAppLoadTime = request.app.webpackDev.compileTime;
        loadSubApp();
      }

      const outputSpot = context.output.reserve();
      // console.log("subapp load", name, "useReactRouter", subApp.useReactRouter);

      const processSubapp = async () => {
        let ssrContent = "";
        let initialStateStr = "";
        const ref = {
          context,
          subApp,
          subAppServer,
          options
        };
        if (options.serverSideRendering) {
          const lib = util.getFramework(ref);
          ssrContent = await lib.handleSSR(ref);
          initialStateStr = lib.initialStateStr;
        } else {
          ssrContent = `<!-- serverSideRendering flag is ${options.serverSideRendering} -->`;
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
        if (options.elementId) {
          outputSpot.add(`<div id="${options.elementId}">\n`);
          outputSpot.add(ssrContent);
          outputSpot.add(`\n</div><script>${markBundlesLoadedJs}startSubAppOnLoad({
  name: "${name}",
  elementId: "${options.elementId}",
  serverSideRendering: ${Boolean(options.serverSideRendering)},
  clientProps: ${clientProps},
  initialState: ${initialStateStr || "{}"}
})</script>\n`);
        } else {
          outputSpot.add("<!-- no elementId for starting subApp on load -->\n");
        }
      };

      const asyncProcess = async () => {
        if (options.timestamp) {
          outputSpot.add(`<!-- time: ${Date.now()} -->`);
        }

        try {
          await processSubapp();
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error(`SSR subapp ${name} failed <error>${err.stack}</error>`); // eslint-disable-line
            outputSpot.add(`<!-- SSR subapp ${name} failed

${err.stack}

-->`);
          } else if (request && request.log) {
            request.log(["error"], { msg: `SSR subapp ${name} failed`, err });
          }
        } finally {
          if (options.timestamp) {
            outputSpot.add(`<!-- time: ${Date.now()} -->`);
          }

          outputSpot.close();
        }
      };

      process.nextTick(asyncProcess);
    }
  };
};
