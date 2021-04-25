import { createElement, Component } from "react";
import {
  SubAppDef,
  SubAppServerRenderPipeline,
  SSR_PIPELINES,
  LoadSubAppOptions
} from "@xarc/subapp";
import { SubAppInlineOptions } from "../common";
import { AppContext } from "../common/app-context";
import { SSRReactLib } from ".";

type PropsType = {
  subapp: SubAppDef;
};

const SubAppSSR = (props: PropsType) => {
  return (
    <AppContext.Consumer>
      {({ ssr }) => {
        const pipelines: SubAppServerRenderPipeline[] = ssr.request[SSR_PIPELINES];
        const pipeline = pipelines.find(p => p.ssrData.subapp.name === props.subapp.name);

        if (!pipeline) {
          const msg = `Unable to find data for server side rendering subapp '${props.subapp.name}'.
  It's most likely because the subapp was not specified in 'subApps' options when
  creating the 'PageRenderer' for the server route.`;
          console.error(`\nError: ${msg}\n`); // eslint-disable-line
          throw new Error(msg);
        }
        const framework: SSRReactLib = pipeline.framework as any;
        const ssrResult = framework.handleSSRSync(pipeline.ssrData, pipeline.prepResult);
        const elementId = `subapp-as-component-${props.subapp.name}`;
        return <div id={elementId} dangerouslySetInnerHTML={{ __html: ssrResult.content }} />;
      }}
    </AppContext.Consumer>
  );
};

/**
 * Allow you to nest one subapp within another.
 *
 * This is different from `createDynamicComponent`, which just use subapp to handle
 * dynamic import of the component from a subapp.
 *
 * The component this creates keeps the full features of a subapp, such as data preparing,
 * routing, etc.
 *
 * - If `ssr` is true, then `prepareOnly` for an inlined subapp is always `true` because
 *   it will be rendered as part of its parent subapp instead.
 *
 * @param subapp
 * @param options
 * @returns A react component to be inlined in another subapp
 */
export function subAppInlineComponent(subapp: SubAppDef, options: SubAppInlineOptions = {}) {
  if (options.ssr) {
    subapp._ssr = true;
  }

  const Comp = () => <SubAppSSR subapp={subapp} />;

  Comp.loadOptions = {
    name: subapp.name,
    ssr: options.ssr,
    prepareOnly: true,
    inlineId: `subapp-${subapp.name}-inline`
  } as LoadSubAppOptions;

  return Comp;
}
