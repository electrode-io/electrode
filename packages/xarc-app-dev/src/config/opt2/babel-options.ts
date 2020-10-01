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
  // DEPRECATE: enableDynamicImport?: boolean;

  /**
   * Enable support for stripping flow.js types using `@babel/plugin-transform-flow-strip-types`
   *
   * @remarks
   *  transpile only, no type checking
   *
   * - **Default: `false`**
   * - if not set, then we check env `ENABLE_BABEL_FLOW`
   * - To require the `@flow` directive in source, set it to `{ requireDirective: true }`
   */
  enableFlow?: boolean | { requireDirective: boolean };

  // DEPRECATE: flowRequireDirective?: boolean;

  /**
   * Add `@babel/plugin-proposal-decorators`
   * - **Default: `false`**
   * - To use the legacy decorators behavior, set it to `{ legacy: true }`
   * - if not set, then we check env `BABEL_PROPOSAL_DECORATORS`
   */
  proposalDecorators?: boolean | { legacy: boolean };

  // DEPRECATE: legacyDecorators?: boolean;

  /**
   * Add `@babel/plugin-proposal-class-properties` for class properties support
   * - **Default: `false`**
   * - To use loose class props behavior, set it to `{ loose: true }`, which compile to
   *   assignment expression instead of `Object.defineProperty`.
   * - if not set, then we check env `BABEL_CLASS_PROPS`
   */
  transformClassProps?: boolean | { loose: boolean };

  // DEPRECATE: looseClassProps?: boolean;

  // DEPRECATE:
  //   envTargets?: {
  //     default?: {};
  //     node?: {};
  //   };

  // DEPRECATE:  target?: string | string[];

  // DEPRECATE: extendLoader?: {};
};
