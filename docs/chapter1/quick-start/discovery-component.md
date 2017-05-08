# Discovery Component

Discovery component is a components playground for developing and demoing electrode archetype components. This is a new structure applied by [Lerna](https://lernajs.io/) to manage multiple related electrode archetype components.

## Create your component

[Generate Electrode ~~Isomorphic ~~ Universal React component ](https://github.com/electrode-io/electrode/tree/master/packages/generator-electrode) with NodeJS backend and useful gulp tasks for development, building and publishing.

First, install [Yeoman](http://yeoman.io/), [gulp](http://gulpjs.com/), and generator-electrode using [npm](https://www.npmjs.com/) \(we assume you have pre-installed [node.js](https://nodejs.org/) \( &gt; 4.2.x required\)\).

```
$ npm install -g yo gulp generator-electrode
```

> Note: You may need add `sudo` to the command.

Then generate your new component demo:

```
$ mkdir your-component-name
$ cd your-component-name
$ yo electrode:component
```

Once the application is generated, you are ready to try it out.

```
$ npm start
```

Wait for webpack to be ready and navigate to`http://localhost:3000`with your browser.

You can run [gulp](http://gulpjs.com/) to see the list of tasks available.

Some common ones:

* `gulp dev` - start in webpack-dev-server development mode
* `gulp hot` - start in webpack-dev-server hot mode
* `gulp build` - build production `dist` files
* `gulp server-prod` - start server in production mode
* `gulp check` - run unit tests with coverage

> Also we have  `yo electrode:component-add` generator. This can be used from within the `packages` folder to add a new component in the repo, this generator will update the `demo-app` to use the new component as well.

## How to develop

### Source

Your component source code is in `packages/componentName/src`. You can use JSX and ES6 syntax freely in your component source; it will be transpiled to `lib` with Babel before being published to npm so that your users will simply be able to include it.

The component project structure uses a [Lerna](https://lernajs.io/) structure, which can help manage multiple repos within your `packages` directory. Your initial component-demo structure will be :

```
your-component-demo
├── README.md
├── demo-app
│   ├── LICENSE
│   ├── README.md
│   ├── archetype-debug.log
│   ├── config
│   │   ├── default.js
│   │   ├── development.json
│   │   ├── production.js
│   │   └── production.json
│   ├── gulpfile.js
│   ├── package.json
│   ├── src
│   │   ├── client
│   │   │   ├── actions
│   │   │   │   └── index.jsx
│   │   │   ├── app.jsx
│   │   │   ├── components
│   │   │   │   └── home.jsx
│   │   │   ├── images
│   │   │   │   └── electrode.png
│   │   │   ├── reducers
│   │   │   │   └── index.jsx
│   │   │   ├── routes.jsx
│   │   │   └── styles
│   │   │       └── base.css
│   │   └── server
│   │       ├── index.js
│   │       └── views
│   │           └── index-view.jsx
│   └── test
│       ├── client
│       │   └── components
│       │       └── home.spec.jsx
│       └── server
├── lerna.json
├── package.json
└── packages
    └── componentName
        ├── README.md
        ├── gulpfile.js
        ├── package.json
        ├── src
        │   ├── components
        │   │   └── e.jsx
        │   ├── index.js
        │   ├── lang
        │   │   ├── default-messages.js
        │   │   ├── en.json
        │   │   └── tenants
        │   │       └── electrodeio
        │   │           └── default-messages.js
        │   └── styles
        │       └── e.css
        └── test
            └── client
                └── components
                    ├── e.spec.jsx
                    └── helpers
                        └── intl-enzyme-test-helper.js
```

### Adding Components to the Repo

The component structure shown above supports multiple packages under the `packages` folder. You can add another component to your project by running `yo electrode:component-add` from within the `packages` directory.

```
$ cd packages
$ yo electrode:component-add
```

And follow the prompts.

This will generate a new package and also update the `demo-app`. The `demo-app/src/client/components/home.jsx` and `demo-app/package.json` will be overwritten during the update.

### Example and Preview

Preview your component by using the `demo-app`. This is an electrode app which uses your newly created component:

```
$ cd demo-app
$ gulp demo
```

A web server will be started on [localhost:3000](http://127.0.0.1:3000/). Your new component will be used in `demo-app/src/client/components/home.jsx.`

### Sample Universal React Component

[Here](https://github.com/didi0613/discovery-component) is a sample component demo that was created with the Electrode generator and consumes the Electrode App archetype and Electrode Component archetype modules. We've added demos and features to it to serve as examples.

## How to test

We also generate unit test and code coverage check for failure. The test files are located at `demo-app/test/`  folder, you can add on more unit test for each new method or feature in the future.

To run the test, please go to the root level of your repo, and run

```
$ npm test
```

This will run `lerna bootstrap && lerna run test` behind, which goes into every `packages/` folder and run `npm test`  for each component.

