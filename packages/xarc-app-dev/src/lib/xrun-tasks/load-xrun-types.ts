const userConfig = require("./user-config")();
const { options } = userConfig;

export interface CSSProcessorOptions {
  zindex: boolean;
}
export interface WebpackOptions {
  webpackDev?: boolean;
  devHostname?: string;
  devPort?: number;
  cdnProtocol?: string;
  cdnHostname?: string;
  cdnPort: number;
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
  optimizeCssOptions?: CSSProcessorOptions;
  loadDlls?: {};
  minify?: boolean;
}

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
export const defaultBabelConfig: BabelOptions = {
  enableTypeScript: options.typescrit || false,
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
      node: process.versions.node.split(".")[0]
    }
  },
  target: "default",
  extendLoader: {}
};
export interface ConnectionOptions {}
export interface CritCssOptions {}
export type ArchetypeOptions2 = WebpackOptions | BabelOptions | ConnectionOptions | CritCssOptions;

export type ArchetypeOptions = {
  webpack?: WebpackOptions;
  babel?: WebpackOptions;
  connection?: ConnectionOptions;
  critCss?: CritCssOptions;
};
export type LoadXrunFunction = (options: ArchetypeOptions) => void;
