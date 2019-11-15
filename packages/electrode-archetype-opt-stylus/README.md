# Electrode Archetype Option Stylus

This is a feature package that instructs [Electrode](https://github.com/electrode-io/electrode) to install Stylus.

## Interactive Install

Inclusion of this (and all other [Electrode](https://github.com/electrode-io/electrode) features) is maintained by the `features` xclap task.

To run `features` in interactive mode (recommended!), simply call the `features` xclap task with no arguments:

```sh
clap features
```

## Migrating from legacy archetype options

In versions of Electrode Archetype < 7, features were enabled or disabled by modifying `archetype/config/index.js` or `archetype/config.js`. To migrate from legacy features, simply run the `features` xclap task with no arguments:

```sh
clap features
```

If the features task detects that you are still using legacy features, it will give you the following prompt: `Convert archetype feature usage to new style (recommended)?`. Answering `yes` to this question will cause the legacy features to be migrated to the new style.

## Manual Install

This feature can also be installed directly using npm:

```sh
npm install electrode-archetype-opt-stylus
```

## License

Copyright (c) 2016-present, WalmartLabs

Licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
