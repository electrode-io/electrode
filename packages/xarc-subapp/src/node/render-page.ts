/* eslint-disable new-cap */

import { RenderContext } from "@xarc/render-context";
import { createTemplateTags, TokenInvoke, TagRenderer } from "@xarc/tag-renderer";
import { PageOptions } from "./types";

import {
  initContext,
  initSubApp,
  loadSubApp,
  startSubApp,
  isSubAppReady,
  subAppReady,
  InitProps,
} from "./index";

/**
 * Options for rendering a page for each request
 */
export type RenderOptions = {
  /**
   * Your HTTP framework's request object.  Will be passed into UI components as is
   * through React context.
   */
  request?: any;

  /** namespace to load the subapps */
  namespace?: string;

  /**
   * Turn on/off server side rendering for the entire render, regardless if subapp
   * wants ssr. Setting this flag to `true` will not make a subapp that sets its
   * own `ssr` to `false` do SSR.
   */
  ssr?: boolean;

  /**
   * If you only want to prepare data for when `ssr` is `true`, set this to `true`.
   * This will affect all subapps in this render
   */
  prepareOnly?: boolean;
};

/**
 * Renderer to render a page with xarc subapps on it
 */
export class PageRenderer {
  private _options: PageOptions;
  private _template: any[];
  private _renderer: TagRenderer;

  constructor(options: PageOptions) {
    this._options = options;
    const { subApps } = options;
    const {
      namespace,
      nonce,
      prodAssetData,
      devAssetData,
      templateInserts: { head = {}, body = {} } = {},
    } = options;

    const { charSet = "UTF-8" } = options;

    const charSetStr = charSet ? `\n<meta charset="${charSet}">\n` : "";

    const initProps: InitProps = { prodAssetData, devAssetData, nonce, namespace };

    this._template = createTemplateTags`<!doctype html>
<html>
<head>${charSetStr}
${head.begin}
${options.pageTitle && `<title>${options.pageTitle}</title>`}
${TokenInvoke(initContext, initProps)}
${head.contextReady}
${TokenInvoke(initSubApp, initProps)}
${head.afterInit}
${head.end}
</head>
<body>
${body.begin}
${subApps.map((sa) => TokenInvoke(loadSubApp, sa))}
${body.beforeStart}
${TokenInvoke(startSubApp)}
${body.afterStart}
${body.end}
</body>
</html>
`;

    this._renderer = new TagRenderer({ templateTags: this._template });
  }

  _getSSRSubAppNames() {
    const { subApps } = this._options;
    return subApps.map((s) => s.ssr && s.name).filter((x) => x);
  }

  /**
   * Render index.html with subapps
   * @params RenderOptions
   * @returns Promise<RenderContext>
   */
  async render(options: RenderOptions): Promise<RenderContext> {
    if (options.ssr !== false && !isSubAppReady()) {
      const ssrNames = this._getSSRSubAppNames();
      // make sure the subapps this render depends on are ready
      const readyNames = await subAppReady(ssrNames);
      const badNames = ssrNames.filter((sn) => !readyNames.includes(sn));

      if (badNames.length > 0) {
        throw new Error(
          "PageRenderer.render failed wait ready for these subapps. Please check names in 'subApps' options: " +
            badNames.join(", ")
        );
      }
      // In case there are other subapps that are not ready,
      // asynchronously load all of them
      subAppReady(true, readyNames);
    }

    return await this._renderer.render(options);
  }
}
