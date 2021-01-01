/* eslint-disable max-statements, no-console */
import { FrameworkLib, SubAppSSRData, SubAppFeatureResult } from "@xarc/subapp";
// import { render } from "react-dom";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

/**
 * implementation of server side rendering support for React
 */
export class SSRReactLib implements FrameworkLib {
  constructor() {
    //
  }

  /**
   * Render react element to string
   *
   * @param element
   */
  renderToString(element: React.ReactElement) {
    return renderToString(element);
  }

  /**
   * Handle server side rendering for subapps
   * @param data - SSR server data
   * @returns SSR result
   */
  async handleSSR(data: SubAppSSRData) {
    const { subapp } = data;
    if (!subapp._module) {
      await subapp._getModule();
    }

    const mod = subapp._module;

    const Component = mod.Component || mod.subapp?.Component;

    const featNames = Object.keys(subapp._features);

    let result: SubAppFeatureResult = { Component };
    // the order feature providers will be invoked
    const featIds = ["state-provider", "router-provider", "app-context-provider"];

    for (const featId of featIds) {
      const featName = featNames.find(x => subapp._features[x].id === featId);
      if (featName) {
        const feat = subapp._features[featName];
        let nextRes = feat.execute({ input: result, ssrData: data });
        if ((nextRes as any).then) {
          nextRes = await nextRes;
        }
        result = { ...result, ...nextRes };
      }
    }

    const content = renderToString(<result.Component />);

    return { props: result.props, content };
  }
}
