import constants from "@xarc/app/lib/constants";
import { PathLike } from "fs";

export interface AppDevArchetype {
  config?: ArchetypeOptions;
  webpack?: WebpackOptions;
  babel?: BabelOptions;
  karma?: KarmaOptions;
  appMode?: AppMode;
  prodDir?: string;
  eTmpDir?: string;
  electrodePackages?: [];
  electrodePackagesDev?: [];
  enableFeatures?: boolean;
  assertNoGulpExecution?: boolean;
  assertDevArchetypePresent?: boolean;
}

export interface BabelEnvTargets {
  default?: {};
  node?: {};
}

export interface BabelOptions {
  enableTypeScript?: boolean;
  enableDynamicImport?: boolean;
  enableFlow?: boolean;
  flowRequireDirective?: boolean;
  proposalDecorators?: boolean;
  legacyDecorators?: boolean;
  transformClassProps?: boolean;
  looseClassProps?: boolean;
  envTargets?: BabelEnvTargets;
  target?: string;
  extendLoader?: {};
}

export interface WebpackOptions {
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
export interface BabelOptions {
  enableTypeScript?: boolean;
  enableDynamicImport?: boolean;
  enableFlow?: boolean;
  flowRequireDirective?: boolean;
  proposalDecorators?: boolean;
  legacyDecorators?: boolean;
  transformClassProps?: boolean;
  looseClassProps?: boolean;
  envTargets?: BabelEnvTargets;
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
export interface KarmaOptions {
  browser: AutomatedBrowsers;
}

export interface ArchetypeOptions {
  flow?: boolean;
  eslint?: boolean;
  karma?: boolean;
  jest?: boolean;
  mocha?: boolean;
  reactLib?: string;
  typescript?: boolean;
  configPaths?: PathLike[];
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
export const defaultArchetypeOptions: ArchetypeOptions = {
  flow: true,
  eslint: true,
  karma: false,
  jest: true,
  mocha: false,
  reactLib: "react",
  typescript: false
};
export const defaultKarmaOptions: KarmaOptions = {
  browser: "Chrome"
};
export const defaultWebpackConfig: WebpackOptions = {
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

export const defaultBabelConfig: BabelOptions = {
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

export const getDefaultAppDevArchetype = () => {};
export const defaultAppDevArchetype: AppDevArchetype = {
  prodDir: ".prod",
  eTmpDir: ".etmp",
  config: defaultArchetypeOptions,
  webpack: defaultWebpackConfig,
  babel: defaultBabelConfig,
  karma: defaultKarmaOptions,
  appMode: defaultAppMode,
  electrodePackages: [],
  electrodePackagesDev: [],
  enableFeatures: true,
  assertNoGulpExecution: true,
  assertDevArchetypePresent: true
};
