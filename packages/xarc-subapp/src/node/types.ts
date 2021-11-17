/* eslint-disable max-statements */
import { SubAppSSRData, SubAppFeatureResult, LoadSubAppOptions } from "../subapp/types";

/**
 * Pass nonce info to xarc for generating script and style tags into the HTML
 */
export type NonceInfo = {
  /** insert nonce for script tags? default: `true` */
  script?: boolean;
  /** insert nonce for style tags? default: `true` */
  style?: boolean;

  /** nonce tokens */
  tokens?: {
    all?: string;
    script?: string;
    style?: string;
  };

  /** token generator */
  generator?: (tag?: string) => string;
};

/**
 * mapping of asset path by file extensions
 *
 * - extensions must have `.` prefix: `.js`
 * - `base` must be provided
 *
 * ie:
 * ```js
 * {
 *   base: "/assets",
 *   ".js": "/js",
 *   ".css": "/css"
 * }
 * ```
 */
export type AssetPathMap = {
  /** The common base path for all */
  base: string;
} & Record<string, string>;

/**
 * data for loading assets, including CDN mapping or base path mapping
 *
 * If CDN mapping is specified, then it will be used first, and then
 * the path mapping if nothing is found in CDN mapping.
 */
export type AssetData = {
  /** path to JSON file with CDN mapping data or the actual mapping data */
  cdnMap?: string | Record<string, string>;
  /** Mapping of base path for static assets.  default: `{ base: "/js" }` */
  pathMap?: AssetPathMap;
};

/**
 * SubApp page initialize props
 */
export type InitProps = {
  /**
   * asset loading data use when in production mode
   * ie: WEBPACK_DEV not defined
   */
  prodAssetData?: AssetData;
  /**
   * asset loading data use when in dev mode
   * ie: WEBPACK_DEV defined
   */
  devAssetData?: AssetData;

  /**
   * Nonce info for script and style tags.
   *
   * By default, renderPage will always generate nonce for your page.
   *
   * - You can pass in NonceInfo to customize the token value.
   * - If you really don't want nonce generated, then pass `false`
   */
  nonce?: boolean | NonceInfo;

  /**
   * namespace to load subapps under for the page
   *
   * **default** `"ns0"`
   */
  namespace?: string;
};

/**
 * result of server side rendering
 */
export type SubAppSSRResult = {
  /**
   * content of the rendering
   * TODO: types - could be string or a stream
   */
  content: any;

  /**
   * initialState props
   */
  props: any;
};

export interface ServerFrameworkLib {
  /**
   * Prepare a subapp's data and features for doing SSR.
   *
   * This is separate because preparing data is likely async and if app
   * requires using the sync `renderToString`, then it has to be in two
   * stages.
   *
   * @param data
   */
  prepareSSR?(data: SubAppSSRData): Promise<any>;

  /** async version of running actual SSR */
  handleSSR?(data: SubAppSSRData): Promise<SubAppSSRResult>;

  /**
   * Server side render a subapp sync.
   *
   * sync means the subapp's module must have been loaded
   *
   * @param data - ssr data
   */
  handleSSRSync?(data: SubAppSSRData, prepResult: SubAppFeatureResult): SubAppSSRResult;
}

/**
 * allow setting template fragments to be inserted into various predefined points
 * in the main template for rendering the HTML
 */
export type TemplateInserts = {
  head?: {
    /** insert immediately after <head> */
    begin?: any[];
    /** insert after context initialized and context.user available */
    contextReady?: any[];
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
};
