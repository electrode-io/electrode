import { PathLike } from "fs";

export type CreateXarcOptions = {
  electrodePackages?: string[];
  electrodePackagesDev?: string[];
  enableFeatures?: boolean;
  assertNoGulpExecution?: boolean;
  assertDevArchetypePresent?: boolean;
  options?: OptionalPackages;
  configPaths?: ConfigPaths;
};
export interface OptionalPackages {
  flow?: boolean;
  eslint?: boolean;
  karma?: boolean;
  jest?: boolean;
  mocha?: boolean;
  reactLib?: string;
  typescript?: boolean;
  sass?: boolean;

  configPaths?: ConfigPaths;
}
export type PORT_NUMBER = number;

export type ProcessEnvConfigs = {
  KARMA_BROWSER?: AutomatedBrowsers;
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

export type XarcUserConfigs = CreateXarcOptions &
  ProcessEnvConfigs & {
    webpack?: WebpackConfig;
    babel?: BabelConfigs;
    karma?: KarmaConfigs;
    enableCssModule?: boolean;
  };
export interface ConfigPaths {
  babel: PathLike;
  eslint: PathLike;
  karma: PathLike;
  mocha: PathLike;
  webpack: PathLike;
  jest: PathLike;
}

export interface BabelConfigs {
  enableTypeScript?: boolean;
  enableDynamicImport?: boolean;
  enableFlow?: boolean;
  flowRequireDirective?: boolean;
  proposalDecorators?: boolean;
  legacyDecorators?: boolean;
  transformClassProps?: boolean;
  looseClassProps?: boolean;
  envTargets?: {
    default?: {};
    node?: {};
  };
  target?: string;
  extendLoader?: {};
}
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
  webpackDev?: boolean;
  devHostname?: string;
  devPort?: number;
  cdnProtocol?: string;
  cdnHostname?: string;
  cdnPort?: number;
  devArtifactsPath?: string;
  cssModuleSupport?: boolean;
  enableBabelPolyfill?: boolean;
  enableNodeSourcePlugin?: boolean;
  enableHotModuleReload?: boolean;
  enableWarningsOverlay?: boolean;
  woffFontInlineLimit?: number;
  preserveSymlinks?: boolean;
  enableShortenCSSNames?: boolean;
  minimizeSubappChunks?: boolean;
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
  assertDevArchetypePresent: true
};
export const defaultUserConfig: XarcUserConfigs = {
  ...defaultCreateXarcOptions,
  webpack: defaultWebpackConfig,
  babel: defaultBabelConfig,
  karma: defaultKarmaOptions
};
