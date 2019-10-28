# webpack-config-composer

Flexibly configure, override, and compose webpack config partials.

To use, you add partials and profiles to the composer, and then you can selectively compose them into a single config object for webpack.

- Partials are snippets of webpack configs, each can be customized with options.
- Profiles contain list of partial names, each can be customized with more options.

You must add all partials to the composer first.

Profiles can be added to the composer first or passed in when doing compose.

## Usage

### Sample Partials

```js
const samplePartials = {
  samplePartial_1: {
    config: {
      plugins: [new WebpackPlugin()]
    }
  },
  samplePartial_2: {
    config: {
      entry: "./app.jsx",
      output: {
        filename: "bundle.js"
      }
    }
  }
};
```

### Sample Profiles

```js
const sampleProfiles = {
  sampleProfile1: {
    partials: {
      samplePartial_1: {
        order: 100
      },
      samplePartial_2: {
        order: 200
      }
    }
  },
  sampleProfile2: {
    partials: {
      fooPartial: {
        order: 100
      },
      barPartial: {
        order: 200
      }
    }
  }
};
```

### Sample Usage

```js
const composer = new WebpackConfigComposer();
composer.addPartials(samplePartials);
composer.addProfiles(sampleProfiles);
const webpackConfig = composer.compose(
  {},
  "sampleProfile1",
  "sampleProfile2"
);
```

### Customizing a composer

Taking a composer, you can:

- add, remove, replace, or modify a partial
- add or remove a partial from a profile
- add a new profile

Examples of customizing a partial in the composer:

```js
// replace
const partialWebpackConfig = { ... };
composer.replacePartial("partial-name", partialWebpackConfig);
// add
composer.addPartial("new-partial-name", partialWebpackConfig)
// modify a partial
const partial = composer.getPartial("some-partial");
partial.someProperty = "new value";
```

You can both add a partial and a profile at the same time:

```js
composer.addPartialToProfile("new-partial", "some-profile", partialWebpackConfig);
```

## Install

```bash
$ npm install --save-dev webpack-config-composer
```

## APIs

### `constructor WebpackConfigComposer(options)`

- `options.partials` - if exist, call with `this.addPartials`
- `options.profiles` - if exist, call with `this.addProfiles`
- `options.logger` - custom logger, default to `console.log`

### `composer.addPartials([array]|[object1, object2, ...])`

Add a list of partial objects to the composer in a single array or a list of arguments.

Each object should contain one or more partials.

See [Sample Partials](#sample-partials) for a basic sample.

See [Partial Objects](#partial-objects) for details.

### `composer.addProfiles([array]|[object1, object2, ...])`

Add a list of profile objects to the composer in a single array or a list of arguments.

Each object should contain one or more profiles.

See [Sample Profiles](#sample-profiles) for a basic sample.

See [Profile Objects](#profile-objects) for details.

### `composer.compose(options, [array]|[profile1, profile2, ...])`

Compose a list of profiles into a single config object.

- options - Object with options
  - `currentConfig` - Start currentConfig with this insead of `{}`
  - `skipNamePlugins` - If true, then don't set the `__name` of each plugin to the name of its constructor.
  - `keepCustomProps` - If true, then don't remove custom props (Props that have keys with `_` prefix).
  - `concatArray` - How handle arrays when merging partials into the config
    - `no` - Do not concat, replace arrays instead
    - `head` - concat to the head of existing array
    - `tail` - (default) concat to the tail of existing array

The profiles can be passed as a single array or a list of arguments.

Each profile can be a string that refers to the name of a profile already added, or an actual profile.

For example:

```js
const anotherProfile = {
  partials: {
    partial1: {}
  }
};

const webpackConfig = composer.compose(
  {},
  "profile1",
  "profile2",
  anotherProfile,
  "profile3",
  "profile4"
);
```

or:

```js
const webpackConfig = composer.compose(
  {},
  ["profile1", "profile2", anotherProfile, "profile3", "profile4"]
);
```

### `static WebpackConfigComposer.deleteCustomProps(webpackConfig)`

Deletes all [custom props](#custom-config-props) from `webpackConfig`.

### Partial Objects

When calling `composer.addPartials`, you pass partial objects that contain one or more actual partials.

A partial should have:

- `config` - (required) - An object that contain the webpack partial config or a function to provide the partial config.
- `options` - (optional) - options to passed when calling `config` as a function
- `addOptions` - (optional) - options for when adding the partial to the composer.

For example:

```js
const partialObject = {
  "partial1_name": {
    config: { ... }
  },
  "partial2_name": {
    config: { ... },
    addOptions: { ... },
    options: { ... }
  }
}
```

#### `config`

Each partial must have a `config` field. It can be:

- An object that's a snippet of a webpack config, which will be merged into the final config.
- A function, which will be called by the compose method.

##### `config as a function`

A partial's config can be a function like `function (options)`.

`options.currentConfig` will contain the current webpack config that's been merged by `compose` so far.

The function can:

- Manually merges some webpack config into `options.currentConfig` and returns `null`
- Returns a literal object that contains the config to be merged into `currentConfig`.

It can also return another function that will be called again with `options`, that should have the same behaviors above. This allows the `config` function to simply `require` another file, which exports a function.

#### `options`

Options that will be passed when calling `config` as a function. You are free to put whatever you like; it's for your function to use. Only thing is, don't have a field `currentConfig`.

For example:

```js
composer.addPartials({
  partialName: {
    config: (options) => { ... },
    options: { ... }
  }
});
```

#### `addOptions`

Options to tell the composer how to add the associated partial. This field is removed before the partial is merged/added to the composer.

For example:

```js
composer.addPartials({
  "partialName": {
    "config": {...},
    "addOptions": {...}
  }
});
```

- `addOptions.method` - How to handle if the named partial already exist.
  - `replace` - completely replace existing partial
  - otherwise merge into existing partial
- `addOptions.concatArray` - When merging this partial, how to handle arrays.
  - `tail` - (default) add to the tail of existing array
  - `head` - add to the head of existing array
  - `no` - replace arrays

### Profile Objects

Each profile object can contain one or more profiles.

Each profile can contain a list of partial names that should be merged into the final config.

For example:

```js
const profiles = {
  "profile1": {
    "partials": {
      "foo1": {
        order: 100,
        enable: false
      },
      "foo2": {
        order: 200,
        options: {
          fooFlag: true
        }
      },
      "foo3": {}
    }
  },
  "profile2": {
    "partials": {
      ...
    }
  }
}
```

Note that the list of partial names is an object also. This allows you to configure each partial in the profile itself.

The options for each partial are:

- `order` - a number that will be used to sort the final list of partials so they will be merged in that order. Partial with lower order value will be merged first and could be overrided by partials with higher order values.
- `enable` - If `false`, then the partial will be ignored.
- `options` - object with options to be passed when calling the partial's `config` as a function.

### Custom Config Props

In your webpack config partials, for your internal use, you can set any custom config properties by
prefixing the key with `_`. After `compose` completely merge all partials, it will remove all of them.

## License

Apache-2.0 © WalmartLabs

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.
