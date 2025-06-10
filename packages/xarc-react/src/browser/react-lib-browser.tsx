/* eslint-disable max-params, @typescript-eslint/no-unused-vars, max-statements, @typescript-eslint/ban-ts-comment */

import { createRoot, hydrateRoot } from "react-dom/client";
import { createElement, Component } from "react"; // eslint-disable-line
import {
  SubAppFeatureResult,
  xarcV2,
  ClientFrameworkLib,
  envHooks,
} from "@xarc/subapp";
import { SubAppCSRData } from "@xarc/subapp";
import { ReactClientRenderPipeline } from "./react-render-pipeline";
import { SubAppStartComponent } from "./subapp-start-component";

/**
 * The implementation of Framework Lib for React for the browser.
 */
export class BrowserReactLib implements ClientFrameworkLib {
  constructor() {
    //
  }

  renderStart(): void {
    throw new Error("BrowserReactLib does not implement renderStart.");
  }

  /**
   * Prepare subapp for client side rendering
   * @param csrData SubAppCSRData for the subapp
   * @param pipeline The ReactClientRenderPipeline instance
   * @param reload Whether this is a reload
   * @returns SubAppFeatureResult
   */
  async prepareCSR(
    csrData: SubAppCSRData,
    pipeline: ReactClientRenderPipeline,
    reload?: boolean
  ): Promise<SubAppFeatureResult> {
    const container = envHooks.getContainer?.();
    if (!container) {
      throw new Error("envHooks.getContainer is not available");
    }
    const subapp = container.get(csrData.name);
    if (!subapp) {
      throw new Error(`Subapp ${csrData.name} not found in container`);
    }
    if (!subapp._module) {
      xarcV2.debug("startSubApp", subapp.name, "module is not yet loaded.");
      await subapp._getModule?.();
    }
    let Comp = subapp._getExport?.()?.Component;
    //
    // in dev mode, use a wrapper component to wrap the subapp's component so we can
    // re-render it when there' hot module update
    //
    // @ts-ignore module.hot
    if (module.hot) {
      Comp = (props: any) => (
        <SubAppStartComponent
          subapp={subapp}
          __props={props}
          pipeline={pipeline}
        />
      );
    }
    const features = subapp._features || {};
    const featNames = Object.keys(features);

    let result: SubAppFeatureResult = { Component: Comp };

    // the order feature providers will be invoked
    const featIds = [
      "state-provider",
      "router-provider",
      "app-context-provider",
    ];

    for (const featId of featIds) {
      const featName = featNames.find((x) => features[x]?.id === featId);
      if (featName) {
        const feat = features[featName];
        if (!feat) continue;
        xarcV2.debug(
          "executing subapp feature",
          featName,
          "id",
          featId,
          "subId",
          feat.subId
        );
        let nextRes = feat.execute({ input: result, csrData, reload });
        if ((nextRes as any)?.then) {
          nextRes = await nextRes;
        }
        result = Object.assign({}, result, nextRes);
      }
    }

    return result;
  }

  /**
   * Start a subapp on the browser
   *
   * Note: this is called by the SubAppDef._start method that declareSubApp
   * from @xarc/subapp module creates, with separate versions for browser
   * and node.js.
   *
   * @param csrData SubAppCSRData for the subapp
   * @param pipeline The ReactClientRenderPipeline instance
   * @param reload Whether this is a reload
   */
  async startSubApp(
    csrData: SubAppCSRData,
    pipeline: ReactClientRenderPipeline,
    reload?: boolean
  ) {
    const result = await this.prepareCSR(csrData, pipeline, reload);
    if (!csrData?.element) {
      throw new Error("startSubApp: csrData.element is not available");
    }
    if (!reload && csrData.ssr) {
      hydrateRoot(csrData.element, <result.Component />);
    } else {
      createRoot(csrData.element).render(<result.Component />);
    }
  }

  /**
   * Start a subapp synchronously on the browser
   * @param csrData SubAppCSRData for the subapp
   * @param pipeline The ReactClientRenderPipeline instance
   * @param reload Whether this is a reload
   */
  startSubAppSync(
    csrData: SubAppCSRData,
    pipeline: ReactClientRenderPipeline,
    reload?: boolean
  ) {
    const container = envHooks.getContainer?.();
    if (!container) {
      return;
    }
    const subapp = container.get(csrData.name);
    if (!subapp?._module) {
      return;
    }
    if (!csrData?.element) {
      return;
    }
    const prepResult = pipeline.getPrepResult();
    if (!reload && csrData.ssr) {
      hydrateRoot(csrData.element, <prepResult.Component />);
    } else {
      createRoot(csrData.element).render(<prepResult.Component />);
    }
  }
}
