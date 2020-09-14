import constants from "@xarc/app/lib/constants";
import { AutomatedBrowsers } from "karma";

export interface AppDevArchetype {
  config?: ArchetypeOptions;
  webpack?: WebpackOptions;
  babel?: BabelOptions;
  karma?: KarmaOptions;
  appMode?: AppMode;
  prodDir?: string;
  eTmpDir?: string;
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
export interface KarmaOptions {
  browser: AutomatedBrowsers;
}

export interface ArchetypeOptions {
  flow: boolean;
  eslint: boolean;
  karma: boolean;
  jest: boolean;
  mocha: boolean;
  reactLib: string;
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
  reactLib: "react"
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
  prodDir: constants.PROD_DIR,
  eTmpDir: constants.ETMP_DIR,
  config: defaultArchetypeOptions,
  webpack: defaultWebpackConfig,
  babel: defaultBabelConfig,
  karma: defaultKarmaOptions,
  appMode: defaultAppMode
};
