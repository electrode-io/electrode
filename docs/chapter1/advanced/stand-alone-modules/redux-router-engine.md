# Redux Router Engine

Electrode Redux Router Engine is a tool that handles async data for React Server Side Rendering using [react-router](https://github.com/reactjs/react-router), Redux, and the [Redux Server Rendering](http://redux.js.org/docs/recipes/ServerRendering.html) pattern.

## Module: [electrode-redux-router-engine](https://github.com/electrode-io/electrode-redux-router-engine)

### Install via `npm`

```
$ npm install --save electrode-redux-router-engine
```

### Example Applications

* [Electrode Boilerplate](https://github.com/electrode-io/electrode-boilerplate-universal-react-node#electrode-redux-router-engine)

* [Express React Redux Webpack Example](https://github.com/docs-code-examples-electrode-io/express-react-redux-webpack#electrode-redux-router-engine)

* [Hapi React Redux Example](https://github.com/docs-code-examples-electrode-io/hapi-react-redux#electrode-redux-router-engine)

## Usage

## Configuration

The [redux-router engine](#redux-router-engine) is initialized by passing a set of [options](#redux-router-engine-api) including both the [react-router](#redux-router-engine-react-router) routes and the initial [Redux Store](#redux-router-engine-redux-store).

#### React-Router {#redux-router-engine-react-router}

Therefore, to configure the engine, you will first need specify your app's routes according to [react-router](https://github.com/reactjs/react-router)'s specs. For example, a typical `routes.jsx` file might look like this:

```
import { Route, IndexRoute, Redirect } from "react-router";

export default (
  <Route path="/test" component={Page}>
    <IndexRoute component={Home}/>
    <Redirect from="source" to="target" />
  </Route>
);
```

#### Redux Store {#redux-router-engine-redux-store}

Next, you'll want to configure the redux store using the [Redux Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html) pattern. The first step in this pattern is to handle any middleware you might be using in addition to the required [redux thunk](https://github.com/gaearon/redux-thunk#redux-thunk) middleware which [allows actions to return functions instead of objects](http://redux.js.org/docs/advanced/AsyncActions.html#async-action-creators), an important step that lets synchronous action creators work with networks requests. We're also using [redux logger](https://github.com/evgenyrodionov/redux-logger#logger-for-redux) in this example to show how other middlewares can be integrated:

`configureStore.js`

```
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ));
}
```

Now let's create the redux store using the configure function from above. This pattern creates the store in a \_server-side component \_and initializes it with a promise library \(the example below uses [bluebird](https://github.com/petkaantonov/bluebird/)\):

```
import configureStore from "./configureStore";
const Promise = require("bluebird");

export default function createReduxStore(req) {
  const store = configureStore();

  return Promise.all([
    store.dispatch(yourAction())
    // dispatch any other asynchronous actions here
  ])
  .then(() => store);
}
```

For more information about the pattern used here, you can read about [using Async Actions in Redux](http://redux.js.org/docs/advanced/AsyncActions.html).

#### Redux Router Engine {#redux-router-engine}

The `ReduxRouterEngine`  is created using both the `Redux Store` and the `routes.jsx` component, each passed as key/value pairs to an options object. The module is stand-alone and can be used in **any **Redux application that runs on Express, Hapi or [WalmartLab's Electrode framework](http://www.electrode.io/). Here's how to configure the engine depending on your framework:

**Electrode**

In an Electrode app, the engine configuration is straightforward: the route handling logic simply returns the output of the engine's `render` function in the `module.exports` clause:

```
import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../../client/routes";
import CreateReduxStore from "./createReduxStore"

module.exports = (req) => {

  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return req.server.app.routesEngine.render(req);
};
```

**Hapi / Express**

To configure the Redux Router Engine in an Express or Hapi application, first initialize the engine and then use it within a route handler to return the HTML. An example usage follows:

```
const routes = require("./routes");
const engine = new ReduxRouterEngine({routes, createReduxStore});

// express or Hapi route handler:
function handler(req, res) {
  engine.render(req)
    .then( (result) => {
      // TODO: send full HTML with result back using res
    });
}
```

Note the route handler configuration above is a stub in this case. In a real Hapi or Express application, the route handler would be more complex. You can refer to our [express](https://github.com/electrode-samples/express-react-redux-webpack/blob/8e6023af5d4c7f4ec8780cfeeb214efc04892b2c/src/server.js#L90-L94) and [Hapi](https://github.com/electrode-samples/hapi-react-redux/blob/685456d738997cfca5beda2ff3d9b655ad37e0e0/hapiApp/src/server.js#L123-L146) example applications for a more specific use case of the `engine.render` function.

## API {#redux-router-engine-api}

### [constructor\(options\)](/chapter1/advanced/stand-alone-modules/redux-router-engine.md)

Where options could contain the following fields:

* `routes`- **required **The react-router routes
* `createReduxStore`- **required **async callback that returns a promise resolving to the Redux store.
  * It should take `(req, match)` arguments where match is react-router's match result.
  * If it's a `function` then its `this` references the engine instance.
* `withIds`- **optional **boolean to indicate whether to render with react-dataids.
* `stringifyPreloadedState`**optional **callback to return string for the preloaded state
* `logError`- **optional **callback to log any error
  * It should take `(req, err)`arguments
  * If it's a `function` then its `this` references the engine instance
* `renderToString`- **optional **callback to provide custom renderToString
  * It should take `(req, store, match, withIds)` arguments

### [engine.render\(req, options\)](/chapter1/advanced/stand-alone-modules/redux-router-engine.md)

Method to render a route.

* `req` - express/Hapi request object
* `options` - override options passed to constructor
  * `withIds`
  * `stringifyPreloadedState`
  * `createReduxStore`

If rendering the route is a success, then it returns a promise resolving to:

```
{
  status: 200,
  html: // string from React renderToString,
  prefetch: // string from stringifyPreloadedState
}
```

If an error occured, then it returns a promise resolving to:

```
{
  status: react-router status or 500,
  message: err.message,
  path: // request path,
  _err: // original error object
}
```

If no route matched, then it returns a promise resolving to:

    {
      status: 404,
      message: `router-resolver: Path <path> not found`
    }

If react-router found a redirect route, then it returns a promise resolving to:

```
{
  status: 302,
  path: // redirect location
}
```



