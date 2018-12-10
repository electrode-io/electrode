# Flow and TypeScript

Electrode Archetype supports writing TypeScript or Flow out of the box.

- Flow is enabled by default since we were able to add it first with babel 6, while TypeScript was not supported until babel 7.
- TypeScript is disabled by default.
- You can enable both at the same time, but it's best to pick one and stick with it.
  - With both enabled, you must have the `// @flow` directive in your code to enable Flow for each file.
  - Type checking doesn't work (yet?) if you mix Flow and TypeScript.
- TypeScript files must have the extension `ts` or `tsx`

## Flow

### Options

The archetype takes two options for Flow.

- Through Environment Variables

  - enabling/disabling: `export ENABLE_BABEL_FLOW=false` (Default: `true`)
  - requring directive: `export FLOW_REQUIRE_DIRECTIVE=true`
    - Always `true` if TypeScript is enabled, else default to `false`.

- Through config file in `archetype/config/index.js`:

```js
module.exports = {
  babel: {
    enableFlow: false,
    flowRequireDirective: false
  }
};
```

## TypeScript

Some things to be aware of:

- Your TypeScript code is transpiled with babel, with the following caveats:
  - Types are not checked
  - No namespaces
  - No bracket style type-assertion/cast syntax regardless of when JSX is enabled (i.e. writing `<Foo>x` won’t work even in `.ts` files if JSX support is turned on, but you can instead write `x as Foo`).
  - No enums that span multiple declarations (i.e. enum merging)
  - No legacy-style import/export syntax (i.e. `import foo = require(...)` and `export = foo`)

See Microsoft's [blog on typescript and babel] for more details.

### Options

You can enable/disable TypeScript support with the following options:

- Env Variable: `export ENABLE_BABEL_TYPESCRIPT=false`
- Config file in `archetype/config/index.js`:

```js
module.exports = {
  babel: {
    enableTypeScript: false
  }
};
```

> Set the value to `true` to enable.

[blog on typescript and babel]: https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/
