# Webpack configuration

Webpack configurations are a significant part of the component archetype. They help with compiling and bundling your React component code. Below is the component configuration used with webpack:

```
- webpack.config.coverage.js: When running coverage test
- webpack.config.js: When building your app for production
- webpack.config.test.js: When running tests
```

## Migrate to Webpack v2

In order to keep pace with the latest trend, our new component archetype also finished migration from webpack v1 to webpack v2. Webpack 2 offers better performance, improved bundling, and a much nicer experience when configuring it. For information about migrating to webpack v2, see the [webpack migration documentation](https://webpack.js.org/migrate/3/).

## Webpack-config-composer

The webpack configurations in the component archetype are separated into partials and compose into a single configuration using [webpack-config-composer](https://www.npmjs.com/package/webpack-config-composer) that's passed to webpack.

We use `webpack-config-composer` to compose webpack configuration partials in the `/partial` directory. Under the component configuration (to use with webpack above), we add partials and profiles to the composer, and then selectively compose them into a single configuration object for webpack.

Below are the partial configurations for a new component archetype webpack structure:

```
|- electrode-archetype-react-component/config/webpack
|  |- partial
|  |  |- babel.js
|  |  |- define.js
|  |  |- fonts.js
|  |  |- images.js
|  |  |- json.js
|  |  |- optimize.js
|  |  |- sourcemaps.js
|  |  |- styles.js
```

---

After understanding the new Component Archetype Structure, it's time to generate Electrode components by using the latest Electrode generators. With `generator-electrode`, we can create dynamic and performant Lerna-structured Electrode components. Let's explore and personalize this in our next section, [Create an Electrode Component.](../create-a-electrode-component)
