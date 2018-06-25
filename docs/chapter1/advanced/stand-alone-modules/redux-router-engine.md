# Redux Router Engine

The Electrode Redux Router Engine is a tool that handles asynchronous data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

## Module: [electrode-redux-router-engine]

### Install via `npm`

    $ npm install --save electrode-redux-router-engine

### Example Applications

- [Electrode Boilerplate]

- [Express React Redux Webpack Example]

- [Hapi React Redux Example]

## Usage

## Configuration

The [redux-router engine](#redux-router-engine) is initialized by passing a set of [options](#redux-router-engine-api) including [your react router routes](#define-your-routes) definition.

## Define Your Routes

The latest version now uses [react router 4.0](https://www.npmjs.com/package/react-router).

Since [server rendering](https://reacttraining.com/react-router/web/guides/server-rendering) works quite different comparing to how routes are declared for RR4, a common pattern to define a central routes definition by [react-router-config](https://www.npmjs.com/package/react-router-config) is used.

This engine adds these custom props for your route definition to support server side data initialization with [redux].

- `name` - (optional) A name for the route's redux reducer and store. A name is needed if the route need to supply redux reducer and initial state, and you have multiple routes doing it.
- `init` - (optional) A string that references the JS module to load server side redux data.
- `methods` - (optional) HTTP methods the route allows on the server. This would only make sense for the top level routes.

Therefore, to configure the engine, you will first need to specify your app's routes according to [react-router-config]'s specs. For example, a typical `routes.jsx` file might look like this:

```js
import Page from "./components/page";
import Home from "./components/home";
import About from "./components/about";
import { withRouter } from "react-router-dom";

const routes = [
  {
    // top route
    name: "Page",
    path: "/",
    methods: "get", // Allow HTTP method get (default)
    init: "./init-page-data",

    // withRouter is needed to work with Redux
    component: withRouter(Page),

    // child routes
    routes: [
      {
        name: "Home",
        path: "/",
        init: "./init-home-data",
        component: Home
      },
      {
        name: "About",
        path: "/about",
        init: "./init-about-data",
        component: About
      }
    ]
  }
];

export { routes as default };
```

### `init` attribute

- Typically, it should be a string that refers to a Node module to load the redux init function from.

  - If it starts with `.` then it will be joined as `{routesDir}/{init}` and then passed to `require`. ie: `require(path.resolve(routesDir, init))`
    - More info about [routesDir](#routes-dir)
  - else it's directly passed to `require`, which looks up from `node_modules` or from an absolute path that starts with `/`.

- Optionally, if it's `true`, then the path from joining `{routesDir}/{route.path}` is `require`d to load the init module.

  - ie: `require(Path.resolve(routesDir, route.path))`
  - This means the routes `path` must be a plain path and contains no regex or named params.

### `methods` attribute

- A string of HTTP methods in lowercase that the route allows. ie: `get`, `get/post`.
- If the attribute is not specified then it's defaulted to `get`.
- Only makes sense for top routes.

### Routes Dir

The engine automatically determines a `routesDir` from where to lookup your routes' `init` modules.

- `routesDir` is `options.routesHandlerPath` if you passed it, with `process.cwd()` prepend if it's not an absolute path.

- else it's determined as `CWD/${APP_SRC_DIR}/server/routes`. ie: `path.resolve(process.env.APP_SRC_DIR || "", "server/routes")`
  - where `APP_SRC_DIR` is set by Electrode to point to your app's `src` or `lib`

### Redux Init

Your route's `init` property help the engine locates a JS file that exports a function:

```js
export default function reduxInit(options) {
  const name = options.route.name;
  // if you didn't specify a name for the route, then you have to provide
  // some default name for your route's reducer and redux state data.
  return {
    reducer: {
      [name]: (state, action) => {
        // reducer code
      }
    },
    initialState: {
      [name]: {
        // initial redux state data
      }
    }
  };
}
```

`options` will contain the following:

- `req` - the `request` server framework's `request` object.

- `location` - the URL path from the `req` object

- `match` - the array of matched routes

- `route` - the route the init function is being called for

- `inits` - array of results from calling `init` so far.

  - Note: async results are not awaited yet so they'd be a promise.

Above is a typical example, but here are what you can do:

- You can decorate the function with `async` or return a Promise. The engine will wait for it.

  - The wait is **concurrent** with other route's async init functions.

The engine will do the following with the init functions:

- It will call all child routes' inits of a top route first, then call the top route's `init`.

  - For top route, `options` will contain an async function `awaitInits` that can be `await`ed on to make sure all async child routes are done so the array `inits` contain ready to use result.

- The reducers from multiple routes will be combined with redux's [combineReducers].

- `initialState`s from multiple routes will be merged into a single new object with `Object.assign`.

The top level route's init can return the following to override the [combineReducers] and merge `initialState` behaviors:

- If `reducer` is a function, then it's used as the sole reducer when calling redux's [createStore], but `initialState` should still be there for merging with others.

- If the return object contains a single field `store` then it's considered to be a ready made redux store and used directly.

- In both cases you either have to manually process results from your child routes in `options.inits`, or you do every thing in the top route's `init` only.

#### Redux Router Engine

The `ReduxRouterEngine` is stand-alone and can be used in **any** Redux/React application that runs on Express, Hapi or [WalmartLab's Electrode Platform](http://www.electrode.io/). Here's how to configure the engine depending on your framework:

**Electrode**

In an Electrode app, the engine configuration is straightforward: the route handling logic simply returns the output of the engine's `render` function in the `module.exports` clause:

```js
import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../client/routes";
import CreateReduxStore from "./createReduxStore";

module.exports = req => {
  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = new ReduxRouterEngine({ routes });
  }

  return req.server.app.routesEngine.render(req);
};
```

**Hapi/Express**

To configure the Redux Router Engine in an Express or Hapi application, first initialize the engine and then use it within a route handler to return the HTML. An example usage follows:

```js
const ReduxRouterEngine = require("electrode-redux-router-engine");

function createReduxStore(req, match) {
  // this refs to engine

  const store = configureStore();

  return Promise.all([
    store.dispatch(boostrapApp())
    // dispatch any other asynchronous actions here
  ]).then(() => {
    return store;
  });
}

const routes = require("./routes");

const engine = new ReduxRouterEngine({ routes });

// express or Hapi route handler:

function handler(req, reply) {
  engine.render(req).then(result => {
    // send full HTML with result back using res
  });
}
```

## APIs

ReduxRouterEngine has the following class methods:

### `constructor(options)`

Where options could contain the following fields:

- `routes` - **required** The [react-router-config] routes
  - This can also be a string that refer to the module that contains the routes definition.
- `withIds` - **optional** boolean to indicate whether to render with react-dataids.
- `stringifyPreloadedState` **optional** callback to stringify `store.getState()` for sending to browser as redux initial state
- `logError` - **optional** callback to log any error
  - It should take `(req, err)` arguments
  - If it's a `function` then its `this` references the engine instance
  - Defaulted to `console.log`
- `renderToString` - **optional** callback to provide custom renderToString
  - It should take `(req, location, store, match, withIds)` arguments
  - If desired, it can return a `Promise` that resolves the HTML string.
- `routesHandlerPath` - **optional** Path to directory to lookup individual route's `init` handler modules.
  - This is defaulted to `${process.env.APP_SRC_DIR}/server/routes` (for Electrode apps)

### `async render(req, options)`

Method to render a route.

- `req` - express/Hapi request object
- `options` - override options passed to constructor
  - `withIds`
  - `stringifyPreloadedState`

If rendering the route is a success, then it returns a promise resolving to:

```js
{
  status: 200,
  html: // string from React renderToString,
  prefetch: // string from stringifyPreloadedState
}
```

If an error occured, then it returns a promise resolving to:

```js
{
  status: react-router status or 500,
  message: err.message,
  path: // request path,
  _err: // original error object
}
```

If no route matched, then it returns a promise resolving to:

```js
{
  status: 404,
  message: `router-resolver: Path <path> not found`
}
```

[react-router-config]: https://www.npmjs.com/package/react-router-config
[react-router]: https://www.npmjs.com/package/react-router
[redux server rendering]: http://redux.js.org/docs/recipes/ServerRendering.html
[electrode-redux-router-engine]: https://github.com/electrode-io/electrode-redux-router-engine
[hapi react redux example]: https://github.com/electrode-samples/hapi-react-redux#electrode-redux-router-engine
[express react redux webpack example]: https://github.com/electrode-samples/express-react-redux-webpack#electrode-redux-router-engine
[electrode boilerplate]: https://github.com/electrode-io/electrode/tree/0f6d3bd08c1ffa32fe9cd469fab00ce4c3262d02/samples/universal-react-node
[combinereducers]: https://redux.js.org/api-reference/combinereducers
[redux]: http://redux.js.org/
[createstore]: https://redux.js.org/api-reference/createstore
