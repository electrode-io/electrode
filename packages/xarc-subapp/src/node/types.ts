/**
 * Pass nonce info to xarc for generating script and style tags into the HTML
 */
export type NonceInfo = {
  /** insert nonce for script tags? default: `true` */
  script?: boolean;
  /** insert nonce for style tags? default: `true` */
  style?: boolean;

  /** nonce tokens */
  tokens: {
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

  /** script nonce options */
  nonce?: NonceInfo | boolean;
};
