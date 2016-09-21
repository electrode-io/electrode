[![Build Status](https://travis-ci.org/electrode-io/electrode-redux-router-engine.svg?branch=master)](https://travis-ci.org/electrode-io/electrode-redux-router-engine)

# Electrode Redux Router Engine

Handle async data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

## Install

```bash
$ npm install -save electrode-redux-router-engine
```

## Usage

You need to specify your routes according to [react-router]'s specs.

For example, a file routes.jsx:

```js
import { Route, IndexRoute, Redirect } from "react-router";

export default (
  <Route path="/test" component={Page}>
    <IndexRoute component={Home}/>
    <Redirect from="source" to="target" />
  </Route>
);
```

And an example using the [Redux Async Actions] pattern:

```js

const ReduxRouterEngine = require("electrode-redux-router-engine");

function createReduxStore(req, match) {
    // this refs to engine

    const store = configureStore();

    return Promise.all([
      store.dispatch(boostrapApp())
      // dispatch any other asynchronous actions here
    ]).then( () => {
      return store;
    });
}

const routes = require("./routes");

const engine = new ReduxRouterEngine({routes, createReduxStore});

// express or Hapi route handler:

function handler(req, res) {
  engine.render(req)
    .then( (result) => {
      // send full HTML with result back using res
    });
}
```


## API

### [constructor(options)]()

Where options could contain the following fields:

  - `routes` - **required** The react-router routes
  - `createReduxStore` - **required** async callback that returns a promise resolving to the Redux store
    - It should take `(req, match)` arguments where match is react-router's match result.
    - If it's a `function` then its `this` references the engine instance.
  - `withIds` - **optional** boolean to indicate whether to render with react-dataids.
  - `stringifyPreloadedState` **optional** callback to return string for the preloaded state
  - `logError` - **optional** callback to log any error
    - It should take `(req, err)` arguments
    - If it's a `function` then its `this` references the engine instance
  - `renderToString` - **optional** callback to provide custom renderToString
    - It should take `(req, store, match, withIds)` arguments

### [engine.render(req, options)]()

Method to render a route.

  - `req` - express/Hapi request object
  - `options` - override options passed to constructor
    - `withIds`
    - `stringifyPreloadedState`
    - `createReduxStore`

If everything worked out, then it returns a promise resolving to:

```js
{
  status: 200,
  html: // string from React renderToString,
  prefetch: // string from stringifyPreloadedState
}
```

If error occured, then it returns a promise resolving to:

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

If react-router found a redirect route, then it returns a promise resolving to:

```js
{
  status: 302,
  path: // redirect location
}
```

[Redux Async Actions]: http://redux.js.org/docs/advanced/AsyncActions.html
[Redux Server Rendering]: http://redux.js.org/docs/recipes/ServerRendering.html
[react-router]: https://github.com/reactjs/react-router
