/* eslint-disable @typescript-eslint/no-unused-vars, max-statements, @typescript-eslint/ban-ts-comment */

import { SubAppDef, SubAppStartOptions, FrameworkLib } from "./index";
import { render, hydrate } from "react-dom";
import { createElement } from "react"; // eslint-disable-line
import { SubAppStartComponent } from "./subapp-start-component";
import { SubAppFeatureResult, xarcV2 } from "@xarc/subapp";

/**
 * The implementation of Framework Lib for React for the browser.
 */
export class BrowserReactLib implements FrameworkLib {
  constructor() {
    //
  }

  renderStart(): void {
    throw new Error("BrowserReactLib does not implement renderStart.");
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
  async startSubApp(subapp: SubAppDef, options: SubAppStartOptions, reload?: boolean) {
    if (!subapp._module) {
      xarcV2.debug("startSubApp", subapp.name, "module is not yet loaded.");
      await subapp._getModule();
    }
    const mod = subapp._module;
    //
    // in dev mode, use a wrapper component to wrap the subapp's component so we can
    // re-render it when there' hot module update
    //
    // @ts-ignore module.hot
    const Component = module.hot
      ? (props: any) => <SubAppStartComponent __subapp={subapp} __props={props} />
      : mod.Component || mod.subapp?.Component;

    const featNames = Object.keys(subapp._features);

    let result: SubAppFeatureResult = { Component };
    // the order feature providers will be invoked
    const featIds = ["state-provider", "router-provider", "app-context-provider"];

    xarcV2.debug("subapp features of", subapp.name, featNames);

    for (const featId of featIds) {
      const featName = featNames.find(x => subapp._features[x].id === featId);
      if (featName) {
        const feat = subapp._features[featName];
        xarcV2.debug("executing subapp feature", featName, "id", featId, "subId", feat.subId);
        let nextRes = feat.execute({ input: result, startOptions: options, reload });
        if ((nextRes as any).then) {
          nextRes = await nextRes;
        }
        result = Object.assign({}, result, nextRes);
      }
    }

    if (!reload && options.ssr) {
      hydrate(<result.Component />, options.element);
    } else {
      render(<result.Component />, options.element);
    }
  }
}
