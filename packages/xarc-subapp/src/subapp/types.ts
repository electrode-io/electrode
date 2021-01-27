/* eslint-disable no-use-before-define */

import { SubAppRenderPipeline } from "./subapp-render-pipeline";

export type CDNData = {
  /** mapping data */
  md: Record<string, any>;
};

export type _xarcV2RunTimeInfo = {
  instId: number;
  subApps: Record<string, any>;
  onLoadStart: Record<string, any>;
  started: boolean;
  /** CDN mapping data */
  md: Record<string, any>;
};

/**
 * xarc subapp version client interface
 */
export interface XarcSubAppClientV2 {
  IS_BROWSER: boolean;
  HAS_WINDOW: boolean;
  version: number;
  rt: _xarcV2RunTimeInfo; // run time info

  /**
   * Initialize CDN mapping
   *
   * @param data - data to initialize with
   */
  cdnInit(data: CDNData): void;

  /**
   * Add CDN mapping data from data into the CDN mapping for looking up assets
   *
   * @param data - CDN data
   * @param replace - replace existing entry?
   */
  cdnUpdate(data: CDNData, replace: boolean): void;

  /**
   * Map an asset name to its CDN version
   *
   * @param name - asset name to map
   */
  cdnMap(name: string): string;
  getOnLoadStart(name: string): any[];
  addOnLoadStart(name: string, load: any): void;
  startSubAppOnLoad(options: any, data: any): void;
  start(): Promise<any>;
  _start(ignore: string[], callDepth: number): Promise<any>;

  /**
   * Need this for node.js.  While chrome dev tools allow setting console level, node.js'
   * console.debug is just an alias for console.log.
   */
  debug(...args: any[]): void;

  /**
   * Extract JSON data from a script tag
   *
   * @param id - script element id
   * @returns the data extracted
   */
  dyn(id: string): unknown;
}

/**
 * Options for calling declareSubApp
 */
export type SubAppOptions = {
  /**
   * Name of the subapp
   *
   * - This will be used to name the JS bundle
   * - It must follow valid filename format, avoid space and special characters
   *
   */
  name: string;

  /**
   * The dynamic import promise for the subapp's module, or a function that returns it
   */
  getModule: Promise<any> | (() => Promise<any>);

  /**
   * The name of the export for the subapp from the module.
   *
   * - default to `subapp`
   * - then `default`
   * - If it's `false`, then this subapp is treated as having no UI logic.
   *
   */
  resolveName?: string | false;

  /**
   * _optional_ webpack bundle name for the subapp
   *
   * - By default, xarc will create one like `"subapp-<name>"`
   * - Use this if you want to override it, such as to combine multiple subapps
   *   a single bundle.
   */
  bundleName?: string;

  /**
   * Extra features that the subapp wants.  Should be initialized with the feature provider function
   *
   * - The intent is to allow a module to provide one or more features for a subapp.
   *
   * - Typically the feature needs to have implementation for server and client side, and exposed
   *   through the main/browser fields in package.json.
   *
   * - The feature is access through an API function.  The API should return another
   *   function to be called by the subapp system later, and the subapp's info will be
   *   passed.
   */
  wantFeatures?: SubAppFeatureFactory[];

  /**
   * File name of the module that declares the subapp.
   *
   * - Only required for server side rendering (SSR).
   * - Typically just set it to `__filename`, which webpack set to `"/<file>"` for client side bundle.
   * - If not set, then xarc will figure it out through webpack compiling.
   * - But webpack compiling is not 100%, so setting it yourself guarantees it.
   *
   */
  __filename?: string;
};

/**
 * SubApp client side rendering data
 */
export type SubAppCSRData = LoadSubAppOptions & {
  element?: Element;
  elementId?: string;
  getInitialState?(): any;
};

export type SubAppStartParams = {
  /** server side render data */
  ssrData?: SubAppSSRData;
  /** client side render data */
  csrData?: SubAppCSRData;
};

export type PipelineFactoryParams = SubAppStartParams;

/**
 * definition of a subapp from declareSubApp
 */
export type SubAppDef = SubAppOptions & {
  /**
   * Unique definition ID, if a subapp with same name is re-declared then it will have a diff _id
   */
  _id: number;
  /**
   * handle loading the subapp's module
   */
  _getModule: () => Promise<any>;
  /**
   * The module that implements the subapp
   */
  _module: any;
  /**
   * Indicate if this subapp involves being used in any server side rendering
   * TODO: this is not the right place for this?  Since different routes could be using the
   * same subapp def but not for SSR.
   */
  _ssr: boolean;
  /**
   * SubApp's start method that declareSubApp will create, with versions
   * for browser or node.js.
   *
   * - Browser: the browser subapp shell will call this from start.
   * - Node.js: load-v2.ts in node dir will call this during SSR.
   *
   * @param options
   */
  _start?(params: SubAppStartParams, reload?: boolean): Promise<any>;

  /**
   * Handles HMR on client side
   *
   * @param subAppName
   * @param modName
   */
  _reload?(subAppName: string, modName?: string): Promise<any>;

  /**
   * Features this subapp wants
   */
  _features?: Record<string, SubAppFeature>;

  /**
   * Create a render pipeline
   *
   * The respective env/framework specific implementation should set this accordingly
   */
  _pipelineFactory?: (params: PipelineFactoryParams) => SubAppRenderPipeline;

  /**
   * factory to return a framework object for the running env.  it's unknown because we don't know
   * what the env or the framework could be.
   */
  _frameworkFactory?: () => unknown;

  /** For UI component instance to let the subapp know it's mounting to the subapp */
  _mount?(info: SubAppMountInfo): void;

  /** For UI component instance to let the subapp know it's unmounting from the subapp */
  _unmount?(info: SubAppMountInfo): void;

  /**
   * Holds rendering pipeline instances for this subapp.
   *
   * This is only used on client side.  On server side, there are multiple page rendering for
   * multiple requests.  We need to maintain and manage the pipelines for each request.  So
   * they are stored in their owning request object.
   */
  _renderPipelines?: SubAppRenderPipeline[];

  /**
   * Get the export subapp object from the module
   */
  _getExport?: <T>() => SubApp<T>;
};

/**
 * Declare what info a subapp feature should have
 */
export type SubAppFeatureInfo = {
  /**
   * Unique ID to identify the feature.  There could be multiple implementations of a feature
   */
  id: string;

  /**
   * sub id to identify a particular implementation of a feature.
   *
   */
  subId?: string;
};

/**
 * Declare a subapp feature factory
 */
export interface ISubAppFeatureFactory {
  /**
   * Function to add the feature to a subapp definition
   */
  add: (subappDef: SubAppDef) => SubAppDef;
}

/**
 * What a subapp feature should provide
 */
export type SubAppFeatureFactory = ISubAppFeatureFactory & SubAppFeatureInfo;

export type SubAppFeatureResult = {
  Component?: any;
  props?: any;
};

export type SubAppFeatureExecuteParams = {
  input: SubAppFeatureResult;
  ssrData?: SubAppSSRData;
  csrData?: SubAppCSRData;
  reload?: boolean;
};

/**
 * Declare the implementation of a subapp feature
 */
export interface ISubAppFeature {
  /**
   * execute the feature for the subapp
   */
  execute(param: SubAppFeatureExecuteParams): SubAppFeatureResult | Promise<SubAppFeatureResult>;
}

export type SubAppFeature = ISubAppFeature & SubAppFeatureInfo;

/**
 * Options for loading a subapp into a page
 *
 * The subapp should've been declared.
 */
export type LoadSubAppOptions = {
  /**
   * Name of the subapp to load
   */
  name: string;

  /**
   * Enable server side rendering for the subapp
   */
  ssr?: boolean;

  /**
   * If SSR, set this to `true` to prepare subapp's data only but don't actually do render to string.
   */
  prepareOnly?: boolean;

  /**
   * ID for the subapp inlined as a component.
   *
   * For now, any non-empty string ID will do.
   */
  inlineId?: string;

  /**
   * group the subapp belongs to
   */
  group?: string;
};

/**
 * Type of Component that's mounting a subapp
 *
 * - `dynamic` - using subapp as a plain dynamic import component
 * - `inline` - inline nesting a subapp within another as a component
 * - `start` - as a start component for the subapp to handle hot reload
 *
 */
export type MountType = "dynamic" | "inline" | "start";

/**
 * For a UI component to let the subapp know it has mount itself for the subapp
 */
export type SubAppMountInfo = {
  /** The UI component instance that's mount to the subapp */
  component: any;
  /** The subapp that the UI component instance mount to */
  subapp: SubAppDef;

  /** type of component trying to mount to the subapp */
  type?: MountType;
};

/**
 * A subapp
 */
export type SubApp<ComponentType> = {
  /**
   * The component for this subapp.
   *
   * If it's undefined, then this subapp is treated to have no UI component
   *
   */
  Component?: ComponentType;

  /**
   * Extra features that the subapp wants.  Should be initialized with the feature provider function
   *
   * - The intent is to allow a module to provide one or more features for a subapp.
   *
   * - Typically the feature needs to have implementation for server and client side, and exposed
   *   through the main/browser fields in package.json.
   *
   * - The feature is access through an API function.  The API should return another
   *   function to be called by the subapp system later, and the subapp's info will be
   *   passed.
   */
  wantFeatures?: SubAppFeatureFactory[];
};

/**
 * container of declared subapps
 */
export class SubAppContainer {
  readyCount: number;
  declareCount: number;
  $: Record<string, SubAppDef>;

  constructor(store: Record<string, SubAppDef>) {
    this.readyCount = this.declareCount = 0;
    this.$ = store;
  }

  get(name: string): SubAppDef {
    return this.$[name];
  }

  declare(name: string, subapp: SubAppDef): SubAppDef {
    this.$[name] = subapp;
    this.declareCount = this.getNames().length;
    this.updateReady();
    return subapp;
  }

  isReady():boolean {
    return this.readyCount === this.declareCount;
  }

  updateReady():void {
    this.readyCount = 0;
    for (const name in this.$) {
      if (this.$[name]._module) {
        this.readyCount++;
      }
    }
  }

  getNames():string[] {
    return Object.keys(this.$);
  }
}

/**
 * potential data for doing server side rendering
 */
export type SubAppSSRData = {
  /**
   * RenderContext from `@xarc/render-context`
   *
   * TODO: need to type this
   */
  context: any;
  subapp: SubAppDef;
  options: LoadSubAppOptions;
  request?: any;
  path?: string;
  params?: Record<string, string>;
  query?: Record<string, string>;
};
