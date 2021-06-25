/* eslint-disable max-statements, no-console */
import {
  ServerFrameworkLib,
  SubAppSSRData,
  SubAppSSRResult,
  SubAppFeatureResult,
  envHooks,
} from "@xarc/subapp";
// import { render } from "react-dom";
import { createElement, Component } from "react";
import { renderToString } from "react-dom/server";

/**
 * implementation of server side rendering support for React
 */
export class SSRReactLib implements ServerFrameworkLib {
  constructor() {
    //
  }

  async prepareSSR?(data: SubAppSSRData) {
    const subapp = envHooks.getContainer().get(data.subapp.name);
    if (!subapp._module) {
      await subapp._getModule();
    }

    if (subapp._module.loadError) {
      return {};
    }

    const Comp = subapp._getExport<Component>()?.Component;

    const featNames = Object.keys(subapp._features);

    let result: SubAppFeatureResult = { Component: Comp };
    // the order feature providers will be invoked
    const featIds = ["state-provider", "router-provider", "app-context-provider"];

    for (const featId of featIds) {
      const featName = featNames.find((x) => subapp._features[x].id === featId);
      if (featName) {
        const feat = subapp._features[featName];
        let nextRes = feat.execute({ input: result, ssrData: data });
        if ((nextRes as any).then) {
          nextRes = await nextRes;
        }
        result = { ...result, ...nextRes };
      }
    }

    // const results = (data.request[ssrPrepResult] = data.request[ssrPrepResult] || {});
    // results[subapp.name] = result;

    return result;
  }

  /**
   * Handle server side rendering for subapps
   * @param data - SSR server data
   * @returns SSR result
   */
  async handleSSR(data: SubAppSSRData) {
    const result = await this.prepareSSR(data);

    const content = renderToString(<result.Component />);

    return { props: result.props, content };
  }

  handleSSRSync(data: SubAppSSRData, prepResult: SubAppFeatureResult): SubAppSSRResult {
    const { subapp } = data;
    if (!subapp._module) {
      return {
        content: `<h3>SubApp ${subapp.name} can't SSR sync because its module not yet loaded</h3>`,
        props: undefined,
      };
    }

    const content = renderToString(<prepResult.Component />);

    return {
      content,
      props: prepResult.props,
    };
  }
}
