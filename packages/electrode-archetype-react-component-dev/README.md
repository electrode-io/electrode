# Builder Archetype: Electrode React Component

A Walmart Labs flavored react component archetype for [builder].

## Creating A New Component

> If you want to use [builder] as a CLI tool (recommended), follow the instructions at [formidablelabs/builder to modify your `PATH`]

First, install [builder-init] to help quickly create an empty component:

```bash
$ npm install -g builder-init
```

Now, builder-init can scaffold the project for you.

```bash
$ builder-init electrode-archetype-react-component
```
Note: builder-init needs to have a `.npmrc` file in your Home dir. (`~/.npmrc`).
See the project documentation for a further explanation of how `.npmrc` files
work with with `builder-init`: https://github.com/FormidableLabs/builder-init#npmrc-file

You should see something similar to the below session:

```bash
$ builder-init electrode-archetype-react-component@^4
walmart-electrode-archetype-react-component-4.0.2.tgz
[builder-init] Preparing templates for: electrode-archetype-react-component@^4
? Package / GitHub project name (e.g., 'whiz-bang-component') test-comp
? GEC GitHub organization username (e.g., 'electrode') electrode
? Package description test
? Destination directory to write test-comp

[builder-init] Wrote files:
 - test-comp/.babelrc
 - test-comp/.builderrc
 - test-comp/.editorconfig
 - test-comp/README.md
 - test-comp/package.json
 - test-comp/.gitignore
 - test-comp/.npmignore
 - test-comp/.npmrc
 - test-comp/demo/demo.jsx
 - test-comp/demo/demo.styl
 - test-comp/demo/index.html
 - test-comp/src/index.js
 - test-comp/src/components/test-comp.jsx
 - test-comp/src/styles/.gitignore
 - test-comp/test/client/components/test-comp.spec.jsx

[builder-init] New electrode-archetype-react-component@^4 project is ready at: test-comp
```

## Configuring an existing project / manual setup

If you prefer to create your component manually or if you have an existing component that you want to migrate to using this archetype, follow the instructions below:

###### run the following in your project

```bash
$ npm install --save-dev builder electrode-archetype-react-component electrode-archetype-react-component-dev
```

###### Add a `.builderrc`

The `.builderrc` should contain the following:

```yaml
---
archetypes:
  - "electrode-archetype-react-component"
```

###### Add a `.babelrc` to your project

The `.babelrc` needs to extend
[the archetype's babel configuration](config/babel/.babelrc) in order to apply the presents (ES2015, React) and the plugins like i18n. If your project needs additional Babel settings (like using stage 0 features) you can add them to this file. See the [Babel docs](https://babeljs.io/docs/usage/babelrc/) for more information.

```json
{
  "extends": "./node_modules/electrode-archetype-react-component/config/babel/.babelrc"
}
```

## Managing Dependencies

The archetypes are split into two parts: `<archetype>` and `<archetype>-dev`. Both archetypes need to be in each component and should be included in the `package.json`'s `devDependencies`.

---

## Project Structure

This archetype assumes an architecture as follows:

```
demo/
  demo.jsx
  demo.styl
src
  components/
    *.jsx
  index.js
test
  client/
    spec/
      components/
        *.jsx?
      *.jsx?
    main.js
    test.html
.builderrc
package.json
```

## CSS Modules

By default, this archetype assumes your Stylus files contain Global CSS. If you are using CSS Modules, you need
to opt-in to CSS Modules support by adding a `config` section to your *project's* `package.json` and setting the
necessary env variable to `true`:

```
"config": {
  "electrode_archetype_react_component_webpack_css_modules": "true"
}
```

## Gotchas

For the `demo-iso` task to work, `demo/demo.jsx` has some limitations:

* `demo/demo.jsx` can't use `react-router`
* `demo/demo.jsx` can't import files that rely on webpack loaders e.g. `.styl` files.

This is because the server rendering uses node for both routing and import statements.
Specifically for routing, `react-router` instances create a history that relies on DOM availability.
This will break server render with an error like this:
`Unhandled rejection Invariant Violation: Browser history needs a DOM`

## Demo server config

If you would like to augment or override the demo server config you can add `archetype-demo-server.config.js` file to the root of the project. This file will be merged with the default config and passed into the `electrode-server` instance. Add any hapi plugins or settings here.

```js
// Sample archetype-demo-server.config.js
module.exports = {
  "plugins": {
    "@walmart/store-info-plugin": {}
  }
};
```

## Tasks

```
$ builder help electrode-archetype-react-component

[builder:help]

Usage:

  builder [action] [task]

Actions:

  help, init, run, concurrent, install

Tasks:

  build
    [electrode-archetype-react-component] builder run build-lib && builder run build-dist

  build-dist
    [electrode-archetype-react-component] builder run clean-dist && builder run build-dist-min && builder run build-dist-dev

  build-dist-dev
    [electrode-archetype-react-component] webpack --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.dev.js --colors

  build-dist-min
    [electrode-archetype-react-component] webpack --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.js --colors

  build-lib
    [electrode-archetype-react-component] builder run clean-lib && babel src -d lib

  check
    [electrode-archetype-react-component] builder run lint && builder run test-cov

  check-ci
    [electrode-archetype-react-component] builder run lint && builder run test-ci

  check-cov
    [electrode-archetype-react-component] builder run lint && builder run test-cov

  check-dev
    [electrode-archetype-react-component] builder run lint && builder run test-dev

  clean
    [electrode-archetype-react-component] builder run clean-lib && builder run clean-dist

  clean-dist
    [electrode-archetype-react-component] rimraf dist

  clean-lib
    [electrode-archetype-react-component] rimraf lib

  cov-frontend
    [electrode-archetype-react-component] istanbul check-coverage 'coverage/client/*/coverage.json' --config=node_modules/electrode-archetype-react-component/config/istanbul/.istanbul.yml

  dev
    [electrode-archetype-react-component] builder concurrent server-dev server-test

  dev-iso
    [electrode-archetype-react-component] builder concurrent iso-render-server-start server-dev-iso

  hot
    [electrode-archetype-react-component] builder concurrent server-hot server-test

  iso-render-server-start
    [electrode-archetype-react-component] WEBPACK_DEV=true nodemon -w demo -w server -w src node_modules/electrode-archetype-react-component/demo-server/index.js | node_modules/electrode-archetype-react-component/node_modules/.bin/bunyan -l warn

  lint
    [electrode-archetype-react-component] builder concurrent lint-react-demo lint-react-src lint-react-test

  lint-react-demo
    [electrode-archetype-react-component] eslint --ext .js,.jsx -c ./node_modules/electrode-archetype-react-component/config/eslint/.eslintrc-react-demo demo/*.jsx --color

  lint-react-src
    [electrode-archetype-react-component] eslint --ext .js,.jsx -c ./node_modules/electrode-archetype-react-component/config/eslint/.eslintrc-react src --color

  lint-react-test
    [electrode-archetype-react-component] eslint --ext .js,.jsx -c ./node_modules/electrode-archetype-react-component/config/eslint/.eslintrc-react-test test/client --color

  server-dev
    [electrode-archetype-react-component] webpack-dev-server --port 4000 --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.demo.dev.js --colors

  server-dev-iso
    [electrode-archetype-react-component] webpack-dev-server --port 2992 --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.demo.dev.js --colors

  server-hot
    [electrode-archetype-react-component] webpack-dev-server --port 4000 --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.demo.hot.js --colors

  server-test
    [electrode-archetype-react-component] webpack-dev-server --port 3001 --config node_modules/electrode-archetype-react-component/config/webpack/webpack.config.test.js --colors

  test-ci
    [electrode-archetype-react-component] builder run test-frontend-ci

  test-cov
    [electrode-archetype-react-component] builder run test-frontend-cov

  test-dev
    [electrode-archetype-react-component] builder run test-frontend-dev

  test-frontend
    [electrode-archetype-react-component] karma start node_modules/electrode-archetype-react-component/config/karma/karma.conf.js --colors

  test-frontend-ci
    [electrode-archetype-react-component] karma start --browsers PhantomJS,Firefox node_modules/electrode-archetype-react-component/config/karma/karma.conf.coverage.js --colors

  test-frontend-cov
    [electrode-archetype-react-component] karma start node_modules/electrode-archetype-react-component/config/karma/karma.conf.coverage.js --colors

  test-frontend-dev
    [electrode-archetype-react-component] karma start node_modules/electrode-archetype-react-component/config/karma/karma.conf.dev.js --colors

```

## Check the archetype configs:

If you are enhancing / refactoring this archetype and have locally checked it out,
please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for our guidelines.

The main check we provide for the archetype itself is:

```sh
$ npm run builder:check
```

[builder]: https://github.com/FormidableLabs/builder
[builder-init]: https://github.com/FormidableLabs/builder-init
[formidablelabs/builder to modify your `PATH`]: https://github.com/formidablelabs/builder#local-install
