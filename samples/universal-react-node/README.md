# Electrode Boilerplate Universal React Node

[![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url]

## Features

[Electrode Boilerplate](https://github.com/electrode-io/electrode#boilerplate-universal-react-node) comes fully loaded with the best technologies available:

- <a href="https://facebook.github.io/react/index.html" target="_blank">React</a> - an awesome JavaScript library for building user interfaces, created by Facebook.

- <a href="http://redux.js.org/docs/basics/UsageWithReact.html" target="_blank">Redux</a> - a predictable state container for JavaScript apps.

- <a href="https://github.com/ReactTraining/react-router/tree/master/docs" target="_blank">React Router</a> - a powerful routing library built on top of React.

- <a href="https://github.com/css-modules/css-modules" target="_blank">CSS Modules</a> - a CSS file in which all class names and animation names are scoped locally by default. Fixes the problem of the global scope in CSS.

- <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.xjxr5yj5z" target="_blank">Universal rendering</a>

- <a href="https://webpack.github.io/docs/motivation.html" target="_blank">Webpack</a> - a powerful module bundler.

- [Offline-first](https://github.com/electrode-io/electrode/tree/master/samples/universal-react-node#progressive-web-app-pwa-features-supported-by-the-electrode-framework)
  The next frontier in performant progressive web apps: availability without a network connection from the instant your users load the app.

- <a href="https://github.com/jchip/isomorphic-loader" target="_blank">Webpack Isomorphic Loader</a> - a powerful tool that makes NodeJS `require` understand files such as images for SSR.

- <a href="https://babeljs.io/" target="_blank">Babel</a> - a utility to transpile ES6 + 7.

- <a href="http://eslint.org/" target="_blank">ESLint</a> - a pluggable linting utility for Javascript.

- <a href="https://mochajs.org/" target="_blank">Mocha</a> - a feature-rich Javascript testing framework.

- <a href="https://github.com/airbnb/enzyme" target="_blank">Enzyme</a> - a Javascript testing utility for React, created by airbnb.

- <a href="https://travis-ci.org/" target="_blank">TravisCI</a> - a continuous integration service to build and test software projects.

- <a href="http://yeoman.io/" target="_blank">Yeoman</a> - a Scaffolding tool for modern webapps.

- <a href="https://www.npmjs.com/package/history" target="_blank">History</a> - a Javascript library for managing session history.

- <a href="http://bluebirdjs.com/docs/why-promises.html" target="_blank">Bluebird</a> - a great Javascript promise library.

- [Electrode Confippet](https://github.com/electrode-io/electrode-confippet) - a versatile and flexible utility for managing configurations of Node.js applications.

- [Electrode JWT CSRF](https://github.com/electrode-io/electrode-csrf-jwt) - a module to enable stateless Cross-Site Request Forgery (CSRF) protection with JWT.

- [Electrode-Redux-Router-Engine](https://github.com/electrode-io/electrode-redux-router-engine) - an Electrode routing and rendering engine using react-router and redux.

- [Component Caching](https://github.com/electrode-io/electrode-react-ssr-caching) - an optimizer to improve React Server Side Rendering speed

- [Electrode-Server](https://github.com/electrode-io/electrode-server) - a configurable web server using Hapi.js on top of Node.js.

- [Electrify](https://github.com/electrode-io/electrify) - a tool for analyzing the module tree of webpack projects.

- [Electrode-Docgen](https://github.com/electrode-io/electrode-docgen) - a custom metadata extractor for the Electrode framework, automates component documentation.
  mentation.

This repo is a sample Electrode app with the following Electrode modules:

- [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
- [Electrode Electrify](https://github.com/electrode-io/electrify)
- [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
- [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
- [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
- [Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render)

## Install

```bash
git clone https://github.com/electrode-io/electrode.git
cd electrode-boilerplate-universal-react-node
npm install
npm run flow-typed-install
```

> Note: [`flow-typed`](https://github.com/flowtype/flow-typed) is a central repository for Flow library definitions. By default, Flow will ignore the 3rd-party libraries which were not written with Flow and leave them untyped. The `flow-typed` repo is a collection of high-quality library definitions which allow you to describe the interface of a module or library separate from the implementation of that module/library.

## Run

- Start the electrode app in `development` environment:

```bash
$ NODE_ENV=development clap hot
```

Running in development mode will also enable Redux Devtools so you can easily access the state of the Redux store. Please install the [Redux Devtools extension in Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to enable this feature.

- Start the electrode app in `production` environment:

```bash
$ clap build
$ clap server-prod
```

- Running in the selected environment should load the appropriate configuration settings

- Start the electrode app with `service workers`

```bash
$ clap build
$ clap server
```

Service worker currently does not work with webpack dev server. You need to build first and then run the server.

## Instructions for boostrapping/Scaffolding new electrode application

You can bootstrap a new electrode web application from scratch by doing:

```bash
npm install -g yo generator-electrode xclap-cli
yo electrode
```

This will set up an Electrode webapplication which will have 2 of the above 6 modules. The two modules that are available by default are:

- [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
- [Electrode Javascript Bundle Viewer](https://github.com/electrode-io/electrify)

## Multiple Entry Points

The `electrode-archetype-react-app` module supports multiple entry points per app. In order to enable this feature:

- Add an entry file in `client/entry.config.js`.

```js
module.exports = {
  home: "./home.jsx",
  about: "./about.jsx"
};
```

- Add a chunk selector to `server/chunk-selector.js`

```js
"use strict";

const CHUNKS = {
  HOME: {
    css: "home",
    js: "home"
  },
  ABOUT: {
    css: "about",
    js: "about"
  }
};

const getChunks = path => {
  if (path.endsWith("/about")) {
    return CHUNKS.ABOUT;
  }

  return CHUNKS.HOME;
};

module.exports = request => {
  return getChunks(request.path);
};
```

- Add a bundleChunkSelector option to `plugins.webapp.options` in `config/default.json`

```js
{
  "plugins": {
    "webapp": {
      "module": "electrode-react-webapp",
      "options": {
        "bundleChunkSelector": "./server/chunk-selector.js",
        "pageTitle": "Electrode Boilerplate Universal React App",
        "paths": {
          "/{args*}": {
            "content": {
              "module": "./server/views/index-view"
            }
          }
        }
      }
    }
  }
}
```

## Progressive Web App (PWA) features supported by the Electrode framework

#### 1. Offline first

Offline first lets your app run without a network connection. At the same time it provides a great performance boost for repeat visit to your web site.
This is done with a service worker and by pre-caching your static assets as well as runtime caching of dynamic server routes and external resources.  
 [Learn More](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/README.md#2-cache)

#### 2. Add To Homescreen

After visiting your website, users will get a prompt (if the user has visited your site at least twice, with at least five minutes between visits.) to add your application to their homescreen (web or [mobile](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)). Combined with offline caching, this means your web app can be used exactly like a native application.  
 [Learn More](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/README.md#1-manifest)

#### 3. Push Notifications

Web push notifications allow users to opt-in to timely updates from sites they love and allow you to effectively re-engage them with customized, relevant content.  
 We will learn about Push Notifications in the next couple of sections.

## Instructions for setting up Push Notifications

### Web push is only supported on: Google Chrome 42+ (Desktop & Android)

The [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) requires a registered service worker so it can send notifications in the background when the web application isn't running. So we need to register our service worker first.  
Check out [this guideline](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/README.md#how-do-i-generate-a-manifestjson-and-a-service-worker-file) to generate a service worker in an electrode app.  
Also, check out the [Adding Push Notifications to a Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/) Codelab provided by Google for an in-depth guide on how push notifications and service workers work together.

Next we need to add a `push` event to this existing service worker for sending notifications to the client from a push server:

#### 1. Creating a new file service worker file to listen to push events

In order to respond to push notifications events received from a remote server we need to listen for the `push` event on the active service worker. Since our service worker file is generated automatically we need to use the `importScripts` API, which lets us execute additional scripts in the context of the service worker.

```
self.addEventListener("push", (event) => {
  const title = "It worked!";
  const options = {
    body: "Great job sending that push notification!"
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
```

[Sample file](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/client/sw-events.js)

#### 2. Include this file in your webpack bundle by referencing it in `sw-config.js`

```
module.exports = {
  cache: {
    importScripts: ['./sw.js']
    }
}
```

[Sample file](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/config/sw-config.js)

#### 3. Register this service worker with the `push` event

```
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js", { scope: "./" })
  .then((registration) => {
    // Service worker registration was successful
  }
}
```

[Sample file](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/client/sw-registration.js)

The service worker is ready to accept `push` from the server. On receiving the push, it will provide the `notification` to the browser.

#### 4. Setting up your API_KEY and GCM_SENDER_ID

We will be needing the API_KEY and GCM_ENDPOINT to send the messages from the server.  
To generate these values, visit [Firebase](https://console.firebase.google.com) and create a new project.  
Click on the setting icons and open `Project settings`.  
Navigate to the `CLOUD MESSAGING` tab to view your `Server key or Legacy Server key` (API_KEY) and the `Sender ID`.  
You need to update your `manifest` in `sw-config.js` to update the [gcm_sender_id](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/config/sw-config.js#L18).

## Instructions for sending a push notification

Now that we have our service worker up and running, we can send a `push` with the following steps:

#### 1. Requesting Permission and Subscribing Users

The code for requesting permission and subscribing users in done in your app's code, rather than the service worker code.

```
navigator.serviceWorker.ready.then((registration) => {
  // Ask for user permission and subscribe
  registration.pushManager.subscribe({ userVisibleOnly: true })
    .then((subscription) => {
      // Successfully subscribed
      this.setState({
        subscription,
        subscribed: true
      });
    });
});
```

[Sample subscription](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/client/components/push-notifications.jsx#L73-L86)

Typically, after the user subscribes, we send the subscription information to the server and the server uses the `subscriptionId` to trigger a notification.

#### 2. Sending Messages

Sending message is as easy as executing a curl command. The curl command contains the `subscriptionId`, `API_KEY` (Your cloud messaging API key from [firebase](https://console.firebase.google.com)) and GCM_ENDPOINT (https://android.googleapis.com/gcm/send).

Alternatively, you can also send notifications from the service worker:

```
sendNotification() {
   const title = 'This Notification'
   const body = 'Is brought to you by your server worker!'
   const options = {body};
   navigator.serviceWorker.ready.then((registration) => {
     registration.showNotification(title, options);
   });
 }
```

[Sample](https://github.com/electrode-io/electrode/blob/master/samples/universal-react-node/client/components/push-notifications.jsx#L94-L100)

`navigator.serviceWorker.ready` is a Promise that will resolve once a service worker is registered, and it returns a reference to the active [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration). The showNotification() method of the ServiceWorkerRegistration interface creates a notification and returns a Promise that resolves to a [NotificationEvent](https://developer.mozilla.org/en-US/docs/Web/API/NotificationEvent).

---

## Instructions about standalone modules

### <a name="electrode-confippet"></a>Electrode Confippet

- [Confippet](https://github.com/electrode-io/electrode-confippet) is a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility, but offers a preset config out of the box.

#### Config

- Once the bootstrapping is done using `yo electrode`, open the following config files:

```
config
|_ default.json
|_ development.json
|_ production.json
```

##### Development environment

- Update the `config/development.json` to have the following settings:

```json
{
  "server": {
    "connections": {
      "compression": false
    },
    "debug": {
      "log": ["error"],
      "request": ["error"]
    }
  },
  "connections": {
    "default": {
      "port": 3000
    }
  }
}
```

- The above settings should show server log errors that may be beneficial for debugging, disable content encoding, and run the server in port 3000

##### Production environment

- Update the `config/production.json` to have the following settings:

```json
{
  "server": {
    "connections": {
      "compression": true
    },
    "debug": {
      "log": false,
      "request": false
    }
  },
  "connections": {
    "default": {
      "port": 8000
    }
  }
}
```

- The above settings should disable server log errors, enable content encoding, and run the server in port 8000
- The `server` key related configs are from hapi.js. More config options can be found here: http://hapijs.com/api
- The `connections` key are electrode server specific: https://github.com/electrode-io/electrode-server/tree/master/lib/config
- Keys that exist in the `config/default.json` that are also in the other environment configs will be replaced by the environment specific versions

##### Require

- In Electrode, the configurations are loaded from `server/index.js` at this line:

```javascript
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("electrode-server")(config, [staticPathsDecor()]);
```

##### Run

- Start the electrode app in `development` environment:

```bash
$ NODE_ENV=development clap hot
```

- Start the electrode app in `production` environment:

```bash
$ clap build
$ clap server-prod
```

- Running in the selected environment should load the appropriate configuration settings

---

### <a name="csrf-jwt"></a>Electrode CSRF-JWT

[CSRF-JWT](https://github.com/electrode-io/electrode-csrf-jwt) is an Electrode plugin that allows you to authenticate HTTP requests using JWT in your Electrode applications.

#### Install

- Add the `electrode-csrf-jwt` component:

```bash
npm install electrode-csrf-jwt --save
```

- Next, register the plugin with the Electrode server. Add the following configuration to the `plugins` section of `config/default.json`:

```json
"electrode-csrf-jwt": {
  "options": {
    "secret": "test",
    "expiresIn": 60
  }
}
```

That's it! CSRF protection will be automatically enabled for endpoints added to the app. CSRF JWT tokens will be returned in the headers and set as cookies for every response and must be provided as both a header and a cookie in every `POST` request.

> You can read more about options and usage details on [the component's README page](https://github.com/electrode-io/electrode-csrf-jwt#usage)

#### CSRF-JWT Demonstration code

In addition to the above steps, the following modifications were made in order to demonstrate functionality:

- A plugin with two endpoints was added as `server/plugins/csrf.js` and registered via `config/default.json`
- AJAX testing logic was added to `client/components/csrf.jsx`

---

### <a name="electrode-electrify"></a>Electrode Electrify

An Electrode Javascript bundle viewer aptly named [Electrify](https://github.com/electrode-io/electrify), this is a stunning visual tool that helps for analyzing the module tree of Webpack based projects. It's especially handy for catching large and/or duplicate modules which might be either bloating up your bundle or slowing down the build/install process.

#### Integration points in your app

- Use [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) which is already integrated with [electrify](https://github.com/electrode-io/electrify) and part of [electrode-boilerplate-universal-react-node](https://github.com/electrode-io/electrode-boilerplate-universal-react-node), all you have to do is run **clap electrify** after installing [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) in your app.
- [Electrify](https://github.com/electrode-io/electrify) dependency `sudo npm install -g electrode-electrify` and npm task runner integration.
- [Electrify](https://github.com/electrode-io/electrify) command line interface (CLI) `electrify <path-to-stats.json> --open`.

`Electrode-boilerplate-universal-react-node` & [electrode-scaffolder](https://github.com/electrode-io/generator-electrode) internally use `electrode-archetype-react-app` hence `clap electrify` on your terminal will start the bundle viewer in the browser.

When you install Electrify globally using `sudo npm install -g electrode-electrify`, the `Electrify` command-line tool is made available as the quickest means of checking out your bundle. As of `electrode-electrify v1.0.0`, the tool takes any [webpack-stats](http://webpack.github.io/docs/node.js-api.html#stats-tojson) object as input and starts out a standalone HTML page as output in your browser, all you have to do is type `electrify <path to stats.json> --open` on your terminal.

Head over to the Electrify [repository](https://github.com/electrode-io/electrify#electrify) for a detailed view of the bundle viewer and checkout the source-code. [electrify](https://github.com/electrode-io/electrify) relies on webpack to generate the application modules/dependency tree and is independent of whichever server framework(hapijs, expressjs, etc.) you choose to use.

---

### <a name="electrode-react-ssr-caching"></a>Electrode React SSR Caching

[Electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching) module supports profiling React Server Side Rendering time and component caching to help you speed up SSR.

It supports 2 types of caching:

- Simple - Component Props become the cache key. This is useful for use cases like Header and Footer, where the number of variations of props data is minimal which will make sure the cache size stays small.
- Template - Components Props are first tokenized and then the generated template html is cached. The idea is akin to generating logic-less handlebars template from your React components and then use string replace to process the template with different props. This is useful for use cases like displaying Product information in a Carousel where you have millions of products in the repository and only cache one templatized html and then do a string replace to generate the final html

#### Install

```bash
$ npm install --save electrode-react-ssr-caching
```

#### Wiring

##### GOTCHA:

- SSR caching of components only works in PRODUCTION mode, since the props(which are read only) are mutated for caching purposes and mutating of props is not allowed in development mode by react.

- Make sure the `electrode-react-ssr-caching` module is imported first followed by the imports of react and react-dom module. SSR caching will not work if the ordering is changed since caching module has to have a chance to patch react's code first. Also if you are importing `electrode-react-ssr-caching`, `react` and `react-dom` in the same file , make sure you are using all `require` or all `import`. Found that SSR caching was NOT working if, `electrode-react-ssr-caching` is `require`d first and then `react` and `react-dom` is imported.

---

To demonstrate functionality, we have added:

- `client/components/SSRCachingSimpleType.jsx` for Simple strategy.
- `client/components/SSRCachingTemplateType.jsx` for Template strategy.
- To enable caching using `electrode-react-ssr-caching`, we need to do the below configuration:

```javascript
const cacheConfig = {
  components: {
    SSRCachingTemplateType: {
      strategy: "template",
      enable: true
    },
    SSRCachingSimpleType: {
      strategy: "simple",
      enable: true
    }
  }
};

SSRCaching.enableCaching();
SSRCaching.setCachingConfig(cacheConfig);
```

The above configuration is done in `server/index.js`.

To read more, go to [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching). The core implementation for caching is [available here](https://github.com/electrode-io/electrode-react-ssr-caching/blob/master/lib/ssr-caching.js). You can also do [Profiling of components](https://github.com/electrode-io/electrode-react-ssr-caching#profiling)

---

### <a name="redux-router-engine"></a>Electrode Redux Router Engine

[Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine) handles async data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

#### Install

```bash
$ npm install --save electrode-redux-router-engine
```

#### Wiring

In this demo, the redux-router has been configured to work with the `server/views/index-view.jsx` component.`createdReduxStore` is used to perform async thunk actions to build the redux store and which gets wired into a new `ReduxRouterEngine` instance in the component's `module.exports` clause:

```javascript
function createReduxStore(req, match) {
  const store = storeInitializer(req);
  return Promise.all([
    // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
    Promise.resolve({})
  ]).then(() => {
    return store;
  });
}

module.exports = req => {
  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return req.server.app.routesEngine.render(req);
};
```

> For more information on using this module, refer to the [redux-router README](https://github.com/electrode-io/electrode-redux-router-engine/blob/master/README.md).

---

### <a name="above-the-fold-only-server-render"></a>Above The Fold Only Server Render

[Above The Fold Only Server Render](https://github.com/electrode-io/above-the-fold-only-server-render) is a React component for optionally skipping server side rendering of components outside above-the-fold (or inside of the viewport). This component helps render your components on the server that are above the fold and the remaining components on the client.

[above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) helps increase performance both by decreasing the load on renderToString and sending the end user a smaller amount of markup.

By default, the [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) component is an exercise in simplicity; it does nothing and only returns the child component.

#### Install

- Add the `above-the-fold-only-server-render` component:

```bash
npm install above-the-fold-only-server-render --save
```

You can tell the component to skip server side rendering either by passing a `prop` `skip={true}` or by setting up `skipServerRender` in your app context and passing the component a `contextKey` `prop`.

Let's explore passing `skip prop`; there is an example in
`<your-electrode-app>/components/above-fold-simple.jsx`. On the Home page, click the link to render the `localhost:3000/above-the-fold` page.

The best way to demo this existing component is actually going to be in your `node_modules.`

Navigate to `<your-electrode-app>/node_modules/above-the-fold-only-server-render/lib/components/above-the-fold-only-server-render.js` line 29:

```javascript
var SHOW_TIMEOUT = 50;
```

When we use this module at [WalmartLabs](www.walmartlabs.com), it's all about optimization. You are going to change line 29 to slow down the SHOW_TIMEOUT so you can see the component wrapper in action:
Change this to:

```javascript
var SHOW_TIMEOUT = 3000;
```

Run the commands below and test it out in your app:

```bash
  clap hot
```

The code in the `<h3>` tags that are above and below the `<AboveTheFoldOnlyServerRender skip={true}> </AboveTheFoldOnlyServerRender>` will render first:

```javascript
import React from "react";
import { AboveTheFoldOnlyServerRender } from "above-the-fold-only-server-render";

export class AboveFold extends React.Component {
  render() {
    return (
      <div>
        <h3>Above-the-fold-only-server-render: Increase Your Performance</h3>
        <AboveTheFoldOnlyServerRender skip={true}>
          <div className="renderMessage" style={{ color: "blue" }}>
            <p>
              This will skip server rendering if the 'AboveTheFoldOnlyServerRender' lines are
              present, or uncommented out.
            </p>
            <p>
              This will be rendered on the server and visible if the 'AboveTheFoldOnlyServerRender'
              lines are commented out.
            </p>
            <p>Try manually toggling this component to see it in action</p>
            <p>
              <a
                href="https://github.com/electrode-io/above-the-fold-only-server-render"
                target="_blank"
              >
                Read more about this module and see our live demo
              </a>
            </p>
          </div>
        </AboveTheFoldOnlyServerRender>
        <h3>This is below the 'Above the fold closing tag'</h3>
      </div>
    );
  }
}
```

You can also skip server side rendering by `setting context in your app and passing a contextKey prop`. Here is an example:

```js
import PropTypes from "prop-types";

const YourComponent = () => {
  return (
    <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.SomeComponent">
      <div>This will not be server side rendered based on the context.</div>
    </AboveTheFoldOnlyServerRender>
  );
};

class YourApp extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        YourComponent: true
      }
    };
  }

  render() {
    return <YourComponent />;
  }
}

YourApp.childContextTypes = {
  aboveTheFoldOnlyServerRender: PropTypes.shape({
    AnotherComponent: PropTypes.bool
  })
};
```

To learn more about this essential stand alone module visit the `above-the-fold-only-server-render` [Github repo](https://github.com/electrode-io/above-the-fold-only-server-render).
