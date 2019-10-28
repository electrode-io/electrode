# Upgrade to webpack-dev-middleware

With the release of [electrode-archetype-react-app version 7.0.0], Electrode no longer includes [webpack-dev-server].

Instead, webpack-dev is now integrated as part of the app server by using [webpack-dev-middleware].

Combined with [electrode-redux-router-engine v2], Electrode app in dev mode now supports a much better development experience with Hot Module Reloading working on both the client and server side.

The latest [electrode-ignite] and [generator-electrode] will now generate apps that use both right out of the box.

However, if you have an existing app before this update, then you have to do some manual changes to get it.

In this guide, I will go through the steps to upgrade our basic app to use [webpack-dev-middleware].

> Note: Without react-router v4, hot module reloading will not work even if update to the webpack-dev middleware. So I highly recommend that you do the [RR4 migration] first.

## Overview

A new Hapi plugin is available from [electrode-archetype-react-app-dev]. This plugin will handle the webpack-dev compiling and hot reloading on the server side.

Update will involve doing the following:

1.  Update dependencies
2.  Add the webpack-dev plugin to your app
3.  Update react app for HMR (if [RR4 migration] is done.)

## Dependencies

In `package.json`, these dependencies should be updated:

- dependencies

  - `"electrode-archetype-react-app": "^7.0.0"`
  - `"electrode-react-webapp": "^2.5.1"`

- devDependencies

  - `"electrode-archetype-react-app-dev": "^7.0.0"`

## Add webpack-dev plugin

In the file `config/default.js`, add the following plugin to the top:

```js
{
  "plugins": {
    "webpack-dev": {
      module: "electrode-archetype-react-app-dev/lib/webpack-dev-hapi",
      enable: process.env.WEBPACK_DEV === "true",
    }
  }
}
```

> If you only have `config/default.json`, then please add a new `config/default.js` file with the entire content above.

Now running `clap dev` should no longer start [webpack-dev-server].

## HMR with RR4

If you've done the [RR4 migration], then you can also update your code to enable Hot Module Reloading now.

### `src/client/app.jsx`

For `src/client/app.jsx`:

To make it work for Redux, the `store` object has to be a global:

```js
const configureStore = initialState => {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore(window.__PRELOADED_STATE__);
```

App startup has to be reentrant:

```js
const start = App => {
  const jsContent = document.querySelector(".js-content");
  const reactStart = window.__PRELOADED_STATE__ && jsContent.innerHTML ? hydrate : render;

  reactStart(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    jsContent
  );
};

window.webappStart = () => start(() => renderRoutes(routes));
```

Finally add this:

```js
//
// Hot Module Reload setup
//
if (module.hot) {
  module.hot.accept("./routes", () => {
    const r = require("./routes");
    start(() => renderRoutes(r.routes));
  });
}
```

## Summary

And these are the steps required to migrate Electrode's basic app to use the new webpack-dev middleware plugin.

> Currently only Hapi is supported and express is scheduled.

In summary:

1.  Update dependencies for [electrode-archetype-react-app] and the `-dev` one to `^7.0.0`
2.  Add the webpack-dev middleware hapi plugin to `config/default.js`
3.  For React router 4, update `src/client/app.jsx` to enable HMR.

[electrode-archetype-react-app version 7.0.0]: https://www.npmjs.com/package/electrode-archetype-react-app/v/7.0.0
[electrode-redux-router-engine v2]: https://www.npmjs.com/package/electrode-redux-router-engine/v/2.1.1
[rr4 migration]: rr3-to-rr4.md
[webpack-dev-server]: https://github.com/webpack/webpack-dev-server
[webpack-dev-middleware]: https://github.com/webpack/webpack-dev-middleware
[electrode-ignite]: https://www.npmjs.com/package/electrode-ignite
[generator-electrode]: https://www.npmjs.com/package/generator-electrode
[electrode-archetype-react-app-dev]: https://www.npmjs.com/package/electrode-archetype-react-app-dev
[electrode-archetype-react-app]: https://www.npmjs.com/package/electrode-archetype-react-app
