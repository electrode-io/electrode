# Archetype: Electrode React Component

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

Electrode flavored react component archetype.

## Creating A New Component

First, install [yeoman](http://yeoman.io/) to help quickly create an empty component:

```bash
$ npm install -g yo
```

Now, `yo` can scaffold the project for you.

```bash
$ yo electrode-component
```

You should see something similar to the below session:

```bash
$ yo electrode-component

Welcome to the Electrode Component generator

Were going to set up a new Electrode Component, ready for development with
gulp, webpack, demo, electrode component archetype, live-reload

? What is your Package/GitHub project name? (e.g., 'wysiwyg-component') product-card
? What is the ClassName for your component? ProductCard
? What will be the npm package name? product-card
? What will be the GitHub organization username (e.g., 'walmartlabs')? electrodeio
? What is your name? (for copyright notice, etc.) arpan nanavati
? What is your GitHub Username? ananavati
? What is the name of the GitHub repo this will be published at? product-card
? Would you like to create a new directory for your project? Yes


   create .babelrc
   create .gitignore
   create .npmignore
   create .editorconfig
   create gulpfile.js
   create package.json
   create README.md
   create src/components/product-card.jsx
   create src/styles/product-card.styl
   create src/index.js
   create test/client/.eslintrc
   create test/client/components/product-card.spec.jsx

Your new Electrode Component is ready and your component is in '/src'.

```

## Configuring an existing project / manual setup

If you prefer to create your component manually or if you have an existing component that you want to migrate to using this archetype, follow the instructions below:

###### run the following in your project

```bash
$ npm install --save-dev electrode-gulp-helper electrode-archetype-react-component electrode-archetype-react-component-dev
```


###### Add a `.babelrc` to your project

The `.babelrc` needs to extend
[the archetype's babel configuration](config/babel/.babelrc) in order to apply the presents (ES2015, React) and the plugins like i18n. If your project needs additional Babel settings (like using stage 0 features) you can add them to this file. See the [Babel docs](https://babeljs.io/docs/usage/babelrc/) for more information.

```json
{
  "extends": "./node_modules/electrode-archetype-react-component/config/babel/.babelrc"
}
```

###### Add a `gulpfile.js` to your project

The `gulpfile.js` needs to extend
[the archetype's gulp tasks](/arhcetype-gulpfile.js) in order to apply the shared tasks on your new/existing electrode component. Add this following lines of code to the newly created `gulpfile.js`

```javascript
"use strict";

const exec = require("electrode-gulp-helper").exec;

const tasks = {
  "prepublish": ["npm:prepublish"],
  "preversion": ["check-cov"]
}

require("electrode-archetype-react-component")(tasks);
```


## Managing Dependencies

The archetypes are split into two parts: `<archetype>` and `<archetype>-dev`. Both archetypes need to be in each component and should be included in the `package.json`'s `devDependencies`.

---

## Project Structure

This archetype assumes an architecture as follows:

```
archetype
  config.js
src
  components/
    *.jsx
  styles/
    *.css
  index.js
test
  client/
    spec/
      components/
        *.jsx?
      *.jsx?
    main.js
    test.html
.babelrc
package.json
```

## CSS Modules + CSS next

By default, this archetype assumes you are using CSS-Modules + CSS-Next, you need
to opt-in to stylus support by adding a `*.styl` to your *project's* `demo/demo.styl` & `src/styles/*.styl`.
You can use stylus and CSS-Modules together by enabling setting the 'cssModuleStylusSupport' option in
`archetype/config.js` to `true`.

Import css files in your components and reference class names via the exported object `src/components/your-component.js`:

```javascript
import React from "react";

import styles from "../styles/your-component.css";

class YourComponent extends React.Component {
  render() {
    return (
      <div className={styles.someStyle}>Hello Modules!</div>
    );
  }
}
```

Add following styling to `src/styles/your-component.css`

```css
:root {
  --black: #000;
  --white: #fff;
}

.baseStyle {
  background-color: var(--black);
  color: var(--white);
}

.someStyle {
  composes: baseStyle;
  font-size: 18px;
}
```

## Tasks exposed via npm scripts & gulp as part of the electrode-archetype-react-component

```bash
$ gulp help
[13:02:10] Using gulpfile ~/walmart-oss/test-generator-electrode-component/product-card/gulpfile.js
[13:02:10] Starting 'help'...

Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  archetype:check ..............   tasks: ["archetype:lint","archetype:test-dev-pkg","clean-test-init"]
  archetype:lint ---------------   tasks: ["archetype:lint-server"]
  archetype:lint-server
  archetype:test-dev-pkg
  babel-src-step
  build ........................   tasks: ["build-lib","build-dist"]
  build-dist -------------------   tasks: ["clean-dist","build-dist-min","build-dist-dev"]
  build-dist-dev
  build-dist-min ............... Build minified dist files for production
                                   deps: ["~production-env"]
  build-lib --------------------   deps: ["~production-env"]
  build-lib:clean-tmp
  build-lib:copy-flow
  build-lib:flatten-l10n
  check ........................   tasks: ["check-dep","lint","test-cov"]
  check-ci ---------------------   tasks: ["check-dep","lint","test-ci"]
  check-cov ....................   tasks: ["lint","test-cov"]
  check-dep
  check-dev --------------------   tasks: ["lint","test-dev"]
  clean ........................   tasks: ["clean-lib","clean-dist"]
  clean-dist
  clean-lib
  clean-test-init
  cov-frontend
  cov-frontend-50
  cov-frontend-70
  cov-frontend-85
  cov-frontend-95
  default ---------------------- Invokes 'gulp help'
  help ------------------------- Display this help text.
  iso-render-server-start ------   tasks: ["~webpack-dev","iso-render-server-start-watch"]
  iso-render-server-start-watch
  lint .........................   tasks: ["lint-react-src","lint-react-test","lint-scripts"]
  lint-react-src
  lint-react-test
  lint-scripts
  npm:prepublish ---------------   tasks: ["build-lib","build-dist-dev","build-dist-min"]
  prepublish ...................   tasks: ["npm:prepublish"]
  preversion -------------------   tasks: ["check-cov"]
  server-test
  test-ci ......................   tasks: ["test-frontend-ci"]
  test-cov ---------------------   tasks: ["test-frontend-cov"]
  test-dev .....................   tasks: ["test-frontend-dev"]
  test-frontend
  test-frontend-ci
  test-frontend-cov
  test-frontend-dev
  test-frontend-dev-watch
  test-watch -------------------   tasks: ["test-frontend-dev-watch"]

```

## Check the archetype configs:

If you are enhancing / refactoring this archetype and have locally checked it out,
please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for our guidelines.

The main check we provide for the archetype itself is:

```sh
$ gulp archetype:check
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

[npm-image]: https://badge.fury.io/js/electrode-archetype-react-component.svg
[npm-url]: https://npmjs.org/package/electrode-archetype-react-component
[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/electrode-archetype-react-component
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component
[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/electrode-archetype-react-component
[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-component?type=dev
[npm-downloads-image]:https://img.shields.io/npm/dm/electrode-archetype-react-component.svg
[npm-downloads-url]:https://www.npmjs.com/package/electrode-archetype-react-component
