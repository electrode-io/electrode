/** Optional features to install  */
export interface OptionalPackages {
  /** install flow */
  flow?: boolean;
  /** es lint formatting */
  eslint?: boolean;

  /** framework to enable browser testing */
  karma?: boolean;

  /** unit test framework */
  jest?: boolean;

  /** unit est framework */
  mocha?: boolean;

  /** enable 'react' or 'preact' */
  reactLib?: string;

  /** enable typescript */
  typescript?: boolean;

  /** enable sass */
  sass?: boolean | "stylus" | "scss" | "less"[];

  /** config paths for configuration of those packages */
  configPaths?: ConfigPaths;
}


export type ProcessEnvConfigs = {

  KARMA_BROWSER?: | "Chrome"
  | "ChromeCanary"
  | "ChromeHeadless"
  | "PhantomJS"
  | "Firefox"
  | "Opera"
  | "IE"
  | "Safari";
  SERVER_ES6?: boolean;
  ELECTRODE_DEV_OPEN_BROWSER?: boolean;
  _ELECTRODE_DEV_?: boolean;
  STATIC_FILES?: boolean;
  ENABLE_KARMA_COV?: boolean;
  NODE_ENV?: string;
  WEBPACK_DEV?: boolean;
  HOST?: string;
  PORT?: number;
};

export type CreateXarcOptions = {
  /* list of @xarc/opt-[scss|mocha|jest|eslint] packages to include */
  electrodePackages?: string[];
  /** list of @xarc/opt-[scss|mocha|jest|eslint] packages in dev dependency */
  electrodePackagesDev?: string[];
  /** enable the interactive mode to enable optional features */
  enableFeatures?: boolean;
  /** use xclap/xrun instead of gulp */
  assertNoGulpExecution?: boolean;
  /** list of @optionalPackages */
  options?: OptionalPackages;
  /** config files */
  configPaths?: {
    babel?: string;
    eslint?: string;
    karma?: string;
    mocha?: string;
    webpack?: string;
    jest?: string;
  }
};

export type XarcUserConfigs = CreateXarcOptions &
  ProcessEnvConfigs & {
    webpack?: WebpackConfig;
    babel?: BabelConfigs;
    karma?: KarmaConfigs;
    enableCssModule?: boolean | "stylus" | "scss" | "less"[];
  };
export interface ConfigPaths {
  babel?: string;
  eslint?: string;
  karma?: string;
  mocha?: string;
  webpack?: string;
  jest?: string;
}

export interface BabelConfigs {

  /** enable typescript */
  enableTypeScript?: boolean;
  /*only download javascript that user will need*/
  enableDynamicImport?: boolean;
  /* flow uses data flow analysis to infer types and track data.. */
  enableFlow?: boolean;
  /* enables @babel/plugin-transform-flow-strip-types */
  flowRequireDirective?: boolean;

  /** @babel/plugin-proposal-decorators */
  proposalDecorators?: boolean;

  /* whether to use the legacy (stage 1) decorators syntax and behavior. */
  legacyDecorators?: boolean;

  /*transforms class props*/
  transformClassProps?: boolean;

  /*transforms class props with Object.defineProperty*/
  looseClassProps?: boolean;

  /* babel env target*/
  envTargets?: {
    default?: {};
    node?: {};
  };

  /**  browserlist target*/
  target?: string | Array<string>;
  /** babel loader for multi target */
  extendLoader?: {};
}

/** list of browsers to load Karma unit tests on */
export type AutomatedBrowsers =
  | "Chrome"
  | "ChromeCanary"
  | "ChromeHeadless"
  | "PhantomJS"
  | "Firefox"
  | "Opera"
  | "IE"
  | "Safari";
export interface KarmaConfigs {
  browser: AutomatedBrowsers;
}


export interface WebpackConfig {
  /* Webpack dev-sever configuration */
  webpackDev?: boolean;
  devHostname?: string;
  devPort?: number;

  /* used for mock-cdn: simulated cdn hosting on webpack dev server*/
  cdnProtocol?: string;
  cdnHostname?: string;
  cdnPort?: number;

  /*location of hmr and stats.json*/
  devArtifactsPath?: string;

  /** load css module */
  cssModuleSupport?: boolean | "css" | "style" | "scss" | "less"[];

  /** enable @babel/polyfill */
  enableBabelPolyfill?: boolean;

  /** Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser */
  enableNodeSourcePlugin?: boolean;

  /** Enable Webpack's HotModuleReload to watch fsevents and trigger devserver reload on code change*/
  enableHotModuleReload?: boolean;
  enableWarningsOverlay?: boolean;

  /** application/font-woff file loader limit */
  woffFontInlineLimit?: number;

  /** https://webpack.js.org/configuration/resolve/#resolve-symlinks */
  preserveSymlinks?: boolean;

  /** Tell Electrode app archetype that you want to shorten css names under production env */
  enableShortenCSSNames?: boolean;

  /** code split subapp js with their separate entry point to optimize load time */
  minimizeSubappChunks?: boolean;

  /**  */
  optimizeCssOptions?: {
    zindex: boolean;
  };
  loadDlls?: {};
  minify?: boolean;
}

export interface AppMode {
  lib: {
    dir: string;
    client: string;
    server: string;
  };
  src: {
    dir: string;
    client: string;
    server: string;
  };
}

export const defaultAppMode: AppMode = {
  lib: {
    dir: "./lib",
    client: "./lib/client",
    server: "./lib/server"
  },
  src: {
    dir: "./src",
    client: "./src/client",
    server: "./src/server"
  }
};

export const defaultKarmaOptions: KarmaConfigs = {
  browser: "Chrome"
};
export const defaultWebpackConfig: WebpackConfig = {
  webpackDev: false,
  devHostname: "localhost",
  devPort: 2992,
  cdnProtocol: null,
  cdnHostname: null,
  cdnPort: 0,
  devArtifactsPath: ".etmp",
  enableBabelPolyfill: false,
  enableNodeSourcePlugin: false,
  enableHotModuleReload: true,
  woffFontInlineLimit: 1000,
  preserveSymlinks: false,
  enableShortenCSSNames: true,
  minimizeSubappChunks: false,
  optimizeCssOptions: {
    zindex: false
  },
  loadDlls: {},
  minify: true
};

export const defaultBabelConfig: BabelConfigs = {
  enableTypeScript: true,
  enableDynamicImport: false,
  enableFlow: true,
  proposalDecorators: false,
  legacyDecorators: true,
  transformClassProps: false,
  looseClassProps: true,
  envTargets: {
    default: {
      ie: "8"
    },
    node: {
      node: 10
    }
  },
  target: "default",
  extendLoader: {}
};
export const defaultCreateXarcOptions: CreateXarcOptions = {
  electrodePackages: [],
  electrodePackagesDev: [],
  enableFeatures: true,
  assertNoGulpExecution: true,
};
export const defaultUserConfig: XarcUserConfigs = {
  ...defaultCreateXarcOptions,
  webpack: defaultWebpackConfig,
  babel: defaultBabelConfig,
  karma: defaultKarmaOptions
};
