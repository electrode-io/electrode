/**
 * Options for specifying a shared module for webpack5's ModuleFederationPlugin
 *
 * See docs at https://webpack.js.org/concepts/module-federation/
 */
export type ModuleShareOptions = {
  requiredVersion?: string;
  import?: string;
  shareKey?: string;
  shareScope?: string;
  singleton?: boolean;
  eager?: boolean;
};

/**
 * Options for exposing or consuming remote subapps using webpack5 ModuleFederationPlugin
 *
 * See docs at https://webpack.js.org/concepts/module-federation/
 */
export type RemoteSubAppOptions = {
  /**
   * Name of the remote entry
   *
   * The name must only contain characters valid for a JavaScript variable name (identifier).
   *
   * These character are automatically replaced with _: '-'
   *
   */
  name?: string;
  /**
   * Name the remote entry JS file
   *
   * If it's not specified, then one is generated like this:
   *
   * `_remote_~.${name}.js`
   *
   * Where name is the original name without the `_` replacement.
   *
   */
  filename?: string;
  /**
   * Name of the subapps to expose
   *
   * Each subapp will be exposed remotely and available as `'./Name'`
   * - For example, the subapp `'Deal'` would be exposed as a module `'./Deal'`
   *
   */
  subAppsToExpose: string[];

  /**
   * Directly specify exposes config according to webpack5 ModuleFederationPlugin options.
   *
   * See https://webpack.js.org/concepts/module-federation/
   */
  exposes?: Record<string, string>;
  /**
   * Specify share modules according to webpack5 ModuleFederationPlugin options
   *
   * See https://webpack.js.org/concepts/module-federation/
   *
   * @remark - If any modules is exposed remotely, then the option `eager` can't be true.
   * So it will be set to `false`, otherwise it will be set to `true`.
   *
   */
  shared?: Record<string, ModuleShareOptions>;
};
