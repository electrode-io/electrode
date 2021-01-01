/* eslint-disable new-cap */

import { RenderContext } from "@xarc/render-context";
import { createTemplateTags, TokenInvoke, TagRenderer } from "@xarc/tag-renderer";

import {
  initSubApp,
  loadSubApp,
  startSubApp,
  isSubAppReady,
  subAppReady,
  LoadSubAppOptions,
  InitProps,
  NonceInfo
} from "./index";

/**
 * allow setting template fragments to be inserted into various predefined points
 * in the main template for rendering the HTML
 */
export type TemplateInserts = {
  head?: {
    /** insert immediately after <head> */
    begin?: any[];
    /** insert immediately before </head> */
    end?: any[];
    /** insert immediately after xarc's subapp init scripts */
    afterInit?: any[];
  };
  body?: {
    /** insert immediately after <body> */
    begin?: any[];
    /** insert immediately before </body> */
    end?: any[];
    /** insert immediately before the starting subapps code */
    beforeStart?: any[];
    /** insert immediately after the starting subapps code */
    afterStart?: any[];
  };
};

export type PageOptions = InitProps & {
  /**
   * Name of subapps to load and render on the page
   */
  subApps: LoadSubAppOptions[];

  /**
   * title for the page
   */
  pageTitle?: string;

  /**
   * Path or URL to a favicon for the page
   */
  favicon?: string;

  /** meta charset, default: "UTF-8", set to false to disable */
  charSet?: string | boolean;

  /**
   * Allows you to insert template tags at some predefined locations within the
   * main template.  You can create template tags with the createTemplateTags API.
   */
  templateInserts?: TemplateInserts;

  /**
   * Nonce info for script and style tags.
   *
   * By default, renderPage will always generate nonce for your page.
   *
   * - You can pass in NonceInfo to customize the token value.
   * - If you really don't want nonce generated, then pass `false`
   */
  nonce?: boolean | NonceInfo;
};

/**
 * Options for rendering a page for each request
 */
export type RenderOptions = {
  /**
   * Your HTTP framework's request object.  Will be passed into UI components as is
   * through React context.
   */
  request?: any;
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
      nonce,
      prodAssetData,
      devAssetData,
      templateInserts: { head = {}, body = {} } = {}
    } = options;

    const { charSet = "UTF-8" } = options;

    const charSetStr = charSet ? `\n<meta charset="${charSet}">\n` : "";

    const initProps: InitProps = { prodAssetData, devAssetData, nonce };

    this._template = createTemplateTags`<!doctype html>
<html>
<head>${charSetStr}
${head.begin}
${options.pageTitle && `<title>${options.pageTitle}</title>`}
${TokenInvoke(initSubApp, initProps)}
${head.afterInit}
${head.end}
</head>
<body>
${body.begin}
${subApps.map(sa => TokenInvoke(loadSubApp, sa))}
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
    return subApps.map(s => s.ssr && s.name).filter(x => x);
  }

  /**
   * Render index.html with subapps
   *
   * @returns Promise<RenderContext>
   */
  async render(options: RenderOptions): Promise<RenderContext> {
    if (!isSubAppReady()) {
      await subAppReady(this._getSSRSubAppNames());
    }

    return await this._renderer.render(options);
  }
}
