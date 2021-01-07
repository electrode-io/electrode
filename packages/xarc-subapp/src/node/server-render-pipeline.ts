/* eslint-disable max-statements */
import _ from "lodash";
import { SubAppRenderPipeline } from "../subapp/subapp-render-pipeline";
import { SubAppSSRData, SubAppFeatureResult, LoadSubAppOptions } from "../subapp/types";
import { ServerFrameworkLib } from "./types";
// global name to store client subapp runtime, ie: window.xarcV1
// V1: version 1.
const xarc = "window.xarcV2";

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
    this.options = options;
    this.ssrData = data;
    this.outputSpot = context.output.reserve();
    this.framework = data.subapp._frameworkFactory();
  }

  async start(_reload?: boolean) {
    throw new Error("SubAppServerRenderPipeline doesn't handle start");
  }

  /** start to run through all the subapp's features to prepare data for calling renderToString */
  startPrepare() {
    this.startTime = Date.now();
    this.preparePromise = this.framework.prepareSSR(this.ssrData).then(result => {
      return (this.prepResult = result);
    });
  }

  async waitForPrepare() {
    this.prepResult = await this.preparePromise;

    return this.prepResult;
  }

  getPrepResult() {
    return this.prepResult;
  }

  isPrepared() {
    return !!this.prepResult;
  }

  executeRender() {
    const { name } = this.ssrData.subapp;
    const { scriptNonceAttr = "" } = this.ssrData.context.user;

    let ssrContent;
    let ssrProps;

    if (this.options.prepareOnly) {
      // TODO: still need to prepare props? like when subapp uses staticProps feature.
      ssrContent = `<!-- SSR prepare only for subapp ${name} -->`;
      ssrProps = this.prepResult.props;
    } else if (!this.options.ssr) {
      ssrContent = `<!-- SSR disabled for subapp ${name} -->`;
    } else {
      const ssrResult = this.framework.handleSSRSync(this.ssrData, this.prepResult);
      ssrContent = `<div id="subapp2-${name}">${ssrResult.content}</div>`;
      ssrProps = ssrResult.props;
    }

    const now = Date.now();
    let initialStateData = "";
    let initialStateScript = "{}";
    if (!_.isEmpty(ssrProps)) {
      const dataId = `${name}-initial-state-${Date.now()}-${++SubAppServerRenderPipeline.INITIAL_STATE_TAG_ID}`;
      initialStateData = `
<script${scriptNonceAttr} type="application/json" id="${dataId}">
${JSON.stringify(ssrProps)}
</script>`;
      initialStateScript = `${xarc}.dyn("${dataId}")`;
    }

    this.outputSpot.add(
      `<!-- time: ${this.startTime} -->
${ssrContent}${initialStateData}
<!-- time: ${now} diff: ${now - this.startTime} -->
<script${scriptNonceAttr}>${xarc}.startSubAppOnLoad(${JSON.stringify(this.options)},
{getInitialState:function(){return ${initialStateScript};}});</script>
`
    );

    this.outputSpot.close();
  }

  /** Hot module reload (HMR) support - empty filler */
  _reload: () => Promise<any>;
  /** For HMR: a component mount itself to the subapp/pipeline - empty filler */
  _mount: (info: any) => void;
  /** For HMR: a component unmount itself from the subapp/pipeline - empty filler */
  _unmount: (info: any) => void;
}
