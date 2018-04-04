# Electrode Archetype Option React

Allow [Electrode](https://github.com/electrode-io/electrode) apps to optionally choose to use the original React lib.

The app can set React lib by adding a file `archetype/config/index.js` or `archetype/config.js` and set:

```js
module.exports = {
  options: {
    reactLib: "react"
  }
};
```

If nothing is set, then default is to use `react`.

The other lib that is supported:

-   [inferno](https://github.com/infernojs/inferno).

Note that since many other modules could depend on the original React lib so even if an app choose to use inferno, the `react` modules could still be installed.

# Usage

This module generally is included by other Electrode modules.  An Electrode app should not need to install this directly.

## Install

In `package.json`:

```js
{
  "optionalDependencies": {
    "electrode-archetype-opt-react": "^1.0.0"
  }
}
```

And setup archetype config accordingly.

## License

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.
