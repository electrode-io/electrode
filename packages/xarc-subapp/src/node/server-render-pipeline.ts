/* eslint-disable max-statements, no-console */

import _ from "lodash";
import { SubAppRenderPipeline } from "../subapp/subapp-render-pipeline";
import {
  SubAppSSRData,
  SubAppFeatureResult,
  LoadSubAppOptions,
  SubAppMountInfo,
} from "../subapp/types";
import { ServerFrameworkLib } from "./types";
import { safeStringifyJson } from "./utils";
// global name to store client subapp runtime, ie: window.xarcV1
// V1: version 1.
const xarc = "window.xarcV2";

function cleanStack(err) {
  const stacks = err.stack.split("\n");
  return stacks
    .filter(
      (l) =>
        !l.includes("(internal/") &&
        !l.includes("/isomorphic-loader/") &&
        !l.includes("/pirates/lib/index")
    )
    .map((l) => l.replace(process.cwd(), "."))
    .join("\n");
}

/**
 * The server side rendering pipeline for a subapp
 *
 * The pipeline involves preparing the data (which is async), and then rendering the
 * component to string or stream, which can be sync or async.
 *
 * It's also possible that the subapp only wants the data but not actually rendering
 * the component.
 *
 * - load will setup this and kick off prepare data
 * - start will await for prepare data and render, and inject result into HTML
 */
export class SubAppServerRenderPipeline implements SubAppRenderPipeline {
  /** options for rendering the subapp into HTML page  */
  options: LoadSubAppOptions;
  /** the promise for subapp's data prepare */
  preparePromise?: Promise<unknown>;
  ssrData?: SubAppSSRData;
  framework?: ServerFrameworkLib;
  startTime?: number;
  /** spot in HTML output to inject the result from SSR */
  outputSpot?: any;
  /** data from prepareData */
  prepResult?: SubAppFeatureResult;

  static INITIAL_STATE_TAG_ID: number = 0;

  constructor(data: SubAppSSRData) {
    const { context, options } = data;
    this.options = { ...options, ..._.pick(context.options, ["ssr", "prepareOnly"]) };
    this.ssrData = data;
    this.outputSpot = context.output.reserve();
    this.framework = data.subapp._frameworkFactory();
  }

  //  eslint-disable-next-line
  async start(_reload?: boolean): Promise<any> {
    throw new Error("SubAppServerRenderPipeline doesn't handle start");
  }

  /** start to run through all the subapp's features to prepare data for calling renderToString */
  startPrepare(): void {
    this.startTime = Date.now();
    this.preparePromise = this.framework.prepareSSR(this.ssrData).then((result) => {
      const { subapp } = this.ssrData;
      if (subapp._module?.loadError && !subapp._module.warned) {
        subapp._module.warned = true;
        console.error(
          `Failed to getModule for subapp ${subapp.name}:`,
          cleanStack(subapp._module.loadError)
        );
        console.error(`  Originating stack:`, cleanStack(subapp._module.captureErr));
        if (this.options.ssr === false || this.options.prepareOnly) {
          console.error(`  Things may be OK due to one of these settings: ssr: ${this.options.ssr}, prepareOnly: ${this.options.prepareOnly}
    - Will continue to prepare your subapps to send to the browser
    - If you know that your subapp module doesn't support SSR, then you can ignore these errors.
    - You will *not* see SSR content.
`);
        } else {
          console.error(
            `If you know your subapp doesn't support SSR, then set its ssr flag to false.`
          );
        }
      }

      return (this.prepResult = result);
    });
  }

  async waitForPrepare(): Promise<SubAppFeatureResult> {
    this.prepResult = await this.preparePromise;

    return this.prepResult;
  }

  getPrepResult(): SubAppFeatureResult {
    return this.prepResult;
  }

  isPrepared(): boolean {
    return !!this.prepResult;
  }

  executeRender(): void {
    const { name } = this.ssrData.subapp;
    const { namespace, scriptNonceAttr = "" } = this.ssrData.context.user;

    let ssrContent;
    let ssrProps;

    let elementId = `${namespace}.subapp2-${name}`;

    if (this.options.prepareOnly) {
      // TODO: still need to prepare props? like when subapp uses staticProps feature.
      ssrContent = `<!-- SSR prepare only for subapp ${name} -->`;
      ssrProps = this.prepResult.props;
      elementId = undefined;
    } else if (!this.options.ssr) {
      ssrContent = `<!-- SSR disabled for subapp ${name} --><div id="${elementId}"></div>`;
    } else {
      const ssrResult = this.framework.handleSSRSync(this.ssrData, this.prepResult);
      ssrContent = `<div id="${elementId}">${ssrResult.content}</div>`;
      ssrProps = ssrResult.props;
    }

    const now = Date.now();
    let initialStateData = "";
    let initialStateScript = "{}";
    if (!_.isEmpty(ssrProps)) {
      const dataId = `${namespace}.${name}-initial-state-${Date.now()}-${++SubAppServerRenderPipeline.INITIAL_STATE_TAG_ID}`;
      initialStateData = `
<script${scriptNonceAttr} type="application/json" id="${dataId}">
${safeStringifyJson(ssrProps)}
</script>`;
      initialStateScript = `${xarc}.dyn("${dataId}")`;
    }

    // about using safeStringifyJson here: We don't expect user to write their own code
    // with <script> or </script> in their options, but if they do, it's their problem,
    // but we at least avoid code blowing up due to that.
    this.outputSpot.add(
      `<!-- time: ${this.startTime} -->
${ssrContent}${initialStateData}
<!-- time: ${now} diff: ${now - this.startTime} -->
<script${scriptNonceAttr}>${xarc}.startSubAppOnLoad(
  ${safeStringifyJson({ ...this.options, namespace, elementId })},
  {getInitialState:function(){return ${initialStateScript};}});
</script>`
    );

    this.outputSpot.close();
  }

  /** Hot module reload (HMR) support - empty filler */
  _reload: () => Promise<any>;
  /** For HMR: a component mount itself to the subapp/pipeline - empty filler */
  _mount: (info: SubAppMountInfo) => void;
  /** For HMR: a component unmount itself from the subapp/pipeline - empty filler */
  _unmount: (info: SubAppMountInfo) => void;
}
