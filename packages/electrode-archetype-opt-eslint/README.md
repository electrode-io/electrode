# Electrode Archetype Option Eslint

Optionally installs ESLint to your [Electrode](https://github.com/electrode-io/electrode) app.

# Usage
The app can skip installing ESLint dependencies by adding a file `archetype/config/index.js` or `archetype/config.js` and set:

```js
module.exports = {
  options: {
    eslint: false
  }
};
```

If nothing is set, then default is to install.

# Installing
This module is part of Electrode, and should have already been included in your package.json.

```json
{
  "optionalDependencies": {
    "electrode-archetype-opt-eslint": "^1.0.0"
  }
}
```


## License

Copyright (c) 2016-present, WalmartLabs

Licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

---