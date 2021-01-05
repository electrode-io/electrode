/**
 * Server side load for subapp v2
 */
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

import * as _ from "lodash";
import { getContainer } from "./index";

// global name to store client subapp runtime, ie: window.xarcV1
// V1: version 1.
const xarc = "window.xarcV2";

let INITIAL_STATE_TAG_ID = 0;

export function loadSubApp(setupContext: any, { props: setupProps }) {
  // name="Header"
  // async=true
  // defer=true
  // useStream=true
  // ssr=true
  // hydrateServerData=false
  // clientSideRendering=false
  // inlineScript=true

  return {
    process: (context, { props }) => {
      const { scriptNonceAttr = "", request } = context.user;

      // ensure subapp's data prep are executed and embedded as initial state in index.html

      // console.log("subapp load", name, "useReactRouter", subApp.useReactRouter);
      const { name } = props;

      const subapp = getContainer().get(name);

      // reserve output spot in index.html
      const outputSpot = context.output.reserve();

      // check for subapp's initialize and call it to get initial data

      const asyncProcess = async () => {
        // get framework library
        const frameworkLib = subapp._frameworkFactory!();
        const startTime = Date.now();
        const { props: ssrProps, content: ssrContent } = await frameworkLib.handleSSR!({
          context,
          subapp,
          props: {},
          request,
          path: request.path
        });
        const now = Date.now();
        let initialStateData = "";
        let initialStateScript = "";
        if (!_.isEmpty(ssrProps)) {
          const dataId = `${name}-initial-state-${Date.now()}-${++INITIAL_STATE_TAG_ID}`;
          initialStateData = `
<script${scriptNonceAttr} type="application/json" id="${dataId}">
${JSON.stringify(ssrProps)}
</script>`;
          initialStateScript = `${xarc}.dyn("${dataId}")`;
        }
        outputSpot.add(
          `<!-- time: ${startTime} -->
<div id="subapp2-${name}">${ssrContent}</div>${initialStateData}
<!-- time: ${now} diff: ${now - startTime} -->
<script${scriptNonceAttr}>${xarc}.startSubAppOnLoad(${JSON.stringify(props)},
{getInitialState:function(){return ${initialStateScript}}});</script>
`
        );

        outputSpot.close();
      };

      asyncProcess();
    }
  };
}
