/* eslint-disable max-params, @typescript-eslint/no-unused-vars, max-statements, @typescript-eslint/ban-ts-comment */

import { render, hydrate } from "react-dom";
import { createElement, Component } from "react"; // eslint-disable-line
import { SubAppFeatureResult, xarcV2, ClientFrameworkLib, envHooks } from "@xarc/subapp";
import { SubAppCSRData } from "./index";
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
   */
  async prepareCSR(csrData: SubAppCSRData, pipeline: ReactClientRenderPipeline, reload?: boolean) {
    const subapp = envHooks.getContainer().get(csrData.name);

    if (!subapp._module) {
      xarcV2.debug("startSubApp", subapp.name, "module is not yet loaded.");
      await subapp._getModule();
    }

    let Comp = subapp._getExport().Component;
    //
    // in dev mode, use a wrapper component to wrap the subapp's component so we can
    // re-render it when there' hot module update
    //
    // @ts-ignore module.hot
    if (module.hot) {
      Comp = (props: any) => (
        <SubAppStartComponent subapp={subapp} __props={props} pipeline={pipeline} />
      );
    }

    const featNames = Object.keys(subapp._features);

    let result: SubAppFeatureResult = { Component: Comp };

    // the order feature providers will be invoked
    const featIds = ["state-provider", "router-provider", "app-context-provider"];

    for (const featId of featIds) {
      const featName = featNames.find(x => subapp._features[x].id === featId);
      if (featName) {
        const feat = subapp._features[featName];
        xarcV2.debug("executing subapp feature", featName, "id", featId, "subId", feat.subId);
        let nextRes = feat.execute({ input: result, csrData, reload });
        if ((nextRes as any).then) {
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
   * @param subapp
   * @param options
   * @param reload
   */
  async startSubApp(csrData: SubAppCSRData, pipeline: ReactClientRenderPipeline, reload?: boolean) {
    const result = await this.prepareCSR(csrData, pipeline, reload);
    if (!reload && csrData.ssr) {
      hydrate(<result.Component />, csrData.element);
    } else {
      render(<result.Component />, csrData.element);
    }
  }

  startSubAppSync(csrData: SubAppCSRData, pipeline: ReactClientRenderPipeline, reload?: boolean) {
    const subapp = envHooks.getContainer().get(csrData.name);
    if (!subapp._module) {
      console.error("startSubAppSync can't start because subapp._module is not available"); // eslint-disable-line
      return;
    }

    const prepResult = pipeline.getPrepResult();

    if (!reload && csrData.ssr) {
      hydrate(<prepResult.Component />, csrData.element);
    } else {
      render(<prepResult.Component />, csrData.element);
    }
  }
}
