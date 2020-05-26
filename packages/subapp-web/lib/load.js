"use strict";

/* eslint-disable max-statements, no-console, complexity, no-magic-numbers */

/*
 * - Figure out all the dependencies and bundles a subapp needs and make sure
 *   to generate all links to load them for index.html.
 * - If serverSideRendering is enabled, then load and render the subapp for SSR.
 *   - Prepare initial state (if redux enabled) or props for the subapp
 *   - run renderTo* to generate HTML output
 *   - include output in index.html
 *   - generate code to bootstrap subapp on client
 */

const assert = require("assert");
const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const retrieveUrl = require("request");
const util = require("./util");
const xaa = require("xaa");
const jsesc = require("jsesc");
const { loadSubAppByName, loadSubAppServerByName, formUrl } = require("subapp-util");

// global name to store client subapp runtime, ie: window.xarcV1
// V1: version 1.
const xarc = "window.xarcV1";

// Size threshold of initial state string to embed it as a application/json script tag
// It's more efficient to JSON.parse large JSON data instead of embedding them as JS.
// https://quipblog.com/efficiently-loading-inlined-json-data-911960b0ac0a
// > The data sizes are as follows: large is 1.7MB of JSON, medium is 130K,
// > small is 10K and tiny is 781 bytes.
const INITIAL_STATE_SIZE_FOR_JSON = 1024;
let INITIAL_STATE_TAG_ID = 0;

const makeDevDebugMessage = (msg, reportLink = true) => {
  const reportMsg = reportLink
    ? `\nError: Please capture this info and submit a bug report at https://github.com/electrode-io/electrode`
    : "";
  return `Error: at ${util.removeCwd(__filename)}
${msg}${reportMsg}`;
};

const makeDevDebugHtml = msg => {
  return `<h1 style="background-color: red">DEV ERROR</h1>
<p><pre style="color: red">${msg}</pre></p>
<!-- ${msg} -->`;
};

module.exports = function setup(setupContext, { props: setupProps }) {
  // TODO: create JSON schema to validate props

  // name="Header"
  // async=true
  // defer=true
  // useStream=true
  // serverSideRendering=true
  // hydrateServerData=false
  // clientSideRendering=false
  // inlineScript=true

  // TODO: how to export and load subapp

  // TODO: Need a way to figure out all the subapps need for a page and send out script
  // tags ASAP in <header> so browser can start fetching them before entire page is loaded.

  const name = setupProps.name;
  const routeData = setupContext.routeOptions.__internals;
  const bundleAsset = util.getSubAppBundle(name, routeData.assets);
  const bundleBase = util.getBundleBase(setupContext.routeOptions);
  const comment = process.env.NODE_ENV === "production" ? "\n" : `\n<!-- subapp load ${name} -->\n`;

  //
  // in webpack dev mode, we have to retrieve the subapp's JS bundle from webpack dev server
  // to inline in the index page.
  //
  const retrieveDevServerBundle = async () => {
    return new Promise(resolve => {
      const routeOptions = setupContext.routeOptions;
      const path = Path.posix.join(bundleBase, bundleAsset.name);
      const bundleUrl = formUrl({ ...routeOptions.httpDevServer, path });
      retrieveUrl(bundleUrl, (err, resp, body) => {
        if (err || resp.statusCode !== 200) {
          const msg = makeDevDebugMessage(
            `Error: fail to retrieve subapp bundle from '${bundleUrl}' for inlining in index HTML
Response: ${err || body}`
          );
          console.error(msg); // eslint-disable-line
          resolve(makeDevDebugHtml(msg));
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
    const { webpackDev } = setupContext.routeOptions;

    if (setupProps.inlineScript === "always" || (setupProps.inlineScript === true && !webpackDev)) {
      if (!webpackDev) {
        // if we have to inline the subapp's JS bundle, we load it for production mode
        const src = Fs.readFileSync(Path.resolve("dist/js", bundleAsset.name)).toString();
        const ext = Path.extname(bundleAsset.name);
        if (ext === ".js") {
          inlineSubAppJs = `<script>/*${name}*/${src}</script>`;
        } else if (ext === ".css") {
          inlineSubAppJs = `<style id="${name}">${src}</style>`;
        } else {
          const msg = makeDevDebugMessage(`Error: UNKNOWN bundle extension ${name}`);
          console.error(msg); // eslint-disable-line
          inlineSubAppJs = makeDevDebugHtml(msg);
        }
      } else {
        inlineSubAppJs = true;
      }
    } else {
      // if should inline script for webpack dev mode
      // make sure we retrieve from webpack dev server and inline the script later
      inlineSubAppJs = webpackDev && Boolean(setupProps.inlineScript);
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
              .map(jsBundle => {
                const ext = Path.extname(jsBundle);
                if (ext === ".js") {
                  return `<script src="${jsBundle}" async></script>`;
                } else if (ext === ".css") {
                  return `<link rel="stylesheet" href="${jsBundle}">`;
                } else {
                  return `<!-- UNKNOWN bundle extension ${jsBundle} -->`;
                }
              })
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

  const verifyUseStream = props => {
    if (props.useStream) {
      const routeStream = setupContext.routeOptions.useStream;
      assert(
        routeStream !== false,
        `subapp '${props.name}' can't set useStream when route options 'useStream' is false.`
      );
    }
  };

  verifyUseStream(setupProps);

  const clientProps = JSON.stringify(_.pick(setupProps, ["useReactRouter"]));

  return {
    process: (context, { props }) => {
      verifyUseStream(props);

      const { request } = context.user;

      if (request.app.webpackDev && subAppLoadTime < request.app.webpackDev.compileTime) {
        subAppLoadTime = request.app.webpackDev.compileTime;
        loadSubApp();
      }

      let { group = "_" } = props;
      group = [].concat(group);
      const ssrGroups = group.map(grp =>
        util.getOrSet(context, ["user", "xarcSubappSSR", grp], { queue: [] })
      );

      //
      // push {awaitData, ready, renderSSR, props} into queue
      //
      // awaitData - promise
      // ready - defer promise to signal SSR info is ready for processing
      // props - token.props
      // renderSSR - callback to start rendering SSR for the group
      //

      const ssrInfo = { props, group, ready: xaa.defer() };
      ssrGroups.forEach(grp => grp.queue.push(ssrInfo));

      const outputSpot = context.output.reserve();
      // console.log("subapp load", name, "useReactRouter", subApp.useReactRouter);

      const outputSSRContent = (ssrContent, initialStateStr) => {
        // If user specified an element ID for a DOM Node to host the SSR content then
        // add the div for the Node and the SSR content to it, and add JS to start the
        // sub app on load.
        let elementId = "";
        if (!props.inline && props.elementId) {
          elementId = `elementId:"${props.elementId}",\n `;
          outputSpot.add(`<div id="${props.elementId}">`);
          outputSpot.add(ssrContent); // must add by itself since this could be a stream
          outputSpot.add(`</div>`);
        } else {
          outputSpot.add("<!-- inline or no elementId for starting subApp on load -->");
          if (ssrContent) {
            outputSpot.add("\n");
            outputSpot.add(ssrContent);
            outputSpot.add("\n");
          }
        }

        let dynInitialState = "";
        let initialStateScript;
        if (!initialStateStr) {
          initialStateScript = "{}";
        } else if (initialStateStr.length < INITIAL_STATE_SIZE_FOR_JSON) {
          initialStateScript = initialStateStr;
        } else {
          // embed large initial state as text and parse with JSON.parse instead.
          const dataId = `${name}-initial-state-${Date.now()}-${++INITIAL_STATE_TAG_ID}`;
          dynInitialState = `<script type="application/json" id="${dataId}">
${jsesc(JSON.parse(initialStateStr), {
  json: true,
  isScriptContext: true,
  wrap: true
})}
</script>
`;
          initialStateScript = `JSON.parse(document.getElementById("${dataId}").innerHTML)`;
        }

        const inlineStr = props.inline ? `inline:${props.inline},\n ` : "";
        const groupStr = props.group ? `group:"${props.group}",\n ` : "";
        outputSpot.add(`
${dynInitialState}<script>${xarc}.startSubAppOnLoad({
 name:"${name}",
 ${elementId}serverSideRendering:${Boolean(props.serverSideRendering)},
 ${inlineStr}${groupStr}clientProps:${clientProps},
 getInitialState:function(){return ${initialStateScript}}
});</script>
`);
      };

      const handleError = err => {
        if (process.env.NODE_ENV !== "production") {
          const stack = util.removeCwd(err.stack);
          const msg = makeDevDebugMessage(
            `Error: SSR subapp ${name} failed
${stack}`,
            false // SSR failure is likely an issue in user code, don't show link to report bug
          );
          console.error(msg); // eslint-disable-line
          outputSpot.add(makeDevDebugHtml(msg));
        } else if (request && request.log) {
          request.log(["error"], { msg: `SSR subapp ${name} failed`, err });
        }
      };

      let startTime;

      const closeOutput = () => {
        ssrInfo.isDone = true;
        if (props.timestamp) {
          const now = Date.now();
          outputSpot.add(`<!-- time: ${now} diff: ${now - startTime} -->`);
        }

        outputSpot.close();
      };

      ssrInfo.done = () => {
        if (!ssrInfo.isDone) {
          closeOutput();
        }
      };

      const processSubapp = async () => {
        const ref = {
          context,
          subApp,
          subAppServer,
          options: props,
          ssrGroups
        };

        const { bundles, scripts } = await prepareSubAppSplitBundles(context);
        outputSpot.add(`${comment}`);
        if (bundles.length > 0) {
          outputSpot.add(`${scripts}
<script>${xarc}.markBundlesLoaded(${JSON.stringify(bundles)});</script>
`);
        }

        if (props.serverSideRendering) {
          const lib = (ssrInfo.lib = util.getFramework(ref));
          ssrInfo.awaitData = lib.handlePrepare();

          ssrInfo.defer = true;

          if (!props.inline) {
            ssrInfo.renderSSR = async () => {
              try {
                outputSSRContent(await lib.handleSSR(ref), lib.initialStateStr);
              } catch (err) {
                handleError(err);
              } finally {
                closeOutput();
              }
            };
          } else {
            ssrInfo.saveSSRInfo = () => {
              if (ssrInfo.saved) {
                return;
              }
              ssrInfo.saved = true;
              try {
                // output load without SSR content
                outputSSRContent("", lib.initialStateStr);
                _.set(request.app, ["xarcInlineSSR", name], ssrInfo);
              } catch (err) {
                handleError(err);
              } finally {
                closeOutput();
              }
            };
          }
        } else {
          outputSSRContent("");
        }
      };

      const asyncProcess = async () => {
        if (props.timestamp) {
          startTime = Date.now();
          outputSpot.add(`<!-- time: ${startTime} -->`);
        }

        try {
          await processSubapp();
          ssrInfo.ready.resolve();
        } catch (err) {
          handleError(err);
        } finally {
          if (!ssrInfo.defer) {
            closeOutput();
          }
        }
      };

      process.nextTick(asyncProcess);
    }
  };
};
