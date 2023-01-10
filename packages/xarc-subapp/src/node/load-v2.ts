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

import { getContainer } from "./index";

/**
 * Server side load for subapp v2
 *
 * @param _setupContext setup context
 * @param param1 props object
 */
//  eslint-disable-next-line
export function loadSubApp(_setupContext: any, { props: setupProps }): any {
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
      const subapp = getContainer().get(props.name);
      const { request } = context.user;

      subapp._start({
        ssrData: {
          context,
          subapp,
          options: props,
          request,
          path: request.path
        }
      });

      return undefined;
    }
  };
}
