# Webpack Config

Webpack Config is a significant part of the component archetype.  They help with compiling and bundling your React component code.  Below is the component config to use with webpack:

```markdown
- webpack.config.coverage.js:  When running coverage test
- webpack.config.js: When building your app for production
- webpack.config.test.js: When running tests
```

## Migrate to Webpack v2

In order to keep pace with the latest trend, our new component archetype also finished migration from webpack v1 to webpack v2. Webpack 2 offers better performance, improved bundling and a much nicer experience when configuring it. For migration to webpack v2, please read more [here](https://webpack.js.org/guides/migrating/).

## Webpack-config-composer

The webpack configs in the component archetype are separated into partials and compose into a single config using [webpack-config-composer](https://www.npmjs.com/package/webpack-config-composer) that's passed to webpack.

We use `webpack-config-composer` to compose webpack config partials under `/partial` folder. Under component config to use with webpack above, we add partials and profiles to the composer, and then selectively compose them into a single config object for webpack.

Below are the partial configs for new component archetype webpack structure:

```markdown
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

After understanding the new Component Archetype Structure, it's time to generate electrode components by using latest electrode generators. With `generator-electrode`, we can create a dynamic and performant Lerna structured Electrode Components. Let's explore and personalize this in our next section, [Create an Electrode Component.](/chapter1/intermediate/create-a-electrode-component.md)
