/// <reference types="node" />
import { PathLike } from "fs";
export declare type CreateXarcOptions = {
    electrodePackages?: string[];
    electrodePackagesDev?: string[];
    enableFeatures?: boolean;
    assertNoGulpExecution?: boolean;
    assertDevArchetypePresent?: boolean;
    options?: OptionalPackages;
    configPaths?: ConfigPaths;
};
export declare type PORT_NUMBER = number;
export declare type ProcessEnvConfigs = {
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
export declare type XarcUserConfigs = CreateXarcOptions & ProcessEnvConfigs & {
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
export interface OptionalPackages {
    flow?: boolean;
    eslint?: boolean;
    karma?: boolean;
    jest?: boolean;
    mocha?: boolean;
    reactLib?: string;
    typescript?: boolean;
    configPaths?: ConfigPaths;
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
export declare type AutomatedBrowsers = "Chrome" | "ChromeCanary" | "ChromeHeadless" | "PhantomJS" | "Firefox" | "Opera" | "IE" | "Safari";
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
export declare const defaultAppMode: AppMode;
export declare const defaultKarmaOptions: KarmaConfigs;
export declare const defaultWebpackConfig: WebpackConfig;
export declare const defaultBabelConfig: BabelConfigs;
export declare const defaultCreateXarcOptions: CreateXarcOptions;
export declare const defaultUserConfig: XarcUserConfigs;
export declare const syncProcessEnvVars: (xarcUserConfig: XarcUserConfigs) => XarcUserConfigs;
export declare const syncMiscProcessEnvs: (xarcUserConfig: XarcUserConfigs) => XarcUserConfigs;
export declare const mergeOptionalCheck: (xarcUserConfig: XarcUserConfigs) => XarcUserConfigs;
