// options from ../env-babel.ts

/**
 * configurable options related to transpiler (babel)
 */
export type BabelOptions = {
  /**
   * enable support for typescript types using `@babel/preset-typescript`
   *
   * @remarks
   *  transpile only, no type checking
   *
   * - **Default: true**
   * - if not set, then we check env `ENABLE_BABEL_TYPESCRIPT`
   */
  enableTypeScript?: boolean;

  /**
   * Enable support for stripping flow.js types using `@babel/plugin-transform-flow-strip-types`
   *
   * @remarks
   *  transpile only, no type checking
   *
   * - **Default: `false`**
   * - if not set, then we check env `ENABLE_BABEL_FLOW`
   *
   * requireDirective behavior (defaulted to **NOT** required):
   *
   * - When this plugin is enabled, it's defaulted to not require the `@flow` directive in source.
   * - To change this behavior, set this option to `{ requireDirective: true }`
   */
  enableFlow?: boolean | { requireDirective: boolean };

  // DEPRECATE: flowRequireDirective?: boolean;

  /**
   * Add `@babel/plugin-proposal-decorators`
   * - **Default: `false`**
   * - if not set, then we check env `BABEL_PROPOSAL_DECORATORS`
   *
   * legacyDecorators behavior (default to enabled):
   *
   * - When this plugin is enabled, it's defaulted to legacy decorators behavior.
   * - To change this behavior, set this option to `{ legacy: false }`
   */
  proposalDecorators?: boolean | { legacy: boolean };

  // DEPRECATE: legacyDecorators?: boolean;

  /**
   * Add `@babel/plugin-proposal-class-properties` for class properties support
   * - **Default: `false`**
   * - if not set, then we check env `BABEL_CLASS_PROPS`
   *
   * looseClassProps behavior (default to enabled):
   *
   * - When this plugin is enabled, it's defaulted to loose class props setting, which compile to
   *   assignment expression instead of `Object.defineProperty`
   * - To change loose class props behavior, set this option to `{ loose: false }`,
   */
  transformClassProps?: boolean | { loose: boolean };

  /**
   * List of RegExp to match files that should be included for transpiling.
   *
   * By default, files under node_modules are not transpiled.
   *
   * You can set this to control that.  ie: to compile everything under node_modules, use `[/node_modules/]`
   */
  includeRegExp?: RegExp[];

  /**
   * List of RegExp to match files that should not be transpiled by babel.
   *
   * This is checked after includeRegExp
   */
  excludeRegExp?: RegExp[];

  // DEPRECATE: looseClassProps?: boolean;

  // DEPRECATE:
  //   envTargets?: {
  //     default?: {};
  //     node?: {};
  //   };

  // DEPRECATE:  target?: string | string[];

  // DEPRECATE: extendLoader?: {};
};
