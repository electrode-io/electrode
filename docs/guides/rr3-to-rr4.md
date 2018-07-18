# React Router v3 to v4 Migration

With [electrode-redux-router-engine] v2 release, Electrode now supports [React Router v4] `(RR4)`.

Other modules in the Electrode platform will continue to work with either RR3 or RR4.

The latest [electrode-ignite] and [generator-electrode] will now generate apps that use RR4 out of the box.

However, if you have an existing app that's using RR3, then you have to do some manual changes to migrate to RR4.

In this guide, I will go through the minimal steps to migrate our basic app from RR3 to RR4.

## Structure of Electrode App with RR3

As generated, Electrode's sample app with RR3 has the following essential parts:

```
app
├── package.json
├── config
│   ├── default.json
│   ├── development.json
│   └── production.json
└── src
    ├── client
    │   ├── actions
    │   │   └── index.jsx
    │   ├── app.jsx
    │   ├── components
    │   │   └── home.jsx
    │   ├── reducers
    │   │   └── index.jsx
    │   ├── routes.jsx
    │   └── styles
    └── server
        ├── index.js
        └── views
            └── index-view.jsx
```

- `package.json` will need some dependencies updated.
- `src/client/routes.jsx` is going to be the main focus for migration.
- `src/client/app.jsx` needs update to use [BrowserRouter] from RR4.
- `src/server/views/index-view.jsx` needs to extract `createReduxStore` into a new file `src/server/routes/init-top.jsx`

## Migrating to RR4

### Dependencies

First update `electrode-redux-router-engine` in your `package.json` to v2:

```js
{
  "dependencies": {
    "electrode-redux-router-engine": "^2.0.0"
  }
}
```

If you prefer, add the following also:

```js
{
  "dependencies": {
    "react-router-dom": "^4.3.1",
    "react-router-config": "^1.0.0-beta.4"
  }
}
```

If you already have `react-router`, then you must update its version to `^4.3.1` also, or you can just remove it. The main user facing APIs for RR4 are in the module `react-router-dom`.

> Any other dependencies you have that are related to RR3 should be removed or updated accordingly.

### Route Definition

#### Dynamic vs Static Routers

Defining routes changed significantly in RR4 vs RR3.

The main reason is that RR4 is a dynamic router vs a static router like RR3.

That means you actually declare your routes within your components instead of in a central location.

The irony though, is that if you are building a universal react app, you need a static router for server side rendering, and we need a way to define a central route definition for SSR.

We also prefer to share the route definition for client side and server side.

The devs of RR4 recognized this and created the [StaticRouter] and [react-router-config] for RR4.

#### `src/client/routes.jsx`

> Here is a simplified version of what Electrode's sample app's `src/client/routes.jsx` looks like for RR4:

```js
import Home from "./components/home";
import { withRouter } from "react-router-dom";

export const routes = [
  {
    path: "/",
    component: withRouter(Home),
    init: "./init-top"
  }
];
```

To understand what's going on in there, these are the docs for some reading: [react-router-config] and [electrode-redux-router-engine README].

> For reference, here is how it looks like for RR3:

```js
import React from "react";
import { Route } from "react-router";
import Home from "./components/home";

export const routes = <Route path="/" component={Home} />;
```

RR4's definition is an array of objects defining routes and their components. The `path` and `component` properties are similar.

What's new in RR4 is the `withRouter` function and the `init` property.

- `withRouter` is for compatibility with [Redux], only needed for the top level component for each route.

- `init` is [electrode-redux-router-engine]'s addition for you to specify a JS module that exports a function to supply Redux `reducers` and `initialState`, or a ready made `store`.

### `src/client/app.jsx`

For RR3, the React bootstrapping looks like this:

```js
import { Router, browserHistory } from "react-router";

hydrate(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  jsContent
);
```

In RR4:

```js
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

hydrate(
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  jsContent
);
```

The main changes are the use of [BrowserRouter] and generating React components from routes using [renderRoutes].

### `src/server/views/index-view.jsx`

Next is to update [electrode-react-webapp]'s content view provider, which uses [electrode-redux-router-engine] to do React SSR.

With [electrode-redux-router-engine] v1, initializing the engine requires a `createReduxStore` function.

With v2, you have a lot more control on each route's [Redux] reducers and initialState. This is where the `init` property for the route definition comes in.

For simplicity, we will just extract the `createReduxStore` from `index-view` into a new file `src/server/routes/init-top.jsx`.

- Remove `createReduxStore` function from `index-view.jsx` and the imports associated with it:

```js
import { createStore } from "redux";
import rootReducer from "../../client/reducers";
```

- Add a new file `src/server/routes/init-top.jsx` with the following:

```js
import reducer from "../../client/reducers";
import { createStore } from "redux";
import rootReducer from "../../client/reducers";

export default function initTop() {
  const initialState = {
    checkBox: { checked: false },
    number: { value: 999 }
  };

  return { store: createStore(rootReducer, initialState) };
}
```

### Summary

And these are the steps required to migrate Electrode's basic app using RR3 to RR4 manually. Your app would have more to it, but the basics should be the same.

In summary:

1.  Update dependencies for [electrode-redux-router-engine] to v2
2.  Update route definition from RR3 to RR4
3.  Update React app bootstrapping to use [BrowserRouter]
4.  Update SSR content provider module and extract its `createReduxStore` into another file that the route definition's `init` property points to.

[react router v4]: https://reacttraining.com/react-router/web/guides/philosophy
[staticrouter]: https://reacttraining.com/react-router/web/api/StaticRouter
[react-router-config]: https://www.npmjs.com/package/react-router-config
[browserrouter]: https://reacttraining.com/react-router/web/api/BrowserRouter
[redux]: https://redux.js.org/
[renderroutes]: https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops--
[electrode-redux-router-engine]: https://www.npmjs.com/package/electrode-redux-router-engine
[electrode-ignite]: https://www.npmjs.com/package/electrode-ignite
[generator-electrode]: https://www.npmjs.com/package/generator-electrode
[electrode-react-webapp]: https://www.npmjs.com/package/electrode-react-webapp
[electrode-redux-router-engine readme]: ../chapter1/advanced/stand-alone-modules/redux-router-engine.md
