# Electrode Archetype Option Inferno

Allow [Electrode](https://github.com/electrode-io/electrode) apps to optionally choose to use the [inferno](https://github.com/infernojs/inferno) lib.

The app can set React lib by adding a file `archetype/config/index.js` or `archetype/config.js` and set:

```js
module.exports = {
  options: {
    reactLib: "inferno"
  }
};
```

This module only installs if `reactLib` is set to `inferno`.

# Usage

This module generally is included by other Electrode modules.  An Electrode app should not need to install this directly.

## Install

In `package.json`:

```js
{
  "optionalDependencies": {
    "electrode-archetype-opt-inferno": "^0.1.0"
  }
}
```

And setup archetype config accordingly.

## License

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.
